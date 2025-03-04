import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import { auth } from "@clerk/nextjs/server";

const Home = async() => {
  const {userId} = await auth()
  if(!userId){
    return <div>Sign in to view this page</div>
  }
  return ( <main className="flex">
    <Sidebar />
    <Dashboard />
  </main> );
}
 
export default Home;