import { LoadingButton } from "@mui/lab";
import AnimatedIcon from "./AnimatedIcon";
import { SxProps, Typography } from "@mui/material";
import add from "../../../public/icons/add.json";
import addWhite from "../../../public/icons/add_white.json";
import back from "../../../public/icons/back.json";
import backWhite from "../../../public/icons/back_white.json";
import save from "../../../public/icons/save.json";
import { MouseEvent, useEffect, useRef } from "react";
import { Player } from "@lordicon/react";


export const iconMapper = {
  add: add,
  add_white: addWhite,
  back: back,
  back_white: backWhite,
  save: save,
};

interface AnimatedButtonProps {
  isLoading?: boolean;
  onClick?: (e: MouseEvent) => void;
  text: string;
  icon: keyof (typeof iconMapper);
  iconSize?: number;
  fontSize?: string;
  sx?: SxProps;
  typeProps?: SxProps;
}
export default function AnimatedButton({isLoading, onClick, text, icon, iconSize, fontSize, sx, typeProps}: AnimatedButtonProps) {
  const iconRef = useRef<Player>(null);
  const lottie = iconMapper[icon];

  return (
    <LoadingButton
      variant="contained"
      startIcon={lottie && (
        <Player
          ref={iconRef}
          icon={lottie}
          size={iconSize ? iconSize : 22}
          onComplete={() => setTimeout(()=>iconRef.current?.goToFirstFrame(),800)}
        />
      )}
      sx={{
        padding: '10px 60px',
        ...sx
      }}
      onClick={onClick}
      onMouseEnter={() => iconRef.current?.playFromBeginning()}
      loading={isLoading}
      loadingPosition="start"
    >
      <Typography
        variant="button"
        fontSize={fontSize? fontSize : '1.6rem'}
        sx={typeProps}
      >
        {text}
      </Typography>
    </LoadingButton>
  )
}