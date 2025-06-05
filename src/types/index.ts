export interface Destination {
    id: number;
    name: string;
    location: string;
    description: string;
    image: string;
    price: number;
    featured: boolean;
}

export interface SpecialOffer {
    id: number;
    title: string;
    description: string;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    discount: number;
    categories: string[];
}

export interface Testimonial {
    id: number;
    name: string;
    avatar: string;
    location: string;
    rating: number;
    content: string;
    destination: string;
} 