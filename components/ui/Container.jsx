import { cn } from "@/lib/utils";

const sizes = {
  default: "mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8",
  narrow: "mx-auto max-w-[48rem] px-4 sm:px-6",
  wide: "mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8",
};

export function Container({
  size = "default",
  as: Component = "div",
  className,
  children,
  ...props
}) {
  return (
    <Component className={cn(sizes[size], className)} {...props}>
      {children}
    </Component>
  );
}
