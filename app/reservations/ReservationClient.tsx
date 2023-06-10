'use client';

import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { Listing, Reservation } from '@prisma/client';
import { SafeUser } from '../types';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import ListingCard from '../components/listings/ListingCard';
interface ReservationsClientProps {
   reservations: (Reservation & { listing: Listing })[];
   currentUser?: SafeUser | null;
}
const ReservationClient: React.FC<ReservationsClientProps> = ({
   reservations,
   currentUser,
}) => {
   const router = useRouter();
   const [deletingId, setDeletingId] = useState('');
   const onCancel = useCallback(
      (id: string) => {
         setDeletingId(id);
         axios
            .delete(`/api/reservations/${id}`)
            .then(() => {
               toast.success('Reservation cancelled');
               router.refresh();
            })
            .catch(() => {
               toast.error('Something went wrong');
            })
            .finally(() => setDeletingId(''));
      },
      [router],
   );
   return (
      <Container>
         <Heading
            title="Reservations"
            subtitle="Bookings on your properties"
         />
         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {reservations.map((reservation) => (
               <ListingCard
                  key={reservation.id}
                  data={reservation.listing}
                  reservation={reservation}
                  actionId={reservation.id}
                  onAction={onCancel}
                  disabled={deletingId === reservation.id}
                  currentUser={currentUser}
               />
            ))}
         </div>
      </Container>
   );
};
export default ReservationClient;
