import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps, Typography } from "@mui/material";
import add from "../../../public/icons/add.json";
import add_green from "../../../public/icons/add.json";
import addWhite from "../../../public/icons/add_white.json";
import back from "../../../public/icons/back.json";
import backWhite from "../../../public/icons/back_white.json";
import save from "../../../public/icons/save.json";
import { MouseEvent, useRef } from "react";
import { Player } from "@lordicon/react";

export const iconMapper = {
  add: add_green,
  add_white: addWhite,
  back: back,
  back_white: backWhite,
  save: save,
};

interface AnimatedButtonProps {
  isLoading?: boolean;
  onClick?: (e: MouseEvent) => void;
  text: string;
  icon?: keyof typeof iconMapper;
  iconSize?: number;
  fontSize?: string;
  sx?: SxProps;
  typeProps?: SxProps;
}
export default function AnimatedButton({
  isLoading,
  onClick,
  text,
  icon,
  iconSize,
  fontSize,
  sx,
  typeProps,
}: AnimatedButtonProps) {
  const iconRef = useRef<Player>(null);
  const lottie = icon ? iconMapper[icon] : false;

  return (
    <LoadingButton
      variant="contained"
      startIcon={
        lottie && (
          <Player
            ref={iconRef}
            icon={lottie}
            size={iconSize ? iconSize : 22}
            onComplete={() => setTimeout(() => iconRef.current?.goToFirstFrame(), 800)}
          />
        )
      }
      sx={{
        padding: "10px 60px",
        border: "3px solid transparent",
        borderImage: "linear-gradient(#08abac, #01698b) 1",
        borderRadius: 0,
        background: "#1e2328",
        transition: "all ease .5s",
        ":hover": {
          backgroundImage: `url('/btn.jpg')`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          boxShadow:
            "0 0 10px 4px rgba(192, 252, 253, .4), inset 0 0 5px 2px rgba(192, 252, 253, .3)",
          border: "3px solid rgba(192, 252, 253, .75)",
          cursor: "pointer",
        },
        ...sx,
      }}
      onClick={onClick}
      onMouseEnter={() => iconRef.current?.playFromBeginning()}
      loading={isLoading}
      loadingPosition="start"
      aria-label={text}
      // data-testid={text.replace(/\s+/g, '-').toLowerCase()}
    >
      <Typography variant="button" fontSize={fontSize ? fontSize : "1.6rem"} sx={typeProps}>
        {text}
      </Typography>
    </LoadingButton>
  );
}
