import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getLocalStorage } from '../../utils/localStorage';

const BookedHotels = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            const token = getLocalStorage("token");
            const response = await axios.get('https://back-end-2-e1b4.onrender.com/api/v1/hotel-reservations/my-reservations', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                setReservations(response.data);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div>
            {/* Render your reservations component here */}
        </div>
    );
};

export default BookedHotels; 