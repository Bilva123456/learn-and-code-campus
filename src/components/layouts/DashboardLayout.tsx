
import { Outlet } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Code, 
  Trophy,
  Settings,
  LogOut,
  Award,
  Users,
  FileText,
  BarChart3,
  Calendar,
  Upload,
  User,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Menu items for different user roles
const studentItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview of your courses and progress"
  },
  {
    title: "My Courses",
    url: "/courses",
    icon: BookOpen,
    description: "Access academic courses and materials"
  },
  {
    title: "Code Practice",
    url: "/practice",
    icon: Code,
    description: "Practice coding in multiple languages"
  },
  {
    title: "Achievements",
    url: "/achievements",
    icon: Award,
    description: "View your badges, streaks and progress"
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "Manage your account settings"
  },
];

const facultyItems = [
  {
    title: "Faculty Dashboard",
    url: "/faculty",
    icon: GraduationCap,
    description: "Manage courses and monitor student progress"
  },
  {
    title: "Course Management",
    url: "/faculty/courses",
    icon: BookOpen,
    description: "Create and manage course content"
  },
  {
    title: "Coding Assignments",
    url: "/faculty/assignments",
    icon: Code,
    description: "Create coding assignments and test cases"
  },
  {
    title: "Student Analytics",
    url: "/faculty/analytics",
    icon: BarChart3,
    description: "View student performance metrics"
  },
  {
    title: "Attendance",
    url: "/faculty/attendance",
    icon: Calendar,
    description: "Manage and track student attendance"
  },
  {
    title: "Content Library",
    url: "/faculty/content",
    icon: Upload,
    description: "Upload and organize learning materials"
  }
];

const adminItems = [
  {
    title: "Admin Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
    description: "Overview of platform metrics"
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
    description: "Manage students and faculty accounts"
  },
  {
    title: "Placement Panel",
    url: "/admin/placement",
    icon: Briefcase,
    description: "Manage placement activities and reports"
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: FileText,
    description: "Generate and export performance reports"
  }
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("User");
  const [userInitials, setUserInitials] = useState<string>("U");
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      toast.error("Please sign in to access this page");
      navigate("/signin");
      return;
    }
    
    // Get user role and name from sessionStorage
    const role = sessionStorage.getItem("userRole") || "student";
    setUserRole(role);
    
    // Set user name based on role (can be replaced with actual username from auth)
    if (role === "student") {
      setUserName("John Doe");
      setUserInitials("JD");
    } else if (role === "faculty") {
      setUserName("Prof. Smith");
      setUserInitials("PS");
    } else if (role === "admin") {
      setUserName("Admin User");
      setUserInitials("AU");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    // Clear authentication state
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userRole");
    
    // Show toast notification
    toast.success("Successfully logged out");
    
    // Redirect to home page
    navigate("/");
  };

  // Get menu items based on user role
  const getMenuItems = () => {
    switch(userRole) {
      case "faculty":
        return facultyItems;
      case "admin":
        return adminItems;
      case "student":
      default:
        return studentItems;
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader>
          <Link to="/" className="flex items-center space-x-2 px-4">
            <GraduationCap className="h-6 w-6 text-campus-teal" />
            <span className="text-lg font-bold">Campus<span className="text-campus-teal">Bridge</span></span>
          </Link>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{userRole === "faculty" ? "Faculty Portal" : userRole === "admin" ? "Admin Portal" : "Student Portal"}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {getMenuItems().map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} title={item.description}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          {userRole === "admin" && (
            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/settings">
                        <Settings className="h-5 w-5" />
                        <span>System Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
        
        <SidebarFooter>
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start px-2"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center h-16 px-4 border-b bg-white">
          <SidebarTrigger />
          <div className="ml-auto flex items-center space-x-4">
            <div className="font-medium">{userName}</div>
            <div className="h-8 w-8 rounded-full bg-campus-blue text-white flex items-center justify-center">
              {userInitials}
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
