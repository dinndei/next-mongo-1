'use client';
import { signUpUser } from '@/app/services/userActions';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
    // הגדרת סטייט לשם משתמש, אימייל, סיסמה
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // פונקציה שיתבצע בעת שליחת הטופס
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        console.log("User Data to send:", username);


        try {
            const response = await signUpUser(username, email, password);
            if (response)
                navigateToLogedUser();
            else
                alert("הכניסה נכשלה, נסה שנית");



        } catch (error) {
            console.error("Error during fetch request:", error);
        }
    };

    const navigateToLogedUser = () => {
        router.push('/pages/logedUser');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md font-medium hover:bg-blue-600 transition duration-300"
                    >
                        SignUp
                    </button>
                </form>

            </div>
        </div>
    );
};

export default page;

