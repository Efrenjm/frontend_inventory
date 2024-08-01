'use client';
import { MouseEvent, useEffect, useRef } from "react";
import { Box, IconButton, SxProps } from "@mui/material";
import { Player } from "@lordicon/react";

import loading from "../../../public/icons/loading.json";
import notFound from "../../../public/icons/notfound.json";
import warning from "../../../public/icons/warning.json";

export const iconMapper = {
  loading: loading,
  warning: warning,
  notFound: notFound,
};

interface LoopedAnimationProps {
  icon: keyof (typeof iconMapper);
  size?: number;
  onClick?: (event: MouseEvent) => void;
  sx?: SxProps
}
export default function LoopedAnimation({ icon, size, onClick, sx }: LoopedAnimationProps) {
  const iconRef = useRef<Player>(null);

  const lottie = iconMapper[icon];

  useEffect(() => {
    iconRef.current?.playFromBeginning();
    const intervalId = setInterval(() => {
      iconRef.current?.playFromBeginning();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <Box sx={sx}>
      {lottie &&
        <Player
        ref={iconRef}
        icon={lottie}
        size={size ? size : 22}
        />
      }
    </Box>
    </>
  );
}
