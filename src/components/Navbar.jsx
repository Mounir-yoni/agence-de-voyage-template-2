"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, User, LogOut, Settings, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../utils/utils';
import { getLocalStorage } from '../utils/storage';
import { useRouter, usePathname } from 'next/navigation';

const NavItems = [
    { name: 'Home', href: '/' },
    { name: 'Offers', href: '/offers' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Get user data from localStorage
        const userData = getLocalStorage('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        const handleScroll = () => {
            if (pathname === "/") {
                setScrolled(window.scrollY > 15);
            } else {
                setScrolled(true);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/');
    };

    // Don't render navbar on admin page
    if (pathname === "/admin") {
        return null;
    }

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled
                    ? "bg-white shadow-md py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 z-50">
                    <Globe className="h-8 w-8 text-primary" />
                    <span className={cn(
                        "font-bold text-xl transition-colors duration-300",
                        scrolled ? "text-primary" : "text-white"
                    )}>
                        Wanderlust
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {NavItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "font-medium transition-colors hover:text-primary",
                                scrolled ? "text-gray-800" : "text-white"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className={cn(
                                    "flex items-center gap-2 font-bold text-xl transition-colors duration-300 px-4 py-2 rounded-lg",
                                    scrolled ? "text-orange-500" : "text-white",
                                    "bg-transparent hover:bg-orange-500/90 hover:text-white"
                                )}
                            >
                                <User className="h-5 w-5" />
                                {user.name}
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <User className="h-4 w-4" />
                                        Profile
                                    </Link>
                                    {user.role === 'manager' && (
                                        <Link
                                            href="/admin"
                                            className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <Shield className="h-4 w-4" />
                                            Admin Panel
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/auth"
                            className={cn(
                                "font-bold text-xl transition-colors duration-300 px-4 py-2 rounded-lg",
                                scrolled ? "text-orange-500" : "text-white",
                                "bg-transparent hover:bg-orange-500/90 hover:text-white"
                            )}
                        >
                            Connexion
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 text-primary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} className={scrolled ? "text-gray-800" : "text-white"} />}
                </button>

                {/* Mobile Navigation Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center space-y-8 md:hidden">
                        {NavItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-xl font-medium text-gray-800 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {user ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="text-xl font-medium text-gray-800 hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Profile
                                </Link>
                                {user.role === 'manager' && (
                                    <Link
                                        href="/admin"
                                        className="text-xl font-medium text-gray-800 hover:text-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="text-xl font-medium text-red-600 hover:text-red-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/auth">
                                <Button className="bg-primary hover:bg-primary/90 text-white mt-4">
                                    Connexion
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}