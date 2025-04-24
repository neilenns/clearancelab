"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { planSchema } from "@workspace/validators/plan";

export function ScenarioForm() {
  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      aid: "ASA17",
      cid: 295,
      bcn: 6660,
      typ: "B739",
      eq: "L",
      dep: "KPDX",
      dest: "KLAS",
      spd: 225,
      alt: "350",
      vatsimId: 1531877,
      pilotName: "Quinn",
    },
  });

  function onSubmit(values: z.infer<typeof planSchema>) {
    toast.success(`Saved ${values.pilotName ?? ""}!`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-4">
          <FormField
            control={form.control}
            name="vatsimId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VATSIM ID</FormLabel>
                <FormControl>
                  <Input placeholder="1531877" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pilotName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pilot name</FormLabel>
                <FormControl>
                  <Input placeholder="Quinn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AID</FormLabel>
                <FormControl>
                  <Input placeholder="ASA17" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CID</FormLabel>
                <FormControl>
                  <Input placeholder="295" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bcn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beacon</FormLabel>
                <FormControl>
                  <Input placeholder="6660" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typ"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="B739" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eq"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipment</FormLabel>
                <FormControl>
                  <Input placeholder="L" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure</FormLabel>
                <FormControl>
                  <Input placeholder="KPDX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="KLAS" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="spd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speed</FormLabel>
                <FormControl>
                  <Input placeholder="225" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altitude</FormLabel>
                <FormControl>
                  <Input placeholder="350" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
