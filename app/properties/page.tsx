import { getCurrentUser } from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import getReservations from '../actions/getReservations';
import EmptyState from '../components/EmptyState';
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
   const currentUser = await getCurrentUser();
   if (!currentUser) {
      return (
         <EmptyState
            title="Unauthorized"
            subtitle="Please login"
         />
      );
   }
   const listings = await getListings({
      userId: currentUser.id,
   });
   console.log(listings);
   if (listings?.length === 0) {
      return (
         <EmptyState
            title="No properties found"
            subtitle="Looks like you have no properties"
         />
      );
   }
   return (
      <PropertiesClient
         //@ts-ignore
         listings={listings}
         currentUser={currentUser}
      />
   );
};

export default PropertiesPage;
