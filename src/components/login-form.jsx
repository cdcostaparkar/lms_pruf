import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authenticateUser } from "@/api/userApi";

import toast from "react-hot-toast";

export function LoginForm({ className, ...props }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();

  const validateForm = async (e) => {
    e.preventDefault();

    if (username.length < 3) {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }

    if (password.length < 6) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    try {
      const data = await authenticateUser(username, password);

      login(data.userId, data.role_name);
    } catch (error) {
      toast.error(error.message);
      setLoginError(error.message);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={validateForm}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="example777"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && (
            <div className="text-red-500 text-sm">
              Please fill up your Username
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <div className="text-red-500 text-sm">
              Please fill up your Password
            </div>
          )}
        </div>
        {loginError && (
          <div className="text-red-500 text-sm">{loginError}</div>
        )}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
