import { Plan } from "@workspace/validators/plan";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface PlanSectionProps {
  control: Control<Plan>;
}

export function PlanSection({ control }: PlanSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-4">
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
  );
}
