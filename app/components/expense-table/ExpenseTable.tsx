"use client";

import { useState, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ExpenseTableProps from "@/app/types/ExpenseTableProps";

export default function ExpenseTable({
  expenses,
  onEdit,
  onDelete,
}: ExpenseTableProps) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const sortedExpenses = useMemo(() => {
    return [...expenses].sort(
      (a, b) =>
        new Date(b.date + "T00:00").getTime() -
        new Date(a.date + "T00:00").getTime()
    );
  }, [expenses]);

  const currentItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return sortedExpenses.slice(start, start + itemsPerPage);
  }, [currentPage, sortedExpenses]);
  const columns = useMemo<ColumnDef<(typeof currentItems)[0]>[]>(
    () => [
      { accessorKey: "description", header: "Descrição" },
      { accessorKey: "category", header: "Categoria" },
      {
        accessorKey: "amount",
        header: "Valor",
        cell: (info) => (
          <span className="text-green-500">
            R$: {info.getValue<number>().toFixed(2)}
          </span>
        ),
      },
      {
        accessorKey: "date",
        header: "Data",
        cell: (info) =>
          new Date(info.getValue<string>() + "T00:00").toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Ações",
        cell: (info) => {
          const expense = info.row.original;
          return (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(expense)}
                className="hover:text-green-500 transition cursor-pointer"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(expense)}
                className="hover:text-red-500 transition cursor-pointer"
              >
                <FaTrash />
              </button>
            </div>
          );
        },
      },
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data: currentItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const pageCount = Math.ceil(sortedExpenses.length / itemsPerPage);

  return (
    <div className="bg-[#1e1e1e] rounded-xl shadow-md p-6 border border-gray-700 overflow-x-auto">
      <h2 className="text-lg font-semibold text-[#e5e7eb] mb-4">
        Gastos Recentes
      </h2>
      <table className="min-w-full text-left text-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-2 px-4 border-b border-gray-600"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-800 transition">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 gap-4">
        <div
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          className={`bg-green-100 px-3 py-1 cursor-pointer text-black rounded hover:bg-green-500 hover:text-white transition ${
            currentPage === 0
              ? "opacity-50 cursor-not-allowed hover:bg-none hover:text-green-500"
              : ""
          }`}
        >
          Anterior
        </div>
        <span className="px-3 py-1 bg-green-300 rounded ">
          {currentPage + 1} / {pageCount}
        </span>
        <div
          onClick={() =>
            currentPage < pageCount - 1 && setCurrentPage(currentPage + 1)
          }
          className={`bg-green-100 px-3 py-1 cursor-pointer text-black rounded hover:bg-green-500 hover:text-white transition ${
            currentPage === pageCount - 1
              ? "opacity-50 cursor-not-allowed hover:bg-none hover:text-green-500 "
              : ""
          }`}
        >
          Próximo
        </div>
      </div>
    </div>
  );
}
