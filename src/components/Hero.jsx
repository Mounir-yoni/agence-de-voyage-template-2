"use client";

import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

const destinations = [
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'africa', label: 'Africa' },
    { value: 'north-america', label: 'North America' },
    { value: 'south-america', label: 'South America' },
    { value: 'australia', label: 'Australia' },
];

const travelerOptions = [
    { value: '1', label: '1 Traveler' },
    { value: '2', label: '2 Travelers' },
    { value: '3', label: '3 Travelers' },
    { value: '4', label: '4 Travelers' },
    { value: '5+', label: '5+ Travelers' },
];

// Array of hero images to rotate through
const heroImages = [
    'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
    'https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg',
    'https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg',
];

export default function Hero() {
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedDestination, setSelectedDestination] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTravelers, setSelectedTravelers] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Create query parameters
        const queryParams = new URLSearchParams({
            destination: selectedDestination,
            date: selectedDate,
            travelers: selectedTravelers
        });

        // Navigate to offers page with search parameters
        router.push(`/offers?${queryParams.toString()}`);
    };

    return (
        <section className="relative h-screen min-h-[600px] w-full">
            {/* Background image */}
            <div className="absolute inset-0 overflow-hidden">
                {heroImages.map((image, index) => (
                    <div
                        key={index}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{
                            opacity: index === currentImageIndex ? 1 : 0,
                            zIndex: index === currentImageIndex ? 10 : 0
                        }}
                    >
                        <img
                            src={image}
                            alt="Travel destination"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pt-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn">
                    Discover Your Perfect Getaway
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl mb-8 animate-fadeIn animation-delay-200">
                    Unforgettable experiences await. Let us take you on a journey of a lifetime.
                </p>

                {/* Search form */}
                <form onSubmit={handleSearch} className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-lg p-6 animate-fadeIn animation-delay-400">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Destination</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                                <select
                                    value={selectedDestination}
                                    onChange={(e) => setSelectedDestination(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                                >
                                    <option value="" style={{ color: '#262626' }}>Select Destination</option>
                                    {destinations.map((dest) => (
                                        <option key={dest.value} value={dest.value} style={{ color: '#262626' }}>
                                            {dest.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Dates</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Travelers</label>
                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                                <select
                                    value={selectedTravelers}
                                    onChange={(e) => setSelectedTravelers(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                                >
                                    <option value="" style={{ color: '#262626' }}>Select Travelers</option>
                                    {travelerOptions.map((option) => (
                                        <option key={option.value} value={option.value} style={{ color: '#262626' }}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full md:w-auto px-8 py-3 bg-[#262626] text-white rounded-lg hover:bg-[#1a1a1a] transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                    >
                        <Search className="h-5 w-5" />
                        Search
                    </button>
                </form>
            </div>
        </section>
    );
}