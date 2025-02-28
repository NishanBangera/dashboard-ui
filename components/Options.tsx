import { LayoutGrid, ListFilter, Share2 } from "lucide-react";
import { Button } from "./ui/button";

const Options = () => {
    return ( <div className="flex justify-between items-center border-b-2 border-slate-100 px-5 py-3">
        <h2 className="text-sm font-semibold">Overview</h2>
        <div className="flex space-x-2">
            <Button variant="outline" className="py-0 has-[>svg]:px-1 h-6 gap-1 border-t-2 border-gray-300">
                <LayoutGrid size={14} className="text-slate-500" />
                <span className="text-[10px] text-slate-500">Customize Widget</span>
            </Button>
            <Button variant="outline" className="py-0 has-[>svg]:px-1 h-6 gap-1 border-t-2 border-gray-300">
                <ListFilter size={14} className="text-slate-500" />
                <span className="text-[10px] text-slate-500">Filter</span>
            </Button>
            <Button variant="outline" className="py-0 has-[>svg]:px-1 h-6 gap-1 border-t-2 border-gray-300">
                <Share2 size={14} className="text-slate-500" />
                <span className="text-[10px] text-slate-500">Share</span>
            </Button>
        </div>
    </div> );
}
 
export default Options;