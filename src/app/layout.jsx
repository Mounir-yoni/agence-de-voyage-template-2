import { Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import { NotificationProvider } from "../context/NotificationContext";
import Footer from '../components/Footer';
import Script from 'next/script';

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

export const metadata = {
    metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
    title: {
        default: 'Travel Agency - Your Trusted Travel Partner',
        template: '%s | Travel Agency'
    },
    description: 'Discover amazing travel experiences with our trusted travel agency. We offer personalized travel packages, expert guidance, and unforgettable adventures worldwide.',
    keywords: ['travel agency', 'vacation packages', 'travel tours', 'holiday packages', 'travel services', 'international travel', 'domestic travel', 'luxury travel', 'budget travel', 'group tours'],
    authors: [{ name: 'Your Agency Name' }],
    creator: 'Your Agency Name',
    publisher: 'Your Agency Name',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: 'https://your-domain.com',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://your-domain.com',
        siteName: 'Travel Agency',
        title: 'Travel Agency - Your Trusted Travel Partner',
        description: 'Discover amazing travel experiences with our trusted travel agency. We offer personalized travel packages, expert guidance, and unforgettable adventures worldwide.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Travel Agency',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Travel Agency - Your Trusted Travel Partner',
        description: 'Discover amazing travel experiences with our trusted travel agency.',
        images: ['/twitter-image.jpg'],
        creator: '@yourtwitterhandle',
        site: '@yourtwitterhandle',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-site-verification',
        yandex: 'your-yandex-verification',
        bing: 'your-bing-verification',
    },
    category: 'travel',
    classification: 'travel agency',
};

export default function RootLayout({ children }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Travel Agency',
        description: 'Your Trusted Travel Partner',
        url: 'https://your-domain.com',
        logo: 'https://your-domain.com/logo.png',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Your Street Address',
            addressLocality: 'Your City',
            addressRegion: 'Your Region',
            postalCode: 'Your Postal Code',
            addressCountry: 'Your Country'
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-234-567-8900',
            contactType: 'customer service',
            email: 'contact@your-domain.com',
            availableLanguage: ['English', 'Spanish']
        },
        sameAs: [
            'https://www.facebook.com/yourpage',
            'https://twitter.com/yourhandle',
            'https://www.instagram.com/yourprofile'
        ]
    };

    return (
        <html lang="en">
            <head>
                <link rel="canonical" href="https://your-domain.com" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#ffffff" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <Script
                    id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${montserrat.className}`}>
                <Navbar />
                <NotificationProvider>
                    {children}
                </NotificationProvider>
                <Footer />
            </body>
        </html>
    );
}
