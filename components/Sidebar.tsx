import {
  Book,
  Box,
  ChartNoAxesCombined,
  Info,
  LayoutGrid,
  Menu,
  MessageSquareText,
  NotebookText,
  Rocket,
  SquareMousePointer,
  TabletSmartphone,
} from "lucide-react";
import Image from "next/image";
import { Switch } from "./ui/switch";

const Sidebar = () => {
  return (
    <div className="sticky flex flex-col gap-5 w-56 p-6 shadow-lg bg-white">
      <div className="flex justify-between items-center">
        <div className="flex space-x-3 items-end">
          <Image src="/assets/logo.png" alt="Logo" height={24} width={24} />
          <h2 className="text-sm text-green-900 font-bold">Consist</h2>
        </div>
        <Menu size={16} className="text-slate-500" />
      </div>
      <div className="flex flex-col px-2 gap-5">
        <p className="text-xs text-slate-500">MAIN MENU</p>
        <div className="flex space-x-3 items-center">
          <LayoutGrid size={14} className="text-slate-500" />
          <p className="text-xs text-slate-500">Overview</p>
        </div>
        <div className="flex space-x-3 items-center">
          <ChartNoAxesCombined size={14} className="text-slate-500" />
          <p className="text-xs text-slate-500">Performance</p>
        </div>
        <div className="flex space-x-3 items-center">
          <NotebookText size={14} className="text-slate-500" />
          <p className="text-xs text-slate-500">Campaigns</p>
        </div>
        <div className="flex space-x-3 items-center">
          <Book size={14} className="text-slate-500" />
          <p className="text-xs text-slate-500">Orders</p>
        </div>
        <div className="flex space-x-3 items-center">
          <Box size={14} className="text-slate-500" />
          <p className="text-xs text-slate-500">Products</p>
        </div>
        <div className="flex space-x-3 items-center">
          <MessageSquareText size={14} className="text-slate-500" />
          <p className="text-xs text-slate-500">Message</p>
        </div>
        <div className="flex space-x-3 items-center">
          <TabletSmartphone size={14} className="text-slate-500" />
          <p className="text-xs text-slate-500">Sales Platform</p>
        </div>
      </div>
      <hr />
      <div className="px-2 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <SquareMousePointer size={14} className="text-slate-500" />
            <p className="flex items-center space-x-3 text-xs text-slate-500">
              Demo Mode
            </p>
          </div>
          <Switch className="h-3 w-7 data-[state=checked]:bg-green-700" />
        </div>
        <div className="flex space-x-3">
          <Rocket size={14} className="text-slate-500"/>
          <p className="text-xs text-slate-500">Feedback</p>
        </div>
        <div className="flex space-x-3">
          <Info size={14} className="text-slate-500"/>
          <p className="text-xs text-slate-500">Help and docs</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
