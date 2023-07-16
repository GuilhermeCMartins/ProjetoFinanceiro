import React from "react";
import { CustomContainer } from "./style";

type CustomContainerProps = {
  children: React.ReactNode;
};

const Graphs: React.FC<CustomContainerProps> = ({ children, ...props }) => {
  return <CustomContainer {...props}>{children}</CustomContainer>;
};

export default Graphs;
