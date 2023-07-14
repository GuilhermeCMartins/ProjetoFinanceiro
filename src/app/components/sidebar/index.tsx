import React from "react";
import { styled } from "@/app/stitches.config";

const SidebarContainer = styled("div", {
  width: "15%",
  borderRight: "3px solid #f8f8f8",
});

type SidebarContainerProps = {
  children: React.ReactNode;
};

const Sidebar: React.FC<SidebarContainerProps> = ({ children, ...props }) => {
  return <SidebarContainer {...props}>{children}</SidebarContainer>;
};

export default Sidebar;
