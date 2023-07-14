import React from "react";
import { styled } from "@/app/stitches.config";

const GeneralContainer = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
  width: "95%",
  height: "fit-content",
  padding: "10px 30px",
  margin: "0 auto",
  gap: "3%",
  borderRadius: "59px",
  background: "linear-gradient(141deg, #fff 0%, #fff 68.57%, #fff 100%)",
  boxShadow:
    "0px 0px 2px 0px rgba(0, 0, 0, 0.04), 0px 4px 10px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.04), 0px 24px 36px 0px rgba(0, 0, 0, 0.04)",
});

type GeneralContainerProps = {
  children: React.ReactNode;
};

const General: React.FC<GeneralContainerProps> = ({ children, ...props }) => {
  return <GeneralContainer {...props}>{children}</GeneralContainer>;
};

export default General;
