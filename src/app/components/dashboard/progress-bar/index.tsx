import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  title: string;
  percentage: number;
}

type LinearProgressWithLabelProps = LinearProgressProps & {
  value: number;
  title: string;
};

function LinearProgressWithLabel(props: LinearProgressWithLabelProps) {
  const { value, title, ...otherProps } = props;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="subtitle1" color="text.primary" sx={{ mr: 1 }}>
        {title}
      </Typography>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={value} {...otherProps} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({ percentage, title }: Props) {
  const progress = percentage;

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} title={title} />
    </Box>
  );
}
