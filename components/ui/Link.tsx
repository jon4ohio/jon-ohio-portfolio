"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

export type LinkProps = Omit<NextLinkProps, "href"> & {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
};

export function Link({ href, children, className, style, onClick, target, rel, ...rest }: LinkProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  if (isExternal) {
    const safeRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
    return (
      <a href={href} className={className} style={style} onClick={onClick} target={target} rel={safeRel}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={className} style={style} onClick={onClick} {...rest}>
      {children}
    </NextLink>
  );
}

export default Link;
