"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Video, ArrowRightCircle, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { returnRentalAction } from "../movies/actions";
import { useTransition } from "react";
import { toast } from "sonner";

type Rental = {
  id: string;
  movieId: string;
  status: string;
  rentedAt: string;
  expiresAt?: string | null;
  returnedAt?: string | null;
};

type Movie = {
  id: string;
  title: string;
  description: string;
  genre?: string | null;
  releaseYear?: string | null;
  posterUrl?: string | null;
  runtimeMinutes?: string | null;
};

type Props = {
  rentals: Rental[];
  movies: Record<string, Movie>;
};

export default function RentalsClient({ rentals, movies }: Props) {
  const [pending, startTransition] = useTransition();

  function handleReturnRental(rentalId: string) {
    startTransition(() => {
      returnRentalAction({ rentalId, teamId: "" }).then((res) => {
        if (res?.error) toast.error(res.error);
        else toast.success("Returned rental!");
      });
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
        <Video /> Your Rentals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rentals.length === 0 && <div className="text-muted-foreground">No rentals yet. Browse movies to rent your first one!</div>}
        {rentals.map((rental) => {
          const movie = movies[rental.movieId];
          if (!movie) return null;
          return (
            <Card key={rental.id} className="relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {movie.title} <span className="ml-2 text-xs text-muted-foreground font-normal">{movie.releaseYear}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <span className="text-xs inline px-2 py-0.5 rounded-full bg-muted/50">{movie.genre}</span>
                </div>
                <div className="mb-3">{movie.description}</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {rental.status === "active" ? (
                      <>
                        <Clock className="size-4 text-yellow-500" />
                        <span className="text-yellow-600 text-xs">Active Rental</span>
                        <Button size="sm" onClick={() => handleReturnRental(rental.id)} loading={pending}>
                          Return
                          <RefreshCw className="size-4 ml-1" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="size-4 text-emerald-600" />
                        <span className="text-emerald-600 text-xs">Returned</span>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Rented at: {new Date(rental.rentedAt).toLocaleString()}
                    {rental.returnedAt && <> | Returned: {new Date(rental.returnedAt).toLocaleString()}</>}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}