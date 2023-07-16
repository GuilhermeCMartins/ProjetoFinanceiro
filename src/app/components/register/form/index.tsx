import React from "react";
import { ContainerFormStyle } from "../container/style";

type CustomContainerProps = {
  children: React.ReactNode;
};

const ContainerForm: React.FC<CustomContainerProps> = ({
  children,
  ...props
}) => {
  return <ContainerFormStyle {...props}>{children}</ContainerFormStyle>;
};

export default ContainerForm;
