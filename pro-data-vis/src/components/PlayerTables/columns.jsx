import { createColumnHelper } from '@tanstack/react-table';
import { secondsToHMS } from '@/lib/utils';

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('champion', {
    header: () => <span className="pl-8"> Champion </span>,
    cell: (info) => <span className="pl-8"> {info.getValue()} </span>,
  }),
  columnHelper.accessor('patch', {
    header: () => 'Patch',
    cell: (info) => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor('opp_teamname', {
    header: () => 'Opponent',
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: 'kda',
    header: () => 'KDA',
    cell: (info) => {
      const row = info.row.original;
      return `${row.Kills}/${row.Deaths}/${row.Assists}`;
    },
  }),
  columnHelper.display({
    id: 'result',
    header: () => 'Result',
    cell: (info) => {
      return info.row.original.result ? (
        <span className="text-green-500"> Win </span>
      ) : (
        <span className="text-red-500"> Loss </span>
      );
    },
  }),
  columnHelper.accessor('gamelength', {
    header: () => 'Duration',
    cell: (info) => secondsToHMS(info.getValue()),
  }),
  columnHelper.accessor('date', {
    header: () => 'Date',
    cell: (info) => info.getValue().toLocaleDateString(),
    sortingFn: 'datetime',
  }),
  columnHelper.display({
    id: 'game',
    header: () => 'Tournament',
    cell: (info) => {
      const row = info.row.original;
      return `${row.league} ${row.split || ''}`;
    },
  }),
];
