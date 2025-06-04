import Image from 'next/image';
import { Star } from 'lucide-react';
import PropTypes from 'prop-types';


export default function TestimonialCard({ testimonial }) {
    return (
        <div className="bg-[#2e2e2e] rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
            </div>

            <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                    />
                ))}
            </div>

            <p className="text-gray-300 italic mb-3">"{testimonial.content}"</p>

            <p className="text-gray-400 text-sm">
                Visited: {testimonial.destination}
            </p>
        </div>
    );
}

TestimonialCard.propTypes = {
    testimonial: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired
    }).isRequired
};