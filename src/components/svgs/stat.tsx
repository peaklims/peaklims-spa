import { SVGProps } from "react";

import { cn } from "@/lib/utils";

export function Stat({
  className,
  ...props
}: {
  className?: string;
  props?: SVGProps<SVGSVGElement>;
}) {
  return (
    // https://iconbuddy.com/mage/star-moving-fill

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className={cn("w-4 h-4", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="m10.833 8.142l1.8-3.57a1.64 1.64 0 0 1 1.49-.92c.306 0 .606.09.86.26c.251.166.452.398.58.67l1.76 3.57l.11.08l3.92.57c.302.04.586.165.82.36c.234.205.41.467.51.76a1.66 1.66 0 0 1 0 .91a1.57 1.57 0 0 1-.44.77l-2.84 2.77a.11.11 0 0 0 0 .11l.68 3.93c.047.297.016.6-.09.88a1.7 1.7 0 0 1-1.4 1.05a1.59 1.59 0 0 1-.91-.2l-3.38-1.77l-.17-.07h-.14l-3.52 1.84a1.61 1.61 0 0 1-.76.19h-.17a1.7 1.7 0 0 1-.84-.32a1.54 1.54 0 0 1-.55-.71a1.61 1.61 0 0 1 0-1l.66-3.81a.491.491 0 0 0 0-.11h-.05l-2.82-2.74a1.69 1.69 0 0 1-.46-.8a1.62 1.62 0 0 1 .53-1.65a1.59 1.59 0 0 1 .83-.36l3.87-.57zm-2.83-2h-6a.75.75 0 0 1 0-1.5h6a.75.75 0 1 1 0 1.5m-3 12.07h-3a.75.75 0 1 1 0-1.5h3a.75.75 0 1 1 0 1.5m-1.46-5.77h-1.5a.75.75 0 1 1 0-1.5h1.5a.75.75 0 1 1 0 1.5"
      />
    </svg>
  );
}