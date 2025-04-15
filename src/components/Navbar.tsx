"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Button} from "@/components/ui/button";
import {Home, Upload, Search, User, File} from "lucide-react"; // Changed from Asteroid to File

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/view", label: "View", icon: File }, // Changed from Alarm to File
  { href: "/search", label: "Search", icon: Search },
  { href: "/profile", label: "Profile", icon: User },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary border-b sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-xl text-primary">MediVault</Link>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className={pathname === item.href ? "text-primary" : ""}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

