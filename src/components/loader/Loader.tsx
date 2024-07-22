import { CircularProgress, Fade } from "@mui/material";
import Box from "@mui/material/Box";


export default function Loader({isPending}: {isPending: boolean}) {
  return (
    <Box sx={{ display: 'flex', width:'100%', height:'100%', justifyContent:'center', alignItems:'center' }}>
      <Fade
        in={isPending}
        style={{
          transitionDelay: isPending ? '600ms' : '0ms',
        }}
        unmountOnExit
      >
        <CircularProgress size='15vw' />
      </Fade>
    </Box>
  )
}