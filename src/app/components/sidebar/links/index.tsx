import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { styled } from "@/app/stitches.config";

const LinksComponentWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "1rem",
  height: "50%",
  width: "fit-content",
  margin: "0 auto",
  marginTop: "10rem",
  a: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
    fontSize: "$14",
    fontStyle: "normal",
    fontWeight: "$700",
    lineHeight: "$normal",
    color: "$gray",
  },

  "a.active": {
    color: "$blue",
  },

  "a.activeBackground": {
    background: "$lightBlue",
    width: "165px",
    height: "39px",
  },
});

const links = [
  {
    label: "Geral",
    href: "/dashboard",
    image: "/basic/overview.svg",
    imageActive: "/basic/overviewActive.svg",
  },
];

const Links = () => {
  const pathname = usePathname();

  return (
    <LinksComponentWrapper>
      {links.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className={pathname === item.href ? "active activeBackground" : ""}
        >
          <Image
            src={pathname === item.href ? item.imageActive : item.image}
            width={30}
            height={30}
            alt=""
          />
          <h3>{item.label}</h3>
        </a>
      ))}
    </LinksComponentWrapper>
  );
};

export default Links;
