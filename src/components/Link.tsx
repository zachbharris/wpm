import { cn } from "@/lib/utils";
type LinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

export default function Link({
  children,
  className,
  external,
  ...props
}: LinkProps) {
  const externalProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};
  return (
    <a
      className={cn("font-bold text-neutral-200 underline", className)}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  );
}
