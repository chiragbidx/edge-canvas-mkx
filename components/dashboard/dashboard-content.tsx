"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Users,
  FolderKanban,
  Video,
  Film,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// FlickVault sample dashboard cards and metrics.

const metrics = [
  { label: "Movies Available", value: "1,200", icon: Film, description: "Blockbusters + Indies" },
  { label: "Current Rentals", value: "45", icon: Video, description: "Your active rentals" },
  { label: "Family Members", value: "4", icon: Users, description: "Household sharing" },
];

const quickActions = [
  { label: "Browse Movies", href: "/dashboard/movies", icon: Film },
  { label: "My Rentals", href: "/dashboard/rentals", icon: Video },
  { label: "Profile", href: "/dashboard/settings", icon: Users },
];

export function DashboardContent({ greeting, firstName }: { greeting: string; firstName: string }) {
  const [query, setQuery] = useState("");

  const filteredMetrics = useMemo(
    () => (query ? metrics.filter((m) => m.label.toLowerCase().includes(query.toLowerCase())) : metrics),
    [query]
  );

  return (
    <>
      {/* Welcome banner */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {greeting}, {firstName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome to your FlickVault dashboard. Manage rentals, discover movies, and more.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-1.5"
                >
                  <Link href={action.href}>
                    <Icon className="size-3.5" />
                    <span className="hidden sm:inline">{action.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies, rentals, people..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-10 bg-muted/50 border-muted-foreground/15 focus-visible:border-border focus-visible:bg-background"
          />
        </div>
      </div>

      {/* Metric cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription className="text-sm font-medium">{metric.label}</CardDescription>
                <div className="rounded-md bg-muted p-2">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{metric.value}</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <Badge
                    variant="secondary"
                    className="rounded-md px-1.5 py-0 text-xs font-medium text-emerald-700 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/15 border-0"
                  >
                    {metric.description}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Movies/CRUD placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Browse and Rent Movies</CardTitle>
          <CardDescription>
            Use <Link href="/dashboard/movies" className="text-primary underline">Browse Movies</Link> to start renting instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p>Your rentals and favorites will appear here as you use FlickVault.</p>
            <Button asChild>
              <Link href="/dashboard/movies">
                Browse Movies
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}