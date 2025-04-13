
import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-campus-teal" />
              <span className="text-xl font-bold">Campus<span className="text-campus-teal">Bridge</span></span>
            </div>
            <p className="text-gray-400 mb-4">
              Bridging the gap between academic learning and coding skill development for modern education.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-campus-teal transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-gray-400 hover:text-campus-teal transition-colors">
                  Code Practice
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-campus-teal transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="text-gray-400 hover:text-campus-teal transition-colors">
                  Faculty Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-campus-teal transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-campus-teal transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-campus-teal transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-campus-teal transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2 text-campus-teal" />
                <span>support@campusbridge.edu</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2 text-campus-teal" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-campus-teal" />
                <span>123 Education Lane, Learning City, ED 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 CampusBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
