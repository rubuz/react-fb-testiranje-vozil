import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

const Dashboard = () => {
  const { currentUser, signOut } = useContext(AuthContext);

  return (
    <div>
      <h3>TEST</h3>
      <p>Sign in status: {currentUser && "active"}</p>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
};

export default Dashboard;
