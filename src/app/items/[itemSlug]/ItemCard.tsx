'use client';
import BackgroundCard from "@/components/Card/BackgroundCard";
import FormFields from "@/components/Card/FormFields";
import { generateFormValues } from "@/utils/dataManipulation";
import ItemNotFound from "@/components/errors/ItemNotFound";
import BadRequest from "@/components/errors/BadRequest";
import Loader from "@/components/loader/Loader";
import { getAllItems, getItemById } from "@/utils/queries";
import { useQuery } from "@apollo/client";
import { GetItemByIdQuery, GetItemByIdQueryVariables } from "@/__generated__/graphql";

interface CustomCardProps {
  id: number;
}

export default function ItemCard({id}: CustomCardProps) {

  const {data, loading, error} = useQuery<GetItemByIdQuery, GetItemByIdQueryVariables>(
    getItemById,
    {variables: {id: id.toString()}}
  );

  // if (data?.getItemById) {
  //
  // }

  return (
    <BackgroundCard component='div'>
      {error && (error.cause?.message === "Not found" ? <ItemNotFound/> : <BadRequest/>)}
      {loading && <Loader isPending={loading}/>}
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
      {data && (
          <FormFields
            formValues={generateFormValues(data.getItemById!)}
            readOnly={true}
          />
      )}
    </BackgroundCard>
  );
}