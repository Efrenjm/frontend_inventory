import { Typography } from "@mui/material";
import LoopedAnimation from "./LoopedAnimation";

interface NotFoundProps {
  title: string;
  message: string;
}
export default function NotFound({ title, message }: NotFoundProps) {
  return (
    <>
      <LoopedAnimation
        icon='warning'
        size={200}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      />
      <Typography variant='h5'>
        {title}
      </Typography>
      <Typography variant='subtitle1'>
        {message}
      </Typography>
    </>
  )
}