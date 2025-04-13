
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  BookOpen, 
  Code, 
  GraduationCap,
  LogIn,
  LogOut,
  LayoutDashboard
} from "lucide-react";
import { toast } from "sonner";

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status whenever component renders
    const authStatus = sessionStorage.getItem("isAuthenticated") === "true";
    const role = sessionStorage.getItem("userRole");
    setIsAuthenticated(authStatus);
    setUserRole(role);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (id: string, path: string) => {
    // Close menu if open
    if (isMenuOpen) setIsMenuOpen(false);
    
    if (!isAuthenticated && path !== "/signin") {
      toast.error("Please sign in to access this feature");
      navigate("/signin");
      return;
    }
    
    // If on homepage, scroll to section
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(path);
      }
    } else {
      // Navigate to the path
      navigate(path);
    }
  };

  const handleLogout = () => {
    // Clear authentication state
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUserRole(null);
    
    // Show toast notification
    toast.success("Successfully logged out");
    
    // Navigate to home
    navigate("/");
  };

  // Handle dashboard navigation based on user role
  const handleDashboardNavigation = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to access your dashboard");
      navigate("/signin");
      return;
    }
    
    switch (userRole) {
      case "faculty":
        navigate("/faculty");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "student":
      default:
        navigate("/dashboard");
        break;
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-campus-blue" />
            <span className="text-xl font-bold text-gray-800">Campus<span className="text-campus-teal">Bridge</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation('courses', '/courses')}
              className="text-gray-600 hover:text-campus-blue transition-colors font-medium"
            >
              Courses
            </button>
            <button 
              onClick={() => handleNavigation('practice', '/practice')}
              className="text-gray-600 hover:text-campus-blue transition-colors font-medium"
            >
              Code Practice
            </button>
            <button 
              onClick={handleDashboardNavigation}
              className="text-gray-600 hover:text-campus-blue transition-colors font-medium"
            >
              {userRole === "faculty" ? "Faculty Portal" : userRole === "admin" ? "Admin Panel" : "Student Dashboard"}
            </button>
            
            {isAuthenticated ? (
              <Button 
                variant="default" 
                className="bg-campus-blue hover:bg-blue-700 transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="bg-campus-blue hover:bg-blue-700 transition-colors"
                asChild
              >
                <Link to="/signin">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('courses', '/courses')}
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Courses
              </button>
              <button 
                onClick={() => handleNavigation('practice', '/practice')}
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <Code className="h-5 w-5 mr-2" />
                Code Practice
              </button>
              <button 
                onClick={handleDashboardNavigation}
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <LayoutDashboard className="h-5 w-5 mr-2" />
                {userRole === "faculty" ? "Faculty Portal" : userRole === "admin" ? "Admin Panel" : "Student Dashboard"}
              </button>
              
              {isAuthenticated ? (
                <Button 
                  variant="default" 
                  className="w-full bg-campus-blue hover:bg-blue-700 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  className="w-full bg-campus-blue hover:bg-blue-700 transition-colors"
                  asChild
                >
                  <Link to="/signin" onClick={toggleMenu}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
