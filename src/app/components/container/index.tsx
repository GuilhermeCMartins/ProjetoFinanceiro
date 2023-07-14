import React from "react";
import styled from "styled-components";

const CustomContainer = styled.div`
  width: 83%;
`;

type CustomContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<CustomContainerProps> = ({ children, ...props }) => {
  return <CustomContainer {...props}>{children}</CustomContainer>;
};

export default Container;
