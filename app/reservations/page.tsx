import { getCurrentUser } from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import EmptyState from '../components/EmptyState';
import ReservationClient from './ReservationClient';

const ReservatioPage = async () => {
   const currentUser = await getCurrentUser();
   if (!currentUser)
      return (
         <EmptyState
            title="Unauthorized"
            subtitle="Please login"
         />
      );

   const reservations = await getReservations({
      authorId: currentUser.id,
   });

   if (reservations?.length === 0) {
      return (
         <EmptyState
            title="No reservations found"
            subtitle="Looks like you have no reservaions on your property"
         />
      );
   }

   return (
      <ReservationClient
         reservations={reservations}
         currentUser={currentUser}
      />
   );
};

export default ReservatioPage;
