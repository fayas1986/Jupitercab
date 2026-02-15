
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminDashboard } from "./components/AdminDashboard";
import SignInPage from "./pages/auth/SignIn";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { RequireAdmin } from "./components/RequireAdmin";
import { isAdminUser } from "./lib/admin";
import { api } from "./lib/api";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SpeedInsights } from "@vercel/speed-insights/react";

const queryClient = new QueryClient();

import { AppProvider } from "./contexts/AppContext";

const UserSync = () => {
  const { user, isSignedIn } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const syncUserToBackend = async () => {
      if (isSignedIn && user) {
        try {
          const email = user.primaryEmailAddress?.emailAddress;
          const name = user.fullName || user.username || 'User';
          const phone = user.primaryPhoneNumber?.phoneNumber;
          
          if (email) {
            const role = isAdminUser(email) ? 'admin' : 'user';
            console.log(`Syncing user: ${email} as ${role}`);
            
            await api.syncUser({
              name,
              email,
              phone,
              role
            });
            console.log('User synced to backend');
            toast({
              title: "Profile Synced",
              description: "Your user profile has been synced with the database.",
            });
          }
        } catch (error) {
          console.error('Failed to sync user:', error);
          toast({
            variant: "destructive",
            title: "Sync Failed",
            description: "Could not sync your profile with the database.",
          });
        }
      }
    };

    syncUserToBackend();
  }, [isSignedIn, user, toast]);

  return null;
};

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppProvider>
          <UserSync />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SpeedInsights />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
