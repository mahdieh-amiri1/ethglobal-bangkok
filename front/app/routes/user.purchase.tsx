import type { MetaFunction } from "@remix-run/node";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { supportedNetworks } from "~/lib/networks";
import { supportedAssets } from "~/lib/assets";
import { Card, CardContent } from "~/components/ui/card";
import { useAccount, useChainId, useSignMessage, useSwitchChain } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { useEffect } from "react";
import { config } from "~/lib/config";
export const meta: MetaFunction = () => {
  return [
    { title: `Make a new Purchase | ${config.appName}` },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const formSchema = z.object({
  network: z.string(),
  asset: z.string(),
  amount: z.coerce.number().min(0),
});

export default function UserNewPurchase() {
  const chainId = useChainId();
  const account = useAccount();
  const { signMessage } = useSignMessage();
  const { switchChain } = useSwitchChain();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asset: "eth",
      amount: 0,
    },
  });
  useEffect(() => {
    form.setValue("network", String(chainId));
  }, [chainId, form]);

  const network = form.watch("network");

  useEffect(() => {
    if (network) {
      switchChain({ chainId: Number(network) });
    }
  }, [network, switchChain]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground  sm:text-2xl">
        Purchase
      </h2>
      <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
        <Card>
          <CardContent className="lg:max-w-xl ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => {
                  console.log(data);
                  // !todo: implement the contract call
                  signMessage({ message: JSON.stringify(data), account: "" });
                })}
                className="w-full flex flex-col gap-4 pt-6"
              >
                <FormField
                  control={form.control}
                  name="network"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Choose your network</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                          className="grid grid-cols-3 gap-3 "
                        >
                          {supportedNetworks.map((network) => (
                            <div key={String(network.id)}>
                              <RadioGroupItem
                                value={String(network.id)}
                                id={String(network.id)}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={String(network.id)}
                                className="flex h-full text-center gap-2 text-sm flex-col items-center justify-start rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <img
                                  src={`/assets/${network.id}-logo.svg`}
                                  alt={network.name}
                                  className="h-8 w-auto"
                                />
                                {network.name}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="asset"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose an asset" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {supportedAssets.map((asset) => (
                            <SelectItem key={asset.id} value={asset.id}>
                              {asset.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Amount"
                          min={0}
                          type="number"
                          step={0.00000001}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {/* !todo: fix this */}I don&apos;t exactly know what
                        this is for
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 justify-between items-center">
                  <ConnectKitButton mode="auto" />
                  <Button
                    disabled={!account.isConnected}
                    type="submit"
                    className="w-full "
                  >
                    {account.isConnected ? "Submit" : "Connect to Wallet"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
