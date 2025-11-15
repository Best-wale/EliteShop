import { useEffect } from "react";

export function UserLogin(){
    useEffect(() => {
        document.title = "Login - OJA";
        fetch("https://api.example.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: "",
                password: "",

    })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Login successful");
            } else {
                console.error("Login failed", data.message);
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
        });
    }, []);
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter your email" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200">Login</button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
}

