import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

import { ADMIN_EMAILS } from "../lib/admin";

export const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/sign-in" replace />;
    }

    const userEmail = user.primaryEmailAddress?.emailAddress;

    if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
                <p className="text-gray-600 mb-8">You do not have permission to view this page.</p>
                <a href="/" className="text-blue-600 hover:underline">Return to Home</a>
            </div>
        );
    }

    return <>{children}</>;
};
