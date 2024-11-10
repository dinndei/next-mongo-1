'use client';
import { loginUser } from '@/app/services/userActions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const page = () => {
    // הגדרת סטייט לשם משתמש, אימייל, סיסמה
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loginCounter, setLoginCounter] = useState(0);


    // פונקציה שיתבצע בעת שליחת הטופס
    const navigateToLogedUser = () => {
        router.push('/pages/logedUser');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await loginUser(username);
            if (loginCounter < 5) {
                if (response)
                    if (response.password == password)
                        navigateToLogedUser();
                    else {
                        alert("ההזדהות נכשלה נסה שוב");
                        setLoginCounter(prev => prev + 1);
                    }
                else {
                    alert("ההזדהות נכשלה, אתה מועבר להרשמה");
                    router.push('/pages/signup')
                }

            }
            else
            alert("ניסית מדי הרבה פעמים. צר לי אך אין אפשרות להיכנס כרגע")



        } catch (error) {
            console.error("Error during fetch request:", error);
        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
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
                        Login
                    </button>
                </form>
                <p className="mt-5 text-center text-sm text-gray-600">
                    Don't have an account? <a href="/pages/signup" className="text-indigo-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default page;

