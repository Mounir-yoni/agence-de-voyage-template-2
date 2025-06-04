"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faUsers, faMapMarkerAlt, faCheck, faArrowLeft, faTag, faTimes } from "@fortawesome/free-solid-svg-icons";
import BookingForm from "../../../components/BookingForm";
import Link from "next/link";
import { useNotification } from "../../../context/NotificationContext";
import Image from "next/image";
import { getLocalStorage, setLocalStorage } from '../../../utils/storage';

const OfferDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const { showNotification } = useNotification();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showBookingForm, setShowBookingForm] = useState(false);

    const handleBooking = async () => {
        try {
            const token = getLocalStorage('token');
            if (!token) {
                showNotification('Please log in to book this offer', 'error');
                router.push('/auth');
                return;
            }
            setShowBookingForm(true);
        } catch (err) {
            setError('Failed to book the offer');
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const cachedOffer = getLocalStorage(`offer_${id}`);
                if (cachedOffer) {
                    setOffer(JSON.parse(cachedOffer));
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`https://back-end-2-e1b4.onrender.com/api/v1/voyages/${id}`);
                const offerData = response.data.data;
                setOffer(offerData);
                setLocalStorage(`offer_${id}`, JSON.stringify(offerData));
                setLoading(false);
            } catch (err) {
                setError('Failed to load offer details');
                setLoading(false);
            }
        };

        fetchOffer();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
            </div>
        );
    }

    if (error || !offer) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-center">
                    <p className="text-xl">{error}</p>
                    <button
                        onClick={() => {
                            fetchOffer();
                        }}
                        className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Hero Section */}
                    <div className="relative rounded-xl overflow-hidden h-full">
                        <div className="relative w-full h-[400px]">
                            <Image
                                src={offer.image}
                                alt={offer.title}
                                fill
                                className="object-cover object-center"
                                priority
                                quality={100}
                                sizes="(max-width: 468px) 100vw, 50vw"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/40" />
                        {offer.discount && (
                            <div className="absolute top-4 right-4 bg-red-500 text-white text-lg font-bold px-4 py-2 rounded-full">
                                Save {offer.discount}%
                            </div>
                        )}
                    </div>

                    {/* Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <div className="mb-4">
                                {offer.originalPrice && (
                                    <span className="text-gray-500 line-through text-lg">{offer.originalPrice} DA</span>
                                )}
                                <span className="text-3xl font-bold text-amber-700 ml-2">{offer.prix} DA</span>
                                <span className="text-gray-500 text-sm ml-2">per person</span>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faTag} className="h-5 w-5 text-amber-700 mr-2" />
                                    <span className="text-sm">Limited time offer - Book now!</span>
                                </div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-amber-700 mr-2" />
                                    <span className="text-sm">Only {offer.remaining_places} spots left</span>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 transition mb-4"
                            >
                                Book Now
                            </button>
                            <Link href="/contact" className="block text-center text-amber-700 hover:underline">
                                <button className="w-full border-2 border-amber-700 text-amber-700 py-3 rounded-lg hover:bg-amber-50 transition">
                                    Contact Us
                                </button>
                            </Link>

                            <p className="text-sm text-gray-500 text-center mt-4">
                                Free cancellation up to 30 days before departure
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-1 grid grid-cols-1 gap-6">
                    {/* Included/Not Included Section */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                            <ul className="space-y-2">
                                {[
                                    'Accommodation in 4-star hotels',
                                    'Daily breakfast and select meals',
                                    'Professional tour guide',
                                    'All entrance fees',
                                    'Airport transfers',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Not Included</h2>
                            <ul className="space-y-2">
                                {[
                                    'International flights',
                                    'Travel insurance',
                                    'Personal expenses',
                                    'Optional activities',
                                    'Visa fees if applicable',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <FontAwesomeIcon icon={faTimes} className="text-red-500 mr-2" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center mt-10">{offer.title}</h1>
                    <p className="text-gray-600 mb-6 text-center">{offer.description}</p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg" style={{ background:"#262626" }}>
                            <FontAwesomeIcon icon={faCalendar} className="h-6 w-6 text-orange-600 mb-2" />
                            <span className="text-sm font-bold text-white">{offer.duree} day</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg" style={{ background:"#262626" }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="h-6 w-6 text-orange-600 mb-2" />
                            <span className="text-sm font-bold text-white">Guided tours</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg" style={{ background:"#262626" }}>
                            <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-orange-600 mb-2" />
                            <span className="text-sm font-bold text-white">{offer.remaining_places} spots left</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg" style={{ background:"#262626" }}>
                            <FontAwesomeIcon icon={faClock} className="h-6 w-6 text-orange-600 mb-2" />
                            <span className="text-sm font-bold text-white">24/7 Support</span>
                        </div>
                    </div>

                </div>


            </div>

            {/* Booking Form Modal */}
            {showBookingForm && (
                <BookingForm
                    offer={offer}
                    onClose={() => setShowBookingForm(false)}
                />
            )}
        </div>
    );
};

export default OfferDetails; 