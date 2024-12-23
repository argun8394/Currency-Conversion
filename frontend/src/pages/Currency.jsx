import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

const Currency = () => {
    const [formData, setFormData] = useState({
        fromCurrency: '',
        toCurrency: '',
        amount: '',
    });
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.post(
                `${API}/exchanges`,
                {
                    fromCurrency: formData.fromCurrency,
                    toCurrency: formData.toCurrency,
                    amount: parseFloat(formData.amount),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setConvertedAmount(response.data.data.convertedAmount);
            setSuccess('Currency conversion successful!');
            setError('');
            navigate('/currencyHistory');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
            setSuccess('');
        }
    };

    return (
        <div className="w-full flex justify-center items-center pageH">
            <div className="flex flex-col items-center gap-10 border py-8 px-12 w-max rounded-md">
                <h2 className="font-semibold text-[32px]">Currency Converter</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-between gap-6">
                        <div className="flex justify-between gap-4">
                            <label>From Currency:</label>
                            <input
                                type="text"
                                name="fromCurrency"
                                value={formData.fromCurrency}
                                onChange={handleChange}
                                required
                                className="border rounded-md"
                            />
                        </div>

                        <div className="flex justify-between gap-4">
                            <label>To Currency:</label>
                            <input
                                type="text"
                                name="toCurrency"
                                value={formData.toCurrency}
                                onChange={handleChange}
                                required
                                className="border rounded-md"
                            />
                        </div>

                        <div className="flex justify-between gap-4">
                            <label>Amount:</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                className="border rounded-md"
                            />
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {success && <p className="text-green-500 mt-4">{success}</p>}
                {convertedAmount !== null && (
                    <div className="mt-4">
                        <p className="text-lg font-semibold">Converted Amount: {convertedAmount}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Currency;
