import React from "react";
import { CCContainer } from "./style";

type CustomContainerProps = {
  children: React.ReactNode;
  type?: "left" | "right";
  balance?: "current" | "income" | "outcome";
};

const CreditCardContainer: React.FC<CustomContainerProps> = ({
  children,
  type,
  balance,
}) => {
  return (
    <CCContainer type={type} balance={balance}>
      {children}
    </CCContainer>
  );
};

export default CreditCardContainer;
