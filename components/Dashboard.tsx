import CardGrid from "./CardGrid";
import DashboardGrid from "./DashboardGrid";
import Navbar from "./Navbar";
import Options from "./Options";


const Dashbaoard = () => {
 
  return (
    <div className="bg-white min-h-screen max-h-full w-full">
      <Navbar />
      <Options />
      <div className="grid gap-5">
        <CardGrid />
        <DashboardGrid />
      </div>
    </div>
  );
};

export default Dashbaoard;
