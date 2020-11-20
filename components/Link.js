import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default ({ href, children }) => {
  const router = useRouter();

  let className = children.props.className || "";
  if (router.pathname === href) {
    className = ` button is-primary`;
  }

  return (
    <Link className={className} href={href}>
      {React.cloneElement(children, { className })}
    </Link>
  );
};
