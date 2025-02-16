import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ELlogo from "../../assets/platformLogo/ELlogo.png";
import { useAuth } from "@/context/AuthContext";
import { Heart, HeartHandshake, Info } from "lucide-react";
import { useState } from "react";

export default function Navbar({ onLogout }) {
  const { user, roleName } = useAuth();
  const [isHeartHovered, setIsHeartHovered] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-20 w-full shrink-0 items-center px-6 md:px-8 justify-between bg-purple-300 bg-opacity-50 backdrop-blur-md shadow-lg">
      <Link to="/" className="mr-8 hidden lg:flex items-center">
        <img
          className="h-12 w-12 rounded-full"
          src={ELlogo}
          alt="Website Logo"
        />
        <span className="sr-only">Acme Inc</span>
        <span className="ml-3 text-xl font-semibold">
          Easy <b>Learning</b>
        </span>
      </Link>

      <div className="flex-grow flex justify-start items-center">
        <NavigationMenu className="lg:flex">
          <NavigationMenuList>
            {user && (
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-purple-200 bg-opacity-50 px-5 py-2.5 text-lg font-medium transition-colors hover:bg-purple-300 hover:text-gray-900 focus:bg-purple-300 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            )}
            {user && roleName === "student" && (
              <NavigationMenuLink asChild>
                <Link
                  to="/progress"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-purple-200 bg-opacity-50 px-5 py-2.5 text-lg font-medium transition-colors hover:bg-purple-300 hover:text-gray-900 focus:bg-purple-300 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  My Learning
                </Link>
              </NavigationMenuLink>
            )}
            {user && roleName === "trainer" && (
              <NavigationMenuLink asChild>
                <Link
                  to="/courses/add"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-purple-200 bg-opacity-50 px-5 py-2.5 text-lg font-medium transition-colors hover:bg-purple-300 hover:text-gray-900 focus:bg-purple-300 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Add Course
                </Link>
              </NavigationMenuLink>
            )}
            {!user && (
              <NavigationMenuLink asChild>
                <Link
                  to="/aboutus"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-purple-200 bg-opacity-50 px-5 py-2.5 text-lg font-medium transition-colors hover:bg-purple-300 hover:text-gray-900 focus:bg-purple-300 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  About Us <Info className="h-5 w-5 ml-2" />
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuList>
        </NavigationMenu>

      </div>

      <div className="ml-auto flex items-center">
        {user && roleName === "student" && (
          <>
            <Link
              to="/wishlist"
              className="mr-4"
              onMouseEnter={() => setIsHeartHovered(true)}
              onMouseLeave={() => setIsHeartHovered(false)}
            >
              {isHeartHovered ? (
                <HeartHandshake className="h-6 w-6 text-purple-600 rounded-md" />
              ) : (
                <Heart className="h-6 w-6 text-gray-700 rounded-md hover:text-purple-400" />
              )}
            </Link>
            <Link
              to="/cart"
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-purple-200 bg-opacity-50 px-5 py-2.5 text-lg font-medium transition-colors hover:bg-purple-300 hover:text-gray-900 focus:bg-purple-300 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 mr-4"
            >
              Cart 🛒
            </Link>
          </>
        )}

        {user ? (
          // User is logged in
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>JP</AvatarFallback>
                <span className="sr-only">Toggle user menu</span>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-36">
              <DropdownMenuItem className="text-md">
                <Link to="/account">My Account</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-md" onClick={onLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // User is not logged in
          <>
            <Link
              to="/login"
              className="group inline-flex h-10 w-max items-center justify-center rounded-md px-5 py-2.5 text-lg font-medium transition-colors hover:bg-purple-100 hover:text-black focus:bg-purple-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 mr-2 bg-white text-purple-500 border-none"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="group inline-flex h-10 w-max items-center justify-center rounded-md px-5 py-2.5 text-lg font-medium transition-colors hover:bg-purple-700 hover:text-white focus:bg-purple-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50 bg-purple-500 text-white border-none"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
