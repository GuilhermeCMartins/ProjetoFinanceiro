import { styled } from "@/app/stitches.config";

const FormRegisterStyle = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "1rem",
    width: "300px",
    height: "400px",
    boxShadow:
        "0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06)",
});

export {
    FormRegisterStyle
}