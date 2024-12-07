import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/tailwind/cn';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-light ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-rubik font-regular',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 border border-black',
        defaultWithoutBorder:
          'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        secondary: 'border border-black bg-background hover:bg-primary/90',
        ghost: 'hover:bg-primary/90',
        link: 'underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" color="#cecaff" />
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
