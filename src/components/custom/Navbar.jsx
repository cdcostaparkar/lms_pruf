import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

export default function Navbar({ onLogout }) {
  const { roleName } = useAuth();

  return (
    <header className="sticky top-0 z-50 flex h-20 w-full shrink-0 items-center px-6 md:px-8 justify-between bg-purple-300 bg-opacity-50 backdrop-blur-md shadow-lg">
      {/* Increased header height and padding */}
      <Link to="/" className="mr-8 hidden lg:flex items-center">
        {/* Added items-center for vertical alignment */}
        <MountainIcon className="h-8 w-8" />
        {/* Increased icon size */}
        <span className="sr-only">Acme Inc</span>
        <span className="ml-3 text-xl font-semibold">Easy Learning</span>
        {/* Increased font size and margin */}
      </Link>
      <div className="flex-grow flex justify-start">
        {/* Changed from justify-center to justify-start (middle to left) */}
        <NavigationMenu className="lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                to="/"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-purple-200 bg-opacity-50 px-5 py-2.5 text-lg font-medium transition-colors hover:bg-purple-300 hover:text-gray-900 focus:bg-purple-300 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                {/* Increased height, padding, and font size */}
                Home
              </Link>
            </NavigationMenuLink>

            {roleName === "student" && (
              <NavigationMenuLink asChild>
                <Link
                  to="/progress"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-purple-200 bg-opacity-50 px-5 py-2.5 text-lg font-medium transition-colors hover:bg-purple-300 hover:text-gray-900 focus:bg-purple-300 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  {/* Increased height, padding, and font size */}
                  My Learning
                </Link>
              </NavigationMenuLink>
            )}

            {roleName === "student" && (
              <NavigationMenuLink asChild>
                <Link
                  to="/cart"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-purple-200 bg-opacity-50 px-5 py-2.5 text-lg font-medium transition-colors hover:bg-purple-300 hover:text-gray-900 focus:bg-purple-300 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  {/* Increased height, padding, and font size */}
                  Cart
                </Link>
              </NavigationMenuLink>
            )}

            {roleName === "trainer" && (
              <NavigationMenuLink asChild>
                <Link
                  to="/courses/add"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-purple-200 bg-opacity-50 px-5 py-2.5 text-lg font-medium transition-colors hover:bg-purple-300 hover:text-gray-900 focus:bg-purple-300 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  {/* Increased height, padding, and font size */}
                  Add Course
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10">
              {/* Increased avatar size */}
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>JP</AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-36">
            {/* Increased width of dropdown menu */}
            <DropdownMenuItem className="text-md">
              {/* Increased font size */}
              <Link to="/account">My Account</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-md" onClick={onLogout}>
              {/* Increased font size */}
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
