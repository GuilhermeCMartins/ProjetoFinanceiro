import React from "react";
import { styled } from "@/app/stitches.config";

const CardsContainer = styled("div", {
  borderRadius: "28px",
  background: "linear-gradient(180deg, #FFF 0%, #FFF 100%)",
  boxShadow:
    "0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06)",
  variants: {
    container: {
      cards: {
        width: "600px",
        height: "350px",
        padding: "1rem",
      },
      transactionHistory: {
        boxSizing: "border-box",
        width: "600px",
        height: "fit-content",
        h3: {
          margin: "1rem 2rem",
          paddingTop: "1.5rem",
        },
      },
      miniCards: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "160px",
        height: "170px",
        padding: "1rem",
        h3: {
          color: "#404040",
          fontSize: "20px",
          fontWeight: "400",
        },
      },
      lastTransactions: {
        width: "80px",
        height: "80px",
      },
      newTransaction: {
        width: "500px",
        height: "183.032px",
        padding: "1rem 1rem",
        h3: {
          margin: 0,
        },
        h4: {
          marginTop: "1rem",
        },
      },
    },
  },
});

type CardsContainerProps = {
  children: React.ReactNode;
  container:
    | "cards"
    | "transactionHistory"
    | "miniCards"
    | "lastTransactions"
    | "newTransaction";
};

const Cards: React.FC<CardsContainerProps> = ({ children, container }) => {
  return <CardsContainer container={container}>{children}</CardsContainer>;
};

export default Cards;
