"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type TransitionContextType = {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const startTransition = async (href: string) => {
    setIsTransitioning(true);
    // Wait for animation "in" (e.g., 800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    router.push(href);
    
    // Wait for page load simulation + animation "out"
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsTransitioning(false);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
