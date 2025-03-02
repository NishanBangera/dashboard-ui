import DashboardGrid from "./DashboardGrid";
import Navbar from "./Navbar";
import Options from "./Options";

const Dashbaoard = () => {
    return ( <div className="bg-white h-screen w-full">
        <Navbar />
        <Options />
        <DashboardGrid />
    </div> );
}
 
export default Dashbaoard;