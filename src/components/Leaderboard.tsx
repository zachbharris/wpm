"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import useTypeTestContext from "@/hooks/useTypeTestContext";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { toast } from "sonner";

type Leaderboard = Doc<"leaderboard"> & Id<"leaderboard">;

const columnHelper = createColumnHelper<Leaderboard>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("score", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("duration", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

export default function Leaderboard() {
  const [state] = useTypeTestContext();
  const lb = useQuery(api.leaderboard.get) as Leaderboard[];
  const createNewScore = useMutation(api.leaderboard.createLeaderboardPosition);
  const table = useReactTable({
    columns,
    data: lb ?? [],
    getCoreRowModel: getCoreRowModel(),
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleCreateNewScore() {
    createNewScore({
      name: "zbh",
      duration: state.currentDurationInSeconds,
      score: state.currentScore,
    });
  }

  useEffect(() => {
    if (state.status === "finished") {
      toast("New high score!", {
        duration: 20000,
        description: `You got ${state.currentScore} WPM!`,
        action: {
          label: "Add Score",
          onClick: () => setDrawerOpen(true),
        },
      });
    }
  }, [state.status]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full bg-neutral-900 rounded-md p-4">
        <h2 className="text-xl font-bold text-neutral-100">Leaderboard</h2>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <div className="max-w-2xl w-full mx-auto">
            <DrawerHeader>Add your score to the leaderboard</DrawerHeader>
            <DrawerFooter>
              <Button onClick={() => {
                handleCreateNewScore();
                setDrawerOpen(false);
              }}>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}