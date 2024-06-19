import { ChangeEvent, FormEvent, useState } from "react";
import { signInUser } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const defaultFormValues = {
  email: "",
  password: "",
};

const Home = () => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const { email, password } = formFields;
  const navigate = useNavigate();
  const { toast } = useToast();

  const resetFormField = () => {
    return setFormFields(defaultFormValues);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredential = await signInUser(email, password);

      if (userCredential) {
        resetFormField();
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.log("User Sign In Failed", error.message);
      toast({
        variant: "destructive",
        title: "Error while signing in",
        description: error.message,
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="flex justify-center items-center h-[100dvh] w-full">
      <div className="w-[25rem] p-6 bg-white rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
