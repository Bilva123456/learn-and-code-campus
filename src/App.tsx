
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

// Pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CodePractice from "./pages/CodePractice";
import FacultyPanel from "./pages/FacultyPanel";
import SignInPage from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Achievements from "./pages/Achievements";

// Faculty Pages
import ContentLibrary from "./pages/faculty/ContentLibrary";
import CourseManagement from "./pages/faculty/CourseManagement";
import CodingAssignments from "./pages/faculty/CodingAssignments";
import StudentAnalytics from "./pages/faculty/StudentAnalytics";
import AttendanceManagement from "./pages/faculty/AttendanceManagement";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import PlacementPanel from "./pages/admin/PlacementPanel";
import Reports from "./pages/admin/Reports";

// Layout
import DashboardLayout from "./components/layouts/DashboardLayout";

// Create placeholders for routes that don't have detailed pages yet
const AdminSettings = () => (
  <div className="container p-6">
    <h1 className="text-2xl font-bold mb-6">System Settings</h1>
    <p>System configuration coming soon.</p>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            
            {/* Protected routes with dashboard layout */}
            <Route element={<DashboardLayout />}>
              {/* Student routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/practice" element={<CodePractice />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Faculty routes */}
              <Route path="/faculty" element={<FacultyPanel />} />
              <Route path="/faculty/courses" element={<CourseManagement />} />
              <Route path="/faculty/assignments" element={<CodingAssignments />} />
              <Route path="/faculty/analytics" element={<StudentAnalytics />} />
              <Route path="/faculty/attendance" element={<AttendanceManagement />} />
              <Route path="/faculty/content" element={<ContentLibrary />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/placement" element={<PlacementPanel />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
