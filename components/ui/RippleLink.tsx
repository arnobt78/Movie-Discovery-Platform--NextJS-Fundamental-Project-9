"use client";

/**
 * RippleLink - Link with ripple effect for button-styled links.
 */
import Link from "next/link";
import {
  useRef,
  useState,
  useCallback,
  type MouseEvent,
  type ReactNode,
} from "react";

interface RippleLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function RippleLink({ href, children, className = "" }: RippleLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const idRef = useRef(0);

  const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const link = linkRef.current;
    if (!link) return;

    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++idRef.current;
    setRipples((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  }, []);

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={handleClick}
      className={`relative overflow-hidden inline-block ${className}`}
    >
      {children}
      {ripples.map(({ x, y, id }) => (
        <span
          key={id}
          className="absolute rounded-full bg-white/40 pointer-events-none animate-ripple"
          style={{
            left: x,
            top: y,
            width: 0,
            height: 0,
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden
        />
      ))}
    </Link>
  );
}
