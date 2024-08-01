'use client';
import { MouseEvent, useRef } from "react";
import { IconButton } from "@mui/material";
import { Player } from "@lordicon/react";

import add from "../../../public/icons/add.json";
import back from "../../../public/icons/back.json";
import barChart from "../../../public/icons/bar_chart.json";
import bookmarks from "../../../public/icons/bookmarks.json";
import clock from "../../../public/icons/clock.json";
import document from "../../../public/icons/document.json";
import edit from "../../../public/icons/edit.json";
import home from "../../../public/icons/home.json";
import location from "../../../public/icons/location_pin.json";
import money from "../../../public/icons/money.json";
import save from "../../../public/icons/save.json";
import trash from "../../../public/icons/trash_bin.json";

export const iconMapper = {
  add: add,
  edit: edit,
  delete: trash,
  back: back,
  save: save,
  home: home,
  document: document,
  bookmarks: bookmarks,
  barChart: barChart,
  clock: clock,
  location: location,
  money: money,
};

interface AnimatedIconProps {
  icon: keyof (typeof iconMapper);
  size?: number;
  onClick?: (event: MouseEvent) => void;
}
export default function AnimatedIcon({ icon, size, onClick }: AnimatedIconProps) {
  const iconRef = useRef<Player>(null);

  const lottie = iconMapper[icon];

  return (
    <IconButton
      onClick={onClick}
      onMouseEnter={() => iconRef.current?.playFromBeginning()}
      size="small"
    >
      {lottie &&
        <Player
          ref={iconRef}
          icon={lottie}
          size={size ? size : 22}
        />
      }
    </IconButton>
  );
}
