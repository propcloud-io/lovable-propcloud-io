import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Communication from "./pages/Communication";
import SalesAutomation from "./pages/SalesAutomation";
import Bookings from "./pages/Bookings";
import Operations from "./pages/Operations";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

const queryClient = new QueryClient();

// Create function component for App
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
              {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

              {/* Protected dashboard routes */}
              <Route path="/app" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/app/communication" element={<ProtectedRoute><Communication /></ProtectedRoute>} />
              <Route path="/dashboard/communication" element={<ProtectedRoute><Communication /></ProtectedRoute>} />
              <Route path="/app/sales-automation" element={<ProtectedRoute><SalesAutomation /></ProtectedRoute>} />
              <Route path="/dashboard/sales-automation" element={<ProtectedRoute><SalesAutomation /></ProtectedRoute>} />
              <Route path="/app/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
              <Route path="/dashboard/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
              <Route path="/app/operations" element={<ProtectedRoute><Operations /></ProtectedRoute>} />
              <Route path="/dashboard/operations" element={<ProtectedRoute><Operations /></ProtectedRoute>} />
              <Route path="/app/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/app/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

              {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
