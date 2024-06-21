import { ChangeEvent, FormEvent, useState } from "react";
import { signInUser } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const defaultFormValues = {
  email: "",
  password: "",
};

interface FormValues {
  email: string;
  password: string;
}

const Home = () => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const { email, password } = formFields;
  const navigate = useNavigate();
  const { toast } = useToast();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const resetFormField = () => {
    return setFormFields(defaultFormValues);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    const { email, password } = data;
    console.log("data", data);
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

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   try {
  //     const userCredential = await signInUser(email, password);

  //     if (userCredential) {
  //       resetFormField();
  //       navigate("/dashboard");
  //     }
  //   } catch (error: any) {
  //     console.log("User Sign In Failed", error.message);
  //     toast({
  //       variant: "destructive",
  //       title: "Error while signing in",
  //       description: error.message,
  //     });
  //   }
  // };

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormFields({ ...formFields, [name]: value });
  // };

  return (
    <div className="flex justify-center items-center h-[100dvh] w-full">
      <div className="w-[25rem] p-6 bg-white rounded-xl shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <Input type="email" {...register("email")} placeholder="Email" />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <Input
            type="password"
            {...register("password")}
            placeholder="Password"
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
