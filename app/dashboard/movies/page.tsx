import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import Client from "./client";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { featureItems, teamMembers } from "@/lib/db/schema";

// FlickVault Browse Movies page, using the canonical featureItems CRUD scaffold.

export const dynamic = "force-dynamic";

type MoviesPageProps = {
  searchParams?: Promise<{
    status?: string;
    message?: string;
  }>;
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  // Require authenticated session
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  // Resolve team membership for tenant scoping
  const [membership] = await db
    .select({
      teamId: teamMembers.teamId,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .where(eq(teamMembers.userId, session.userId))
    .limit(1);

  const params = (await searchParams) ?? {};
  const status =
    params.status === "success" || params.status === "error"
      ? params.status
      : null;
  const message = typeof params.message === "string" ? params.message : null;

  if (!membership) {
    // Show empty read-only UI for missing memberships (failsafe)
    return (
      <Client
        status={status}
        message={message}
        canManage={false}
        movies={[]}
      />
    );
  }

  // Use featureItems as Movie data for MVP, mapped accordingly.
  const movies = await db
    .select({
      id: featureItems.id,
      title: featureItems.title,
      description: featureItems.description,
      status: featureItems.status,
      updatedAt: featureItems.updatedAt,
    })
    .from(featureItems)
    .where(eq(featureItems.teamId, membership.teamId))
    .orderBy(desc(featureItems.updatedAt));

  return (
    <Client
      status={status}
      message={message}
      canManage={membership.role === "owner" || membership.role === "admin"}
      movies={movies.map((item) => ({
        ...item,
        updatedAt: item.updatedAt.toISOString(),
      }))}
    />
  );
}