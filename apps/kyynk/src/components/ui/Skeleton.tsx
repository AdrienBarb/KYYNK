import { cn } from '@/utils/tailwind/cn';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-zinc-100', className)}
      {...props}
    />
  );
}

export { Skeleton };
