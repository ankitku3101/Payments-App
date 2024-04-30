import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
    
    const [userInfo, setUserInfo] = useState(null); // State to store user information
    const [balance, setBalance] = useState(null); // State to store balance
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/firstname', {
                    headers: {
                        'Authorization': 'Bearer ' + token // Add a space after 'Bearer'
                    }
                });
                setUserInfo(response.data); // Set user information from response data
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchBalance = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        'Authorization': 'Bearer ' + token // Add a space after 'Bearer'
                    }
                });
                setBalance(response.data.balance); // Set balance from response data
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserInfo(); // Call the function to fetch user information
        fetchBalance(); // Call the function to fetch balance
    }, [token]); // Execute only when token changes

    return (
        <div>
            {userInfo && <Appbar value={userInfo.firstName} />}
            <div className="m-8">
                {userInfo !== null ? (
                    <p>Welcome, {userInfo.firstName}!</p>
                ) : (
                    <p>Loading...</p> // Display loading message until user information is fetched
                )}
                {balance !== null ? (
                    <Balance value={balance} />
                ) : (
                    <p>Loading...</p> // Display loading message until balance is fetched
                )}
                <Users />
            </div>
        </div>
    );
};
