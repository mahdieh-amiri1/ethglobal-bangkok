import type { MetaFunction } from "@remix-run/node";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { supportedNetworks } from "~/lib/networks";
import { payments } from "./dummy";
import { config } from "~/lib/config";

export const meta: MetaFunction = () => {
  return [
    { title: `Admin Page | ${config.appName}` },
    { name: "description", content: "Admin Control panel page" },
  ];
};

export default function UserPurchaseHistory() {
  return (
    <div>
      <div className="max-w-5xl">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          Admin Dashboard
        </h2>
        <Card className="my-4">
          <CardHeader className="relative">
            <CardTitle>Summery</CardTitle>
            <CardDescription>Transactions summery</CardDescription>
            <Select defaultValue={String(supportedNetworks[0].id)}>
              <SelectTrigger className="w-[180px] absolute right-4 top-4">
                <SelectValue placeholder="Select a network" />
              </SelectTrigger>
              <SelectContent>
                {supportedNetworks.map((network) => (
                  <SelectItem key={network.id} value={String(network.id)}>
                    {network.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-muted-foreground">
                Total Minted NFTs
              </dt>
              <dd className="text-base font-medium text-foreground">xxxx</dd>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>List of user transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={payments} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
