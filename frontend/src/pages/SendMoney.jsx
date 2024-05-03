import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning"

export const SendMoney = () => {
   const [searchParams] = useSearchParams();
   const id = searchParams.get("id")
   const name = searchParams.get("name")
   const [amount, setAmount] = useState(0);
 
    
  return <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
          <div
              className="border h-min text-card-foreground max-w-md p-4 space-y-2 w-96 bg-white shadow-lg rounded-lg"
          >
              <div className="flex flex-col space-y-1.5 p-2">
                <div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg> */}
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
              </div>
              <div className="p-6">
              <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                  </div>
                  <h3 className="text-2xl font-semibold">{name}</h3>
              </div>
              <div className="space-y-4">
                  <div className="space-y-2">
                  <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="amount"
                  >
                      Amount (in Rupees)
                  </label>
                  <input
                      onChange={(e) => {
                          setAmount(e.target.value);
                        }}  
                      type="number"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      id="amount"
                      placeholder="Enter amount"
                  />
                  </div>
                  <button onClick={() => {
                      axios.post("http://localhost:3000/api/v1/account/transfer", {
                          to: id,
                          amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        }).then(response => {
                            console.log(response.status); 
                            if (response.status === 200) {
                                window.alert("Payment Successful !");
                            }
                        }).catch(error => { 
                            if (error.response && error.response.status === 400) {
                              window.alert("Payment Unsuccessful !");
                            } else {
                              window.alert("An error occurred. Please try again.");
                            }
                          })
                    }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                      Initiate Transfer
                  </button>
                </div>
              </div>
            <BottomWarning label={"Go Back to your"} buttonText={"Dashboard"} to={"/dashboard"} />
      </div>
    </div>
  </div>
}