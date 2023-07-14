import React from "react";
import { styled } from "@/app/stitches.config";

const TitleContainer = styled("div", {
  h1: {
    margin: 0,
    fontSize: "43px",
    fontWeight: "600",
  },
  h3: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "400",
    color: "#AEAEAE",
  },
});

type TitleContainerProps = {
  children: React.ReactNode;
};

const Title: React.FC<TitleContainerProps> = ({ children, ...props }) => {
  return <TitleContainer {...props}>{children}</TitleContainer>;
};

export default Title;
