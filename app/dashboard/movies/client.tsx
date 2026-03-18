"use client";

import * as React from "react";
import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Film, Video, ArrowRight, X } from "lucide-react";
import { createMovieAction, updateMovieAction, deleteMovieAction, rentMovieAction, returnRentalAction } from "./actions";
import { toast } from "sonner";

type Movie = {
  id: string;
  title: string;
  description: string;
  genre?: string | null;
  releaseYear?: string | null;
  posterUrl?: string | null;
  runtimeMinutes?: string | null;
  status: string;
};

type Rental = {
  id: string;
  movieId: string;
  userId: string;
  teamId: string;
  status: string;
  rentedAt: string;
  expiresAt?: string | null;
  returnedAt?: string | null;
};

type Props = {
  role: string;
  movies: Movie[];
  rentals: Rental[];
  teamId: string;
  userId: string;
};

export default function MoviesClient({ role, movies, rentals, teamId, userId }: Props) {
  const [openDialog, setOpenDialog] = useState<null | "add" | { type: "edit" | "delete"; movie: Movie }>(null);
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<Partial<Movie>>({});

  // Utility helpers
  const userRentals = rentals.filter(r => r.userId === userId && r.status === "active");
  const isOwner = role === "owner" || role === "admin";
  function resetForm() {
    setForm({});
    setOpenDialog(null);
  }

  // Form handlers
  function handleAddMovie(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      createMovieAction({ ...form, teamId }).then((res) => {
        if (res?.error) toast.error(res.error);
        else toast.success("Movie added!");
        resetForm();
      });
    });
  }

  function handleEditMovie(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      updateMovieAction({ ...form, teamId }).then((res) => {
        if (res?.error) toast.error(res.error);
        else toast.success("Movie updated!");
        resetForm();
      });
    });
  }

  function handleDeleteMovie(id: string) {
    startTransition(() => {
      deleteMovieAction({ movieId: id, teamId }).then((res) => {
        if (res?.error) toast.error(res.error);
        else toast.success("Movie deleted!");
        resetForm();
      });
    });
  }

  function handleRentMovie(id: string) {
    startTransition(() => {
      rentMovieAction({ movieId: id, teamId }).then((res) => {
        if (res?.error) toast.error(res.error);
        else toast.success("Movie rented!");
      });
    });
  }

  function handleReturnRental(id: string) {
    startTransition(() => {
      returnRentalAction({ rentalId: id, teamId }).then((res) => {
        if (res?.error) toast.error(res.error);
        else toast.success("Rental returned!");
      });
    });
  }

  // Dialog launchers
  function openAdd() {
    setForm({});
    setOpenDialog("add");
  }
  function openEdit(movie: Movie) {
    setForm(movie);
    setOpenDialog({ type: "edit", movie });
  }
  function openDelete(movie: Movie) {
    setOpenDialog({ type: "delete", movie });
  }

  // Movie is rented by user check.
  function isRented(movieId: string) {
    return userRentals.some(r => r.movieId === movieId && r.status === "active");
  }
  function getRentalForMovie(movieId: string) {
    return userRentals.find(r => r.movieId === movieId && r.status === "active");
  }

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Film /> Browse Movies
        </h2>
        {isOwner && (
          <Button onClick={openAdd}>
            Add Movie
            <ArrowRight className="ml-2 size-4" />
          </Button>
        )}
      </div>

      {/* List all movies */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Card key={movie.id} className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                {movie.title} <span className="ml-2 text-xs text-muted-foreground font-normal">{movie.releaseYear}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <span className="text-xs inline px-2 py-0.5 rounded-full bg-muted/50">{movie.genre}</span>
              </div>
              <p className="text-sm mb-3">{movie.description}</p>
              <div className="flex gap-2 mt-4">
                {isOwner && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => openEdit(movie)}>Edit</Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => openDelete(movie)}><X className="size-4" /></Button>
                  </>
                )}
                {!isOwner && (
                  isRented(movie.id) ? (
                    <Button size="sm" variant="secondary" onClick={() => handleReturnRental(getRentalForMovie(movie.id)?.id as string)}>
                      Return
                    </Button>
                  ) : (
                    <Button size="sm" variant="default" onClick={() => handleRentMovie(movie.id)}>
                      Rent
                      <Video className="ml-1 size-4" />
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Movie Dialog */}
      <Dialog open={!!openDialog} onOpenChange={resetForm}>
        <DialogContent>
          {openDialog === "add" || (typeof openDialog === "object" && openDialog.type === "edit") ? (
            <form onSubmit={openDialog === "add" ? handleAddMovie : handleEditMovie} className="space-y-4">
              <DialogHeader>
                <DialogTitle>{openDialog === "add" ? "Add Movie" : "Edit Movie"}</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Title"
                value={form.title || ""}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required
              />
              <Textarea
                placeholder="Description"
                value={form.description || ""}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
              <Input
                placeholder="Genre"
                value={form.genre || ""}
                onChange={e => setForm(f => ({ ...f, genre: e.target.value }))}
              />
              <Input
                placeholder="Release Year"
                value={form.releaseYear || ""}
                onChange={e => setForm(f => ({ ...f, releaseYear: e.target.value }))}
              />
              <Input
                placeholder="Poster URL"
                value={form.posterUrl || ""}
                onChange={e => setForm(f => ({ ...f, posterUrl: e.target.value }))}
              />
              <Input
                placeholder="Runtime (minutes)"
                value={form.runtimeMinutes || ""}
                onChange={e => setForm(f => ({ ...f, runtimeMinutes: e.target.value }))}
              />
              <DialogFooter>
                <Button type="submit" loading={pending}>
                  {openDialog === "add" ? "Create Movie" : "Update Movie"}
                </Button>
              </DialogFooter>
            </form>
          ) : null}

          {/* Delete Movie Dialog */}
          {typeof openDialog === "object" && openDialog.type === "delete" && (
            <>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <div>Are you sure you want to delete <b>{openDialog.movie.title}</b>?</div>
              <DialogFooter>
                <Button variant="destructive" onClick={() => handleDeleteMovie(openDialog.movie.id)} loading={pending}>
                  Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}