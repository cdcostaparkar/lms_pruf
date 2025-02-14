import { useEffect, useState } from "react";
import "./AccountDetails.css";
import { useAuth } from "@/context/AuthContext";
import { fetchUserDetails } from "@/api/userApi";

function AccountDetails() {
  const { user } =  useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="account-details-page-container">
      <h1 className="account-details-page-heading"> Account Details </h1>
      <div className='account-details-container'>
        <div className="account-details-card">
          <img
            // src={userDetails.profileImage}
            src="https://picsum.photos/200?random"
            alt={userDetails.name}
            className="account-details-img"
          />
          <div className="account-details-info">
            <p><strong>Name: </strong> {userDetails.name}</p>
            <p><strong>Username: </strong> {userDetails.username}</p>
            <p><strong>Email: </strong> {userDetails.email}</p>
            <p><strong>Address: </strong> {userDetails.address}</p>
            <p><strong>Role: </strong> {userDetails.role_name}</p>
          </div>
        </div>
      </div>
      </div>
  );
}
export default AccountDetails
