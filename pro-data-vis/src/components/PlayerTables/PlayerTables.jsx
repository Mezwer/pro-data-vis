'use client';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { columns } from './columns';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, AArrowDown, AArrowUp } from 'lucide-react';
import { toast } from 'sonner';

const PlayerTables = ({ graphData }) => {
  const flatData = Object.values(graphData).flat();

  const [data, setData] = useState(() => [...flatData]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 30 });
  const [sorting, setSorting] = useState([]);
  const [showRowIndex, setShowRowIndex] = useState(-1); // set to -1 later
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
  });

  const handleRowDropClick = (index) => {
    if (showRowIndex !== index) setShowRowIndex(index);
    else setShowRowIndex(-1);
  };

  const onPageSizeChange = (e) => {
    const value = parseInt(e.target.value);
    const inBounds = value > 0 && value <= flatData.length;
    if (e.key === 'Enter') {
      if (!isNaN(value) && inBounds) {
        setPagination((prev) => ({ ...prev, pageSize: value }));
      } else {
        toast.error(`Page size is not valid. Minimum is 0, maximum is ${flatData.length}.`);
        setPagination((prev) => ({ ...prev }));
      }
    }
  };

  return (
    <div className="flex flex-col my-10 mx-6 w-screen">
      <div className="ml-1 mb-3 items-center">
        Showing
        <input
          type="text"
          inputMode="numeric"
          className="bg-black/40 w-[3rem] mx-2 rounded-lg text-center"
          placeholder={pagination.pageSize}
          onKeyUp={onPageSizeChange}
        />
        entrie(s)
      </div>

      <div className="w-full flex flex-col justify-center items-center border border-gray-800 border-1 bg-black/50 rounded-xl pt-3">
        <div className="w-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <div
              key={headerGroup.id}
              className="grid grid-cols-[2fr_1fr_3fr_1fr_1fr_1fr_1fr_1fr] gap-4 pb-3 border-b border-gray-800 px-4"
            >
              {headerGroup.headers.map((header) => (
                <div key={header.id} className="text-left">
                  <div
                    onClick={header.column.getToggleSortingHandler()}
                    className={`${header.column.getCanSort() ? 'cursor-pointer select-none' : ''} flex flex-row items-center gap-1`}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    <div className="translate-y-[1px]">
                      {{ asc: <AArrowUp size={20} strokeWidth={1} />, desc: <AArrowDown size={20} strokeWidth={1} /> }[
                        header.column.getIsSorted()
                      ] ?? null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="divide-y divide-gray-800">
            {table.getRowModel().rows.map((row, index) => (
              <div key={row.id}>
                <div
                  className="grid grid-cols-[2fr_1fr_3fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-4 hover:bg-gray-900/50 transition-colors duration-[100ms] ease-out"
                  onClick={() => handleRowDropClick(index)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} className="py-5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-row bg-black/70 w-fit rounded-lg border border-gray-800 border-1 items-center">
        <button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-1 rounded transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none"
        >
          <ChevronsLeft size={33} className="hover:scale-125 active:scale-95 transition-all duration-150" />
        </button>

        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-1 rounded transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none"
        >
          <ChevronLeft size={33} className="hover:scale-125 active:scale-95 transition-all duration-150" />
        </button>

        <span className="mx-3 font-bold w-[6rem] flex flex-row justify-center">
          {pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-1 rounded transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none"
        >
          <ChevronRight size={33} className="hover:scale-125 active:scale-95 transition-all duration-150" />
        </button>

        <button
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
          className="p-1 rounded transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none"
        >
          <ChevronsRight size={33} className="hover:scale-125 active:scale-95 transition-all duration-150" />
        </button>
      </div>
    </div>
  );
};

export default PlayerTables;
