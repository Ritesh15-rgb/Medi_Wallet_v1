"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Button} from "@/components/ui/button";
import {Home, Upload, Search, User, File, Settings, Menu} from "lucide-react"; // Changed from Asteroid to File
import {useState} from "react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/view", label: "View", icon: File }, // Changed from Alarm to File
  { href: "/search", label: "Search", icon: Search },
  { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
];

const Navbar = () => {
  const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigation = () => {
        setIsOpen(false); // Close the sheet
    };

  return (
    <nav className="bg-secondary border-b sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-xl text-primary flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
            >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Medi Wallet
        </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                  <Button variant="outline">
                      <Menu className="mr-2 h-4 w-4" />
                      Menu
                  </Button>
              </SheetTrigger>
              <SheetContent className="w-64">
                  <div className="flex flex-col space-y-4">
                      {navItems.map((item) => (
                          <Link key={item.href} href={item.href} onClick={handleNavigation}>
                              <Button variant="ghost" className={pathname === item.href ? "text-primary" : ""}>
                                  <item.icon className="mr-2 h-4 w-4" />
                                  {item.label}
                              </Button>
                          </Link>
                      ))}
                  </div>
              </SheetContent>
          </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
