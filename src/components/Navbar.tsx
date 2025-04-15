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
        <Link href="/" className="font-bold text-xl text-primary">MediVault</Link>
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
