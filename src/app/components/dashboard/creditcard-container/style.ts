import { styled } from "@/app/stitches.config";

const CCContainer = styled("div", {
  variants: {
    type: {
      left: {
        width: "65%",
        paddingRight: "1rem",
        borderRight: "2px solid #E8E8E8",
      },
      right: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "1.25rem",
        width: "30%",
        h3: {
          margin: 0,
        },
        h4: {
          margin: 0,
        },
      },
    },
    balance: {
      current: {
        h3: {
          color: "#197BBD",
          fontSize: "31px",
          fontWeight: "700",
        },
        h4: {
          color: "#AEAEAE",
          fontSize: "14px",
          fontWeight: "400",
        },
        span: {
          fontSize: "18px",
        },
        textAlign: "right",
      },
      income: {
        h3: {
          color: "#439A86",
          fontSize: "18px",
          fontWeight: "700",
        },
        h4: {
          color: "#AEAEAE",
          fontSize: "14px",
          fontWeight: "400",
        },
        span: {
          fontSize: "18px",
        },
        textAlign: "right",
      },
      outcome: {
        h3: {
          color: "#BB4430",
          fontSize: "18px",
          fontWeight: "700",
        },
        h4: {
          color: "#AEAEAE",
          fontSize: "14px",
          fontWeight: "400",
        },
        span: {
          fontSize: "18px",
        },
        textAlign: "right",
      },
    },
  },
});


export {
  CCContainer
}