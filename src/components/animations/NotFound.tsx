import { Typography } from "@mui/material";
import LoopedAnimation from "./LoopedAnimation";

interface NotFoundProps {
  title: string;
  message: string;
  size?: number;
}

export default function NotFound({title, message, size}: NotFoundProps) {
  return (
    <>
      <LoopedAnimation
        icon='warning'
        size={size ?? 200}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      />
      <Typography
        variant='h5'
        fontSize={{xs: '2.5rem', sm:'2.75rem', md:'3rem', lg:'3.25rem'}}
        lineHeight={1}
      >
        {title}
      </Typography>
      <Typography
        variant='subtitle1'
        fontSize={{xs: '1.75rem', sm:'2rem', md:'2.25rem', lg:'2.5rem'}}
        lineHeight={1}
      >
        {message}
      </Typography>
    </>
  )
}