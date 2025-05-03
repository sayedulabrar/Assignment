import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import OrderDetails from "../OrderDetails/OrderDetails2";
import { toast } from "react-toastify";

const Search = () => {
    const [searchData, setSearchData] = useState({
        form_no: "",
        phone_no: ""
    });
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = async () => {
        if (!searchData.form_no.trim() || !searchData.phone_no.trim()) {
            toast.error("Both form number and phone number are required");
            return;
        }

        setLoading(true);
        setOrderData(null);

        try {
            const response = await fetch("https://itder.com/api/search-purchase-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    form_no: searchData.form_no.trim(),
                    phone_no: searchData.phone_no.trim()
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Server responded with an error");
            }

            const data = await response.json();
            
            if (!data) {
                throw new Error("No data received from server");
            }

            setOrderData(data);
            toast.success("Order details retrieved successfully");
        } catch (error) {
            console.error("Search error:", error);
            toast.error(error.message || "Failed to search. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#6f42c1]">
                    Track Your Order
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Form Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="form_no"
                            value={searchData.form_no}
                            onChange={handleChange}
                            placeholder="Enter your form number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f42c1] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="phone_no"
                            value={searchData.phone_no}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f42c1] focus:border-transparent"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="flex items-center justify-center w-full bg-[#6f42c1] text-white py-3 px-4 rounded-md hover:bg-[#5a32a3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Searching...
                        </span>
                    ) : (
                        <>
                            <IoMdSearch className="mr-2 text-lg" />
                            Search Order
                        </>
                    )}
                </button>
            </div>

            {orderData && (
                <div className="w-full max-w-6xl mt-8">
                    <OrderDetails orderData={orderData} />
                </div>
            )}
        </div>
    );
};

export default Search;