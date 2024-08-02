'use client';
import { useState, useEffect, useRef } from "react";
import { Player } from "@lordicon/react";

import loadingIcon from "../../../public/icons/loading.json";
import notFoundIcon from "../../../public/icons/notfound.json";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";

// const Player = dynamic(() => import("@lordicon/react").then(mod => mod.Player), { ssr: false });

interface LoadingProps {
  error?: boolean;
  iconSize?: number;
}
export default function Searching({ error, iconSize }: LoadingProps) {
  const [message, setMessage] = useState({title: ' ', message: ' '});
  const iconRef = useRef<Player>(null);

  useEffect(() => {
    iconRef.current?.playFromBeginning();
  }, [error]);

  return (
    <Box width="100%" sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>

      {!error ? (
        <Player
          ref={iconRef}
          icon={loadingIcon}
          size={iconSize?? 200}
          onComplete={!error ? () => iconRef.current?.playFromBeginning() : undefined}
          />
      ) : (
        <Player
          ref={iconRef}
          icon={notFoundIcon}
          size={iconSize?? 200}
          onComplete={()=>{
            setMessage({
              title: 'Ups... Something went wrong',
              message: 'This service is not available at the moment, please try again later'
          })
        }}
        />
      )}

      <div style={{height:'100px'}}>
        <Typography variant="h4">{message.title}</Typography>
        <Typography variant="subtitle1">{message.message}</Typography>
      </div>
    </Box>
  );
}
