import type { MetaFunction } from "@remix-run/node";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { payments } from "./dummy";
import { useReadContract } from "wagmi";
import { config } from "~/lib/config";

export const meta: MetaFunction = () => {
  return [
    { title: `User history | ${config.appName}` },
    { name: "description", content: "User purchase history" },
  ];
};

export default function UserPurchaseHistory() {
  // !todo: input the correct contract address and ABI
  const result = useReadContract({
    abi: [], // ABI of the contract, Must be inserted
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    functionName: "totalSupply",
  });
  return (
    <div>
      <div className="max-w-5xl">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          History
        </h2>
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
          {/* !todo: pass the correct data */}
          <DataTable columns={columns} data={payments} />
        </div>
      </div>
    </div>
  );
}
