import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchUserDetails } from "@/api/userApi";

const availableColors = [
    "rgba(240, 213, 251, 0.655)", // Original color
    "rgba(219, 234, 254, 0.7)", // Light blue
    "rgba(255, 235, 205, 0.7)", // Light orange
    "rgba(220, 252, 231, 0.7)", // Light green
];

function AccountDetails() {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedColor, setSelectedColor] = useState(() => {
        // Get the color from local storage if it exists, otherwise use the default
        const storedColor = localStorage.getItem("selectedColor");
        return storedColor ? storedColor : availableColors[0];
    });

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const data = await fetchUserDetails(user);
                setUserDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getUserDetails();
    }, [user]);

    useEffect(() => {
        // Store the selected color in local storage whenever it changes
        localStorage.setItem("selectedColor", selectedColor);
    }, [selectedColor]);

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 p-4">Error: {error}</div>;
    }

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    return (
        <div
            className="min-h-screen py-6 flex items-center justify-center bg-gradient-to-br from-pink-200"
            style={{ backgroundColor: selectedColor }}
        >
            <div className="container max-w-md bg-white shadow-md rounded-lg overflow-hidden">
                {/* Color selection buttons */}
                <div className="flex justify-around p-2">
                    {availableColors.map((color) => (
                        <button
                            key={color}
                            onClick={() => handleColorChange(color)}
                            className={`w-6 h-6 rounded-full focus:outline-none`}
                            style={{
                                backgroundColor: color,
                                border:
                                    selectedColor === color ? "2px solid black" : "none", // Highlight selected color
                            }}
                            aria-label={`Change to ${color}`}
                        />
                    ))}
                </div>

                <div
                    className="bg-cover h-32"
                    style={{
                        backgroundColor: selectedColor,
                    }}
                ></div>
                <div className="p-6">
                    <div className="relative">
                        <img
                            src="https://picsum.photos/200?random"
                            alt={userDetails?.name || "User Profile"}
                            className="rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -top-16 w-32 h-32 object-cover"
                        />
                    </div>
                    <div className="mt-16 text-center">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {userDetails?.name || "Name Unavailable"}
                        </h1>
                        <p className="text-gray-600">
                            @{userDetails?.username || "Username Unavailable"}
                        </p>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-700 font-medium">Email:</span>
                            <span className="text-gray-500">
                                {userDetails?.email || "Email Unavailable"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-700 font-medium">Address:</span>
                            <span className="text-gray-500">
                                {userDetails?.address || "Address Unavailable"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-gray-700 font-medium">Role:</span>
                            <span className="text-gray-500">
                                {userDetails?.role_name?.toUpperCase() || "Role Unavailable"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;
