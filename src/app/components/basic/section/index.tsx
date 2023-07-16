import React from "react";
import styled from "styled-components";

const SectionContainer = styled.div``;

type SectionContainerProps = {
  children: React.ReactNode;
};

const Section: React.FC<SectionContainerProps> = ({ children, ...props }) => {
  return <SectionContainer {...props}>{children}</SectionContainer>;
};

export default Section;
