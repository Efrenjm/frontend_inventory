'use client';
import ItemCard from "@/components/Card/ItemCard";
import { getItem } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import BackgroundCard from "@/components/Card/BackgroundCard";
import BadRequest from "@/components/errors/BadRequest";
import Box from "@mui/material/Box";
import { CircularProgress, Fade } from "@mui/material";
import ItemNotFound from "@/components/errors/ItemNotFound";


interface ItemDetailPageProps {
  params: {
    itemSlug: string;
  }
}

export default function ItemDetailPage({params}: ItemDetailPageProps) {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['items', {id: parseInt(params.itemSlug)}],
    queryFn: ({signal, queryKey}) => {
      const {id} = queryKey[1] as {id: number};
      return getItem({signal, id});
    },
    staleTime: 5000,
  });

  return (
    <>
      {isError && (
        <BackgroundCard component={'div'}>
          {error.cause === 404 ? <ItemNotFound/> : <BadRequest/>}
          {/*<h1>Oops, something went wrong</h1>*/}
        </BackgroundCard>
      )}
      {isPending && (
        <BackgroundCard component="div" >
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
        </BackgroundCard>
      )}
      {data && <ItemCard item={data} />}
    </>
  );
}