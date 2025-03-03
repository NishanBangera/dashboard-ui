import { ArrowDown, ArrowUp } from "lucide-react";
import { Card } from "./ui/card";


const CardGrid = () => {
    return ( <div className="grid grid-cols-4 gap-5 m-5 mb-0">
        <Card className="flex flex-col gap-2 p-5 pr-0">
            <h2 className="text-slate-400">Total Income</h2>
            <div >
            <h2 className="text-2xl font-bold">$32,499.93</h2>
            <div className="flex items-center gap-3">
                <span className="flex text-sm p-1 bg-green-300 text-green-700 font-bold rounded-md"><ArrowUp size={16}/> 12.95%</span>
                <span className="text-sm text-slate-400">Compared to last month</span>
            </div>
            </div>
        </Card>
        <Card className="flex flex-col gap-2 p-5">
            <h2 className="text-slate-400" >Profit</h2>
            <div >
            <h2 className="text-2xl font-bold">$10,499.93</h2>
            <div className="flex items-center gap-3">
                <span className="flex text-sm p-1 bg-red-300 text-red-700 font-bold rounded-md"><ArrowDown size={16}/> 0.33%</span>
                <span className="text-sm text-slate-400">Compared to last month</span>
            </div>
            </div>
        </Card>
        <Card className="flex flex-col gap-2 p-5">
            <h2 className="text-slate-400" >Total Views</h2>
            <div >
            <h2 className="text-2xl font-bold">5.211.832</h2>
            <div className="flex items-center gap-3">
                <span className="flex text-sm p-1 bg-green-300 text-green-700 font-bold rounded-md"><ArrowUp size={16}/> 0.32%</span>
                <span className="text-sm text-slate-400">Compared to last month</span>
            </div>
            </div>
        </Card>
        <Card className="flex flex-col gap-2 p-5">
            <h2 className="text-slate-400" >Conversion Rate</h2>
            <div >
            <h2 className="text-2xl font-bold">4.83%</h2>
            <div className="flex items-center gap-3">
                <span className="flex text-sm p-1 bg-green-300 text-green-700 font-bold rounded-md"><ArrowUp size={16}/> 8.05%</span>
                <span className="text-sm text-slate-400">Compared to last month</span>
            </div>
            </div>
        </Card>
       
    </div> );
}
 
export default CardGrid;