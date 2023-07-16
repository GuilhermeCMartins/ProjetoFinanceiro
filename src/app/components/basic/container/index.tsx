import React from "react";
import { styled } from "@/app/stitches.config";

const CustomContainer = styled("div", {
  width: "95%",
  height: "fit-content",
});

type CustomContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<CustomContainerProps> = ({ children, ...props }) => {
  return <CustomContainer {...props}>{children}</CustomContainer>;
};

export default Container;
