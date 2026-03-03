import { cn } from "@/lib/utils";

export function Container({
  size = "default",
  as: Component = "div",
  className,
  children,
  ...props
}) {
  const sizes = {
    default: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    narrow: "max-w-3xl mx-auto px-4 sm:px-6",
    wide: "max-w-360 mx-auto px-4 sm:px-6 lg:px-8",
  };

  return (
    <Component className={cn(sizes[size], className)} {...props}>
      {children}
    </Component>
  );
}
