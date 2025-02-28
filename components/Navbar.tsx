import { Download, Rocket, SearchIcon, Settings } from "lucide-react";
import { Input } from "./ui/input";

const Navbar = () => {
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
      <div className="flex space-x-2">
        <Download size={14} className="text-slate-500" />
        <Rocket size={14} className="text-slate-500" />
        <Settings size={14} className="text-slate-500" />
      </div>
    </div>
  );
};

export default Navbar;
