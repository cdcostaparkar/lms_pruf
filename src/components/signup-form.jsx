// SignupForm.jsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { createUser } from "@/api/userApi";
import toast from "react-hot-toast";

export function SignupForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role_name: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      validatePassword(value);
    }

    if (name === "phone") {
      validatePhone(value);
    }
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role_name: value });
  };

  const validatePassword = (password) => {
    const newErrors = {};
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const validatePhone = (phone) => {
    const newErrors = {};
    if (phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    setErrors(newErrors);
    return newErrors;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username is required";
      toast.error(newErrors.username);
    }
    if (!formData.name) {
      newErrors.name = "Name is required";
      toast.error(newErrors.name);
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      toast.error(newErrors.email);
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      toast.error(newErrors.email);
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      toast.error(newErrors.phone);
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
      toast.error(newErrors.phone);
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
      toast.error(newErrors.address);
    }
    if (!formData.role_name) {
      newErrors.role_name = "Role is required";
      toast.error(newErrors.role_name);
    } else if (!["trainer", "student"].includes(formData.role_name)) {
      newErrors.role_name = 'Role must be either "trainer" or "student"';
      toast.error(newErrors.role_name);
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await createUser(formData);

        login(
          data.userId,
          data.role_name
        ); // Assuming the response contains userId and role_name
        navigate(`/`); // Redirect to homepage or another route after successful signup
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Create your account by filling in the details below
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="text-red-500">{errors.username}</div>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="text"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="text-red-500">{errors.phone}</div>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address}</div>
          )}
        </div>
        <div className="grid gap-2">
          {/* Changes to for */}
          <Label htmlFor="role_name">Role</Label>
          <Select onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="trainer">Trainer</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.role_name && (
            <div className="text-red-500">{errors.role_name}</div>
          )}
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
