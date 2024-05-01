import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
    
    const [userInfo, setUserInfo] = useState(null); 
    const [balance, setBalance] = useState(null); 
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/firstname', {
                    headers: {
                        'Authorization': 'Bearer ' + token 
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
                        'Authorization': 'Bearer ' + token 
                    }
                });
                setBalance(response.data.balance); // Set balance from response data
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserInfo(); 
        fetchBalance(); 
    }, [token]); // Execute only when token changes

    // console.log(userInfo && userInfo.firstName)
    return (
        <div>
            <Appbar value={userInfo ? userInfo.firstName : "Loading..."} />
            <div className="m-8">
                {userInfo !== null ? (
                    <p>Welcome, {userInfo.firstName} !</p>
                ) : (
                    <p>Loading...</p> 
                )}
                {balance !== null ? (
                    <Balance value={balance.toFixed(2)} />
                ) : (
                    <p>Loading...</p> 
                )}
                <Users />
            </div>
        </div>
    );
};
