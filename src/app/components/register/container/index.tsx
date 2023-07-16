import React from "react";
import { FormRegisterStyle } from "../form/style";

type CustomContainerProps = {
  children: React.ReactNode;
};

const FormRegister: React.FC<CustomContainerProps> = ({
  children,
  ...props
}) => {
  return <FormRegisterStyle {...props}>{children}</FormRegisterStyle>;
};

export default FormRegister;
