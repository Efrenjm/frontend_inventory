'use client';
import { useEffect, useRef } from "react";
import { Box, SxProps } from "@mui/material";
import { Player } from "@lordicon/react";

import warning from "../../../public/icons/warning.json";

export const iconMapper = {
  warning: warning,
};

interface LoopedAnimationProps {
  icon: keyof (typeof iconMapper);
  size?: number;
  sx?: SxProps
}
export default function LoopedAnimation({ icon, size, sx }: LoopedAnimationProps) {
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
