import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useRegister } from "./useRegister";
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const { registerUser, isPending } = useRegister();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      formData.name &&
      formData.email &&
      formData.mobile &&
      formData.password
    ) {
      registerUser({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile ? +formData.mobile : 0,
        password: formData.password,
      });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
  <Card className="mx-auto w-full max-w-md shadow-none border-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email below to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Example Yogita Shete"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="enter your mobile number"
                required
                maxLength={10}
                minLength={10}
                pattern="[0-9]*"
                title="Please enter a valid mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600" disabled={isPending}>
              {isPending ? "Signing up..." : "Signup"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
