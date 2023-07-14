import React from "react";
import { styled } from "@/app/stitches.config";

const NavbarContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "1rem",
});

type NavbarContainerProps = {
  children: React.ReactNode;
};

const Navbar: React.FC<NavbarContainerProps> = ({ children, ...props }) => {
  return <NavbarContainer {...props}>{children}</NavbarContainer>;
};

export default Navbar;
