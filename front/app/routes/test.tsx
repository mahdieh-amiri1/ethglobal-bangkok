import type { MetaFunction } from "@remix-run/node";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { supportedNetworks } from "~/lib/networks";
import { useAccount, useChainId, useSignMessage, useSwitchChain } from "wagmi";
import { useEffect } from "react";
import { ConnectKitButton } from "connectkit";
import { config } from "~/lib/config";

export const meta: MetaFunction = () => {
  return [
    { title: `Test the contract | ${config.appName}` },
    { name: "description", content: "Test contract implementation" },
  ];
};

const formSchema = z.object({
  executeChain: z.string(),
  settleChain: z.string(),
});

export default function UserNewPurchase() {
  const chainId = useChainId();
  const account = useAccount();
  const { signMessage } = useSignMessage();
  const { switchChain } = useSwitchChain();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    form.setValue("executeChain", String(chainId));
  }, [chainId, form]);

  const network = form.watch("executeChain");

  useEffect(() => {
    if (network) {
      switchChain({ chainId: Number(network) });
    }
  }, [network, switchChain]);

  return (
    <div>
      <div className="max-w-5xl">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          Test Purchase
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
                    name="executeChain"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Choose Execute Chain</FormLabel>
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
                    name="settleChain"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Choose Settle Chain</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-3 gap-3 "
                          >
                            {supportedNetworks.map((network) => {
                              const id = `settle-${network.id}`;
                              return (
                                <div key={id}>
                                  <RadioGroupItem
                                    value={String(network.id)}
                                    id={id}
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor={id}
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
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
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
                      {account.isConnected
                        ? "Test purchase"
                        : "Connect to Wallet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
