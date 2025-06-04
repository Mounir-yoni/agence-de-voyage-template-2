import Hero from '../components/Hero';
import Features from '../components/Features';
import OffersSlider from '../components/OffersSlider';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import VacationPromo from '../components/VacationPromo';
import Footer from '../components/Footer';
import { testimonials } from '../data/testimonials';
import TestimonialCard from '../components/Testimonials';

export const metadata = {
    title: 'Travel Agency - Your Journey Begins Here',
    description: 'Discover amazing travel experiences with our expert travel agency. We offer customized tours, luxury accommodations, and unforgettable adventures worldwide. Book your dream vacation today!',
    keywords: [
        'travel agency',
        'tours',
        'vacation packages',
        'luxury travel',
        'customized tours',
        'holiday packages',
        'travel services',
        'adventure tours',
        'family vacations',
        'honeymoon packages'
    ],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Travel Agency - Your Journey Begins Here',
        description: 'Discover amazing travel experiences with our expert travel agency. We offer customized tours, luxury accommodations, and unforgettable adventures worldwide.',
        url: '/',
        siteName: 'Travel Agency',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Travel Agency - Your Journey Begins Here',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Travel Agency - Your Journey Begins Here',
        description: 'Discover amazing travel experiences with our expert travel agency.',
        images: ['/twitter-image.jpg'],
    },
};

export default function Home() {
    return (
        <main>
            <Hero />
            <Features />
            <VacationPromo />
            <OffersSlider />
            <Services />
            <section className="py-16 bg-[#262626] text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Customers Say</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Hear from travelers who have experienced unforgettable journeys with Wanderlust
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Newsletter</h2>
                        <p className="text-lg mb-10 text-white/90">
                            Subscribe to receive exclusive offers, travel tips, and inspiration for your next adventure.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 flex-grow"
                            />
                            <button className="px-8 py-3 rounded-lg bg-white text-orange-600 font-semibold hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
} 