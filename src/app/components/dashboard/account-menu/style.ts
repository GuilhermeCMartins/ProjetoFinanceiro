import { styled } from "@/app/stitches.config";

const AvatarContainer = styled("div", {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "1rem 2rem",
    gap: "0.75rem",
});

const TextContainer = styled("div", {
    h3: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#404040",
        margin: "0 0 0.3rem 0",
    },
    h4: {
        fontSize: "14px",
        fontWeight: "400",
        color: "#AEAEAE",
        margin: 0,
    },
});

export {
    AvatarContainer,
    TextContainer
}