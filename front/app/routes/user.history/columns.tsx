import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  network: string;
  amount: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "network",
    header: "Network",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
