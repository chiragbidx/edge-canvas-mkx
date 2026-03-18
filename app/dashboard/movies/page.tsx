import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { teamMembers, teams, users, movies, rentals } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function MoviesPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  // Lookup the user's current team.
  const [member] = await db
    .select({
      teamId: teamMembers.teamId,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .where(eq(teamMembers.userId, session.userId))
    .limit(1);

  if (!member) redirect("/dashboard/team");

  // Fetch movies for this team.
  const movieList = await db
    .select()
    .from(movies)
    .where(eq(movies.teamId, member.teamId));

  // Fetch all rentals for the team (for admin), or user rentals (for members).
  let rentalList: any[] = [];
  if (member.role === "owner" || member.role === "admin") {
    rentalList = await db
      .select()
      .from(rentals)
      .where(eq(rentals.teamId, member.teamId));
  } else {
    rentalList = await db
      .select()
      .from(rentals)
      .where(eq(rentals.userId, session.userId));
  }

  return (
    <div>
      {/* Dynamic import to keep best-practice split */}
      {/* @ts-expect-error Async Server Component */}
      <MoviesClient
        role={member.role}
        movies={movieList}
        rentals={rentalList}
        teamId={member.teamId}
        userId={session.userId}
      />
    </div>
  );
}

// Lazy load Client (app/dashboard/movies/client.tsx)
// Client imports must be default export!
import MoviesClient from "./client";