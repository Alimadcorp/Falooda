"use client"

export default function AuthPage() {
    const policy = () => alert("_This is a secret between the two of us. Neither of them exists_");
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Authentication required</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Sign in below before being able to access the dashboard
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                    <div>
                        <a
                            href="/api/auth/login"
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Sign in with Hack Club
                        </a>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            By signing in, you agree to our <button onClick={policy} className="text-blue-600 hover:text-blue-500 hover:underline transition-colors focus:outline-none">terms & conditions</button> and <button onClick={policy} className="text-blue-600 hover:text-blue-500 hover:underline transition-colors focus:outline-none">privacy policy</button>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
