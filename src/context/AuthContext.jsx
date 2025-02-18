import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import toast from "react-hot-toast";
// Create the Auth Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("userId"));
  const [roleName, setRoleName] = useState(() =>
    localStorage.getItem("roleName")
  );

  const login = (userId, role) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("roleName", role);
    setUser(userId);
    setRoleName(role);
  };

  const logout = useCallback(() => {
    toast(
      (t) => (
        <div className="flex flex-col items-center">
          <span>Are you sure?</span>
          {/* <span>They don't 💞 you like I 💞 you</span> */}
          <div className="flex w-full justify-center mt-2">
            <button
              onClick={() => {
                localStorage.removeItem("userId");
                localStorage.removeItem("roleName");
                localStorage.removeItem("cart");
                localStorage.removeItem("selectedColor");
                setUser(null);
                setRoleName(null);
                toast.dismiss(t.id); // Close the toast
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Logout
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Stay
            </button>
          </div>
        </div>
      ),
      {
        icon: "🥺",
        autoClose: false, // Prevent auto-closing
        closeOnClick: false, // Prevent closing on click outside
        draggable: false, // Disable dragging
        closeButton: false, // Remove the default close button
      }
    );
  }, []);

  // Optional: Sync state with local storage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedRoleName = localStorage.getItem("roleName");
    if (storedUserId) {
      setUser(storedUserId);
    }
    if (storedRoleName) {
      setRoleName(storedRoleName);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, roleName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);
