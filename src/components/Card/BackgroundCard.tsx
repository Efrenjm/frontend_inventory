import { ElementType, ReactNode } from "react";
import { Paper, SxProps, Box } from "@mui/material";
import NavCardOptions from "@/components/card/NavCardOptions";

interface BackgroundCardProps {
  children?: ReactNode;
  sx?: SxProps;
  deletable?: boolean;
  component: ElementType;
}

export default function BackgroundCard({
  children,
  sx,
  deletable,
  component = "div",
}: BackgroundCardProps) {
  return (
    <Paper
      component="div"
      sx={{
        minHeight: "700px",
        height: "auto",
        minWidth: "360px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        bgcolor: "primary.dark",
        ...sx,
      }}
    >
      <NavCardOptions
        deletable={deletable}
        sx={{
          position: "absolute",
          top: 0,
          mt: "30px",
        }}
      />
      <Box
        component={component}
        sx={{
          position: "absolute",
          top: 0,
          mt: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: component === "form" ? "center" : "flex-start",
          rowGap: "60px",
          width: { xs: "90%", sm: "80%", md: "80%" },
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}
