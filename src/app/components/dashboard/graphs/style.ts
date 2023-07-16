import { styled } from "@/app/stitches.config";

const CustomContainer = styled("div", {
    maxHeight: "150px",
    overflowY: "scroll",
    overflowX: "hidden",
    width: "500px",
    padding: "9px",
    "&::-webkit-scrollbar": {
        width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#197BBD",
        borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "$lightBlue",
        borderRadius: "4px",
    },
});

export {
    CustomContainer
}