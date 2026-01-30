"use client";

import Link from "next/link";
import { useTransition } from "./TransitionContext";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function TransitionLink({ href, children, className, onClick }: Props) {
  const { startTransition } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only intercept if it's not a modifier click (ctrl/cmd + click)
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        if (onClick) onClick();
        startTransition(href);
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
