'use client';
import { MouseEvent, useRef } from "react";
import { IconButton } from "@mui/material";
import trashIcon from "../../../public/icons/trash-bin.json";
import editIcon from "../../../public/icons/edit.json";
import { Player } from "@lordicon/react";

interface AnimatedIconProps {
  icon: 'delete' | 'edit';
  clickHandler: (event: MouseEvent) => void;
}
export default function AnimatedIcon({icon, clickHandler}: AnimatedIconProps) {
  const iconRef = useRef<Player>(null);
  let lottie: typeof trashIcon | typeof editIcon | undefined = undefined;
  if (icon === 'delete') {
    lottie = trashIcon
  } else if (icon==='edit') {
    lottie = editIcon
  }
  return (
    <IconButton
      onClick={clickHandler}
      onMouseEnter={() => iconRef.current?.playFromBeginning()}
    >
      {lottie &&
        <Player ref={iconRef} icon={lottie} />
      }
    </IconButton>
  );
}
