import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";

export default function QueryTable({ list, columns, loading }) {
  const [sorting, setSorting] = useState([]);
  const enhancedColumns = useMemo(() => {
    return columns?.map((col) => ({
      ...col,
      sortingFn: col.sortingFn ?? "alphanumeric", // <- Set default to alphanumeric
    }));
  }, [columns]);
  // Table instance
  const tableInstance = useReactTable({
    columns:enhancedColumns,
    data: list,
    state: {
      sorting,
    },
 
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Access the table state and methods
  const { getHeaderGroups, getRowModel } = tableInstance;
  return !loading ? (
    <>
      <div className="table table-md mx-auto w-full rounded-md  bg-white">
        <table style={{ borderSpacing: "0", width: "100%" }}>
          <thead className="bg-[#EBEBF0]">
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    colSpan={headerGroup.colSpan}
                    key={column.id}
                    // onClick={column.column.getToggleSortingHandler()}
                    // className="py-4 px-4 first:border-l-0 last:border-r-0 border-r border-l text-left text-[0.8rem] font-medium text-[#2C2C2C] capitalize"
                    style={{
                      cursor: column.column.getCanSort()
                        ? "pointer"
                        : "default", // Indicate sortable columns with a pointer cursor
                    }}
                    className="text-sm font-semibold capitalize text-[#525252]"
                  >
                    {flexRender(
                      column.column.columnDef.header,
                      column.getContext(),
                    )}
                    {{
                      asc: " 🔼", // Display ascending sort indicator
                      desc: " 🔽", // Display descending sort indicator
                    }[column.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* -padding--- */}
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="borde-b-2 borde-[#C0C0C0] text-left last:border-none"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      // className="border-r border-b-0 first:border-l-0 last:border-r-0 border-l px-2 text-left text-[0.8rem] font-normal text-[#696969] capitalize"

                      className="text-[0.8rem] font-medium capitalize text-[#525252]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <div className="overflow-x-auto rounded-md bg-white">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300"></div>
            </th>
            <th className="border-b px-4 py-2">
              <div className="h-4 w-1/4 animate-pulse rounded bg-gray-300"></div>
            </th>
            <th className="border-b px-4 py-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <tr key={idx} className="animate-pulse">
                <td className="border-b px-4 py-3">
                  <div className="h-4 w-1/2 rounded bg-gray-300"></div>
                </td>
                <td className="border-b px-4 py-2">
                  <div className="h-4 w-1/4 rounded bg-gray-300"></div>
                </td>
                <td className="border-b px-4 py-2">
                  <div className="h-4 w-3/4 rounded bg-gray-300"></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
