"use client";

import {
  createFeatureItemAction,
  deleteFeatureItemAction,
  updateFeatureItemAction,
} from "../feature/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type ClientProps = {
  status: "success" | "error" | null;
  message: string | null;
  canManage: boolean;
  movies: {
    id: string;
    title: string;
    description: string;
    status: string;
    updatedAt: string;
  }[];
};

function formatTimestamp(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min} UTC`;
}

export default function Client({ status, message, canManage, movies }: ClientProps) {
  const [search, setSearch] = useState("");

  const filteredMovies = search
    ? movies.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        (m.description || "").toLowerCase().includes(search.toLowerCase())
      )
    : movies;

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Browse Movies</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Search, add, or manage your movie library. Only team owner/admin can add or edit movies.
          </p>
        </header>
        {canManage ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Movie</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Movie</DialogTitle>
                <DialogDescription>
                  Create a new movie entry for your library.
                </DialogDescription>
              </DialogHeader>
              <form action={createFeatureItemAction} className="space-y-3">
                <div className="space-y-2">
                  <label htmlFor="new-title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input id="new-title" name="title" required maxLength={80} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="new-status" className="text-sm font-medium">
                    Status
                  </label>
                  <select
                    id="new-status"
                    name="status"
                    defaultValue="active"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="active">Available</option>
                    <option value="inactive">Unavailable</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="new-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea id="new-description" name="description" maxLength={500} rows={3} />
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Add Movie</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>

      {status && message ? (
        <p
          className={`rounded-md border px-3 py-2 text-sm ${
            status === "success"
              ? "border-emerald-500/30 text-emerald-600"
              : "border-destructive/30 text-destructive"
          }`}
        >
          {message}
        </p>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Movie Library</CardTitle>
          <CardDescription>Manage your team's movie catalog for instant rental or playback.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search movies by title or description"
              className="max-w-md"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell">Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No movies found. {canManage ? "Add some to get started!" : ""}
                  </TableCell>
                </TableRow>
              ) : (
                filteredMovies.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell className="font-medium">{movie.title}</TableCell>
                    <TableCell>
                      <Badge variant={movie.status === "active" ? "default" : "secondary"}>
                        {movie.status === "active" ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden max-w-[260px] truncate md:table-cell">
                      {movie.description || "No description"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatTimestamp(movie.updatedAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {canManage && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Movie</DialogTitle>
                                <DialogDescription>
                                  Update details and save changes.
                                </DialogDescription>
                              </DialogHeader>
                              <form action={updateFeatureItemAction} className="space-y-3">
                                <input type="hidden" name="id" value={movie.id} />
                                <div className="space-y-2">
                                  <label htmlFor={`title-${movie.id}`} className="text-sm font-medium">
                                    Title
                                  </label>
                                  <Input
                                    id={`title-${movie.id}`}
                                    name="title"
                                    defaultValue={movie.title}
                                    required
                                    maxLength={80}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label htmlFor={`status-${movie.id}`} className="text-sm font-medium">
                                    Status
                                  </label>
                                  <select
                                    id={`status-${movie.id}`}
                                    name="status"
                                    defaultValue={movie.status}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                  >
                                    <option value="active">Available</option>
                                    <option value="inactive">Unavailable</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <label
                                    htmlFor={`description-${movie.id}`}
                                    className="text-sm font-medium"
                                  >
                                    Description
                                  </label>
                                  <Textarea
                                    id={`description-${movie.id}`}
                                    name="description"
                                    defaultValue={movie.description}
                                    maxLength={500}
                                    rows={3}
                                  />
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                      Cancel
                                    </Button>
                                  </DialogClose>
                                  <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>
                        )}
                        {canManage && (
                          <form action={deleteFeatureItemAction}>
                            <input type="hidden" name="id" value={movie.id} />
                            <Button
                              type="submit"
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="mr-1 size-4" />
                              Delete
                            </Button>
                          </form>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}