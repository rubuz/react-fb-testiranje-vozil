import { ChangeEvent, FormEvent, useState } from "react";
import { signInUser } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";

const defaultFormValues = {
  email: "",
  password: "",
};

const Home = () => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const { email, password } = formFields;
  const navigate = useNavigate();

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
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return <div>Hhome</div>;
};

export default Home;
