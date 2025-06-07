"use client"
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHotel, faUsers, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import island from '../image/island.png';
import Image from 'next/image';
const services = [
    {
        title: "Customized Tours",
        description: "Tailored travel experiences designed just for you",
        icon: faPlane
    },
    {
        title: "Luxury Accommodations",
        description: "Stay in the finest hotels and resorts worldwide",
        icon: faHotel
    },
    {
        title: "Group Tours",
        description: "Join our exciting group adventures",
        icon: faUsers
    },
    {
        title: "Travel Insurance",
        description: "Comprehensive coverage for worry-free travel",
        icon: faShieldAlt
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const Services = () => {
    return (
        <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're dedicated to making your travel experience exceptional from start to finish
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🌟',
                title: 'Personalized Service',
                description: 'Tailored travel experiences designed to meet your unique preferences and needs.'
              },
              {
                icon: '💰',
                title: 'Best Price Guarantee',
                description: 'We promise competitive pricing and will match any better offer you find.'
              },
              {
                icon: '🛡️',
                title: 'Secure Booking',
                description: 'Book with confidence knowing your payments and personal data are protected.'
              },
              {
                icon: '🧳',
                title: 'Hassle-Free Travel',
                description: 'We handle all the details so you can focus on enjoying your journey.'
              },
              {
                icon: '📱',
                title: '24/7 Support',
                description: 'Our dedicated team is always available to assist you whenever you need help.'
              },
              {
                icon: '🏆',
                title: 'Award-Winning Agency',
                description: 'Recognized for excellence in customer satisfaction and service quality.'
              }
            ].map((feature, index) => (
              <div key={index} className="shadow-md rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default Services; 