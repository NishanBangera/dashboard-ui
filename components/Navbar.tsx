"use client";
import { Download, Rocket, SearchIcon, Settings } from "lucide-react";
import { Input } from "./ui/input";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="flex justify-between items-center border-b-2 border-slate-100 px-5 py-1">
      <div className="flex justify-between items-center">
        <SearchIcon size={14} className="text-slate-500" />
        <Input
          name="q"
          type="text"
          placeholder="Search anything here..."
          className="border-transparent shadow-none placeholder:text-xs placeholder:text-slate-400"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Download size={14} className="text-slate-500" />
        <Rocket size={14} className="text-slate-500" />
        <Settings size={14} className="text-slate-500" />
        <div>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      </div>
      
    </div>
  );
};

export default Navbar;
