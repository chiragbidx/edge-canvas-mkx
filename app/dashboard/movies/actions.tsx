"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";
import { movies, rentals } from "@/lib/db/schema";
import { getAuthSession } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

// --- Zod Schemas ---
const movieSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().default(""),
  genre: z.string().optional(),
  releaseYear: z.string().optional(),
  posterUrl: z.string().optional(),
  runtimeMinutes: z.string().optional(),
  teamId: z.string(),
});

const rentalSchema = z.object({
  movieId: z.string(),
  teamId: z.string(),
});

const returnRentalSchema = z.object({
  rentalId: z.string(),
  teamId: z.string(),
});

// --- Action Handlers ---

export async function createMovieAction(input: any) {
  // Only admin/owner can create.
  const session = await getAuthSession();
  if (!session) return { error: "Not authenticated" };

  const data = movieSchema.omit({ id: true }).safeParse(input);
  if (!data.success) return { error: "Invalid input" };

  // Permission check for demo - in real app, check actual role.
  // TODO: Enhance with real team/owner check.
  await db.insert(movies).values(data.data);
  return { success: true };
}

export async function updateMovieAction(input: any) {
  // Only admin/owner can update.
  const session = await getAuthSession();
  if (!session) return { error: "Not authenticated" };

  const data = movieSchema.safeParse(input);
  if (!data.success || !data.data.id) return { error: "Invalid input" };

  await db
    .update(movies)
    .set({
      title: data.data.title,
      description: data.data.description || "",
      genre: data.data.genre,
      releaseYear: data.data.releaseYear,
      posterUrl: data.data.posterUrl,
      runtimeMinutes: data.data.runtimeMinutes,
    })
    .where(eq(movies.id, data.data.id))
    .execute();

  return { success: true };
}

export async function deleteMovieAction(input: any) {
  // Only admin/owner can delete.
  const session = await getAuthSession();
  if (!session) return { error: "Not authenticated" };

  if (!input || !input.movieId || !input.teamId) {
    return { error: "Invalid movie" };
  }

  await db.delete(movies).where(eq(movies.id, input.movieId)).execute();
  return { success: true };
}

export async function rentMovieAction(input: any) {
  // Only authenticated users can rent.
  const session = await getAuthSession();
  if (!session) return { error: "Not authenticated" };

  const data = rentalSchema.safeParse(input);
  if (!data.success) return { error: "Invalid input" };

  // Prevent duplicate rentals
  const existing = await db.query.rentals.findFirst({
    where: (r, { eq, and }) => and(eq(r.movieId, data.data.movieId), eq(r.userId, session.userId), eq(r.status, "active")),
  });
  if (existing) return { error: "Movie already rented" };

  await db.insert(rentals).values({
    movieId: data.data.movieId,
    userId: session.userId,
    teamId: data.data.teamId,
    status: "active",
  });
  return { success: true };
}

export async function returnRentalAction(input: any) {
  // Only authenticated users can return.
  const session = await getAuthSession();
  if (!session) return { error: "Not authenticated" };

  const data = returnRentalSchema.safeParse(input);
  if (!data.success) return { error: "Invalid input" };

  await db
    .update(rentals)
    .set({ status: "returned", returnedAt: new Date() })
    .where(eq(rentals.id, data.data.rentalId))
    .execute();

  return { success: true };
}