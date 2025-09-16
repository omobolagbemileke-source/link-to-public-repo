import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminReview from "./pages/AdminReview";
import ComplianceForm from "./pages/ComplianceForm";
import SubmissionSuccess from "./pages/SubmissionSuccess";
import CertificateViewer from "./pages/CertificateViewer";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Vendor Routes */}
          <Route path="/vendor/dashboard" element={
            <ProtectedRoute requiredRole="vendor">
              <VendorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/vendor/form" element={
            <ProtectedRoute requiredRole="vendor">
              <ComplianceForm />
            </ProtectedRoute>
          } />
          <Route path="/vendor/submission-success" element={
            <ProtectedRoute requiredRole="vendor">
              <SubmissionSuccess />
            </ProtectedRoute>
          } />
          
          {/* Protected Superadmin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requiredRole="superadmin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/review/:id" element={
            <ProtectedRoute requiredRole="superadmin">
              <AdminReview />
            </ProtectedRoute>
          } />
          
          {/* Public Routes */}
          <Route path="/certificate/:id" element={<CertificateViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;