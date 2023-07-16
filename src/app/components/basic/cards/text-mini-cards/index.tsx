import React from "react";
import { styled } from "@/app/stitches.config";

const TextCards = styled("div", {
  h3: {
    margin: 0,
    color: "#696969",
    fontSize: "24px",
    fontWeight: "600",
  },
  h4: {
    margin: 0,
    color: "#AEAEAE",
    fontSize: "14px",
    fontWeight: "400",
  },
});

type CustomContainerProps = {
  children: React.ReactNode;
};

const TextMiniCards: React.FC<CustomContainerProps> = ({ children }) => {
  return <TextCards>{children}</TextCards>;
};

export default TextMiniCards;
