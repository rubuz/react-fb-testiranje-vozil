import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";
import { Button } from "./ui/button";
import Logo from "../assets/adria_full_logo.jpg";

const NavbarAdmin = () => {
  const { currentUser, signOut } = useContext(AuthContext);

  return (
    <div className="w-[100dvw] p-4 flex justify-between items-center min-h-10 bg-white shadow-sm sticky top-0 z-50">
      <div className="w-52">
        <img src={Logo} alt="Adria Logo" />
      </div>
      <div>
        <h1>Admin dashboard</h1>
      </div>
      <div className="flex gap-8 items-center">
        <p className="font-semibold">{currentUser?.email}</p>
        <Button onClick={signOut}>SignOut</Button>
      </div>
    </div>
  );
};

export default NavbarAdmin;
