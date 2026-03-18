import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { teamMembers, movies, rentals } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function RentalsPage() {
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

  // Fetch user's rentals.
  const userRentals = await db
    .select()
    .from(rentals)
    .where(eq(rentals.userId, session.userId));

  // Fetch all referenced movie data.
  const movieIds = userRentals.map(r => r.movieId);
  const movieList = movieIds.length
    ? await db.select().from(movies).where((m, { inArray }) => inArray(m.id, movieIds))
    : [];

  // Pass movie data mapped by id for details.
  const movieMap = Object.fromEntries(movieList.map(m => [m.id, m]));

  // @ts-expect-error Async Server Component
  return <RentalsClient rentals={userRentals} movies={movieMap} />;
}

import RentalsClient from "./client";