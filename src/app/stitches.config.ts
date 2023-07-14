import { createStitches } from '@stitches/react';

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config,
} = createStitches({
    theme: {
        colors: {
            gray: "#c7c7c7",
            blue: "#197bbd",
            lightBlue: "#f0f7ff",
        },
        fontSizes: {
            14: "14px",
        },
        fontWeights: {
            700: "700",
        },
        lineHeights: {
            normal: "normal",
        },
    },
    media: {
        bp1: '(max-width: 480px)',
        bp2: '(max-width: 768px)',
        bp3: '(max-width: 1100px)',
        bp4: '(max-width: 1600px)',
    },
});

