import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";

type LinkButtonProps = ComponentProps<typeof Link> & { href: string };
type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const className = ["button", props.className].filter(Boolean).join(" ");

  if (typeof props.href === "string") {
    return <Link {...props} className={className} />;
  }

  return <button {...props} className={className} type={props.type ?? "button"} />;
}
