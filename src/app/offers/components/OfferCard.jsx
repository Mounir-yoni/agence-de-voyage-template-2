"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../../../components/ui/button";

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function OfferCard({ offer }) {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
        >
            <div className="relative h-48">
                {!imageError ? (
                    <Image
                        src={offer.image}
                        alt={offer.title}
                        fill="true"
                        className="object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-12 h-12 text-amber-700" />
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Save {offer.discount}%
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-bold text-orange-500 ml-2">{offer.discountedPrice}250000DA</span>
                    </div>
                    <Button asChild className="bg-orange-500 hover:bg-primary/90 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300">
                        <Link href={`/offers/${offer._id}`}>Book Now</Link>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
} 