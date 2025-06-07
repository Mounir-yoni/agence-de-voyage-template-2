import OfferCard from './components/OfferCard';
import axios from 'axios';
export const metadata = {
    title: 'Offers',
    description: 'Our Travel Offers',
};



async function getOffers() {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/voyages', {
            timeout: 20000, // 20 ثانية للسماح بالرد عند الاستيقاظ من النوم
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching offers:', error);
        throw error;
    }
}

export default async function OffersPage() {
    let offers;
    let error = null;

    try {
        offers = await getOffers();
    } catch (err) {
        error = 'Failed to fetch offers. Please try again later.';
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-center">
                    <p className="text-xl">{error}</p>
                    <a
                        href="/offers"
                        className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition inline-block"
                    >
                        Try Again
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden mb-12 mt-10">
                <div className="relative h-40 md:h-80 w-full">
                    <img
                        src="https://images.pexels.com/photos/7412069/pexels-photo-7412069.jpeg"
                        alt="Special Offers"
                        loading="lazy"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Special Offers & Deals
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl">
                        Discover our exclusive promotions and save on your next adventure
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offers.map((offer) => (
                        <OfferCard key={offer._id} offer={offer} />
                    ))}
                </div>
            </div>
        </div>
    );
} 