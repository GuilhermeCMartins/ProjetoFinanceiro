import { styled } from "@stitches/react";

const ContainerNewTransaction = styled("div", {
    variants: {
        type: {
            principle: {
                display: "flex",
                gap: "1rem",
                marginTop: ".5rem"
            },
            left: {
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            },
            right: {
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }
        }
    }
})

export {
    ContainerNewTransaction
}