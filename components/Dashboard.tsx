import CardGrid from "./CardGrid";
import DashboardGrid from "./DashboardGrid";
import Navbar from "./Navbar";
import Options from "./Options";


const Dashbaoard = () => {
 
  return (
    <div className="flex flex-col bg-white min-h-screen max-h-full w-full">
      <Navbar />
      <Options />
      <div className="flex flex-col gap-5 grow">
        <CardGrid />
        <DashboardGrid />
      </div>
    </div>
  );
};

export default Dashbaoard;
