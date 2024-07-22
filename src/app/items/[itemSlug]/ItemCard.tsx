'use client';

import { FormInvalidValues, FormValues, Item } from "@/utils/types";
import BackgroundCard from "@/components/Card/BackgroundCard";
import FormFields from "@/components/Card/FormFields";
import { generateFormValues } from "@/utils/dataManipulation";
import ItemNotFound from "@/components/errors/ItemNotFound";
import BadRequest from "@/components/errors/BadRequest";
import Box from "@mui/material/Box";
import { CircularProgress, Fade } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "@/utils/http";
import Loader from "@/components/loader/Loader";

interface CustomCardProps {
  id: number;
}

export default function ItemCard({id}: CustomCardProps) {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ['items', {id}],
    queryFn: ({signal, queryKey}) => {
      const {id} = queryKey[1] as {id: number};
      return getItem({signal, id});
    },
    staleTime: 5000,
  });

  return (
    <BackgroundCard component={isSuccess? 'form' : 'div'}>
      {isError && (error.cause === 404 ? <ItemNotFound/> : <BadRequest/>)}
      {isPending && <Loader isPending={isPending}/>}
        {/*// <Box sx={{ display: 'flex', width:'100%', height:'100%', justifyContent:'center', alignItems:'center' }}>*/}
        {/*//   <Fade*/}
        {/*//     in={isPending}*/}
        {/*//     style={{*/}
        {/*//       transitionDelay: isPending ? '600ms' : '0ms',*/}
        {/*//     }}*/}
        {/*//     unmountOnExit*/}
        {/*//   >*/}
        {/*//     <CircularProgress size='15vw' />*/}
        {/*//   </Fade>*/}
        {/*// </Box>*/}
      {/*)}*/}
      {isSuccess && (
          <FormFields
            formValues={generateFormValues(data)}
            readOnly={true}
          />
      )}
    </BackgroundCard>



  );
}