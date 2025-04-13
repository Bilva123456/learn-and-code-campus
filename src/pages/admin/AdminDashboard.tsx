
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  BookOpen,
  Code,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  BookCheck,
  Calendar,
  School
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Sample Chart Component
const ActivityChart = () => (
  <div className="h-[200px] w-full bg-gradient-to-r from-blue-50 to-blue-100 rounded-md flex items-center justify-center">
    <BarChart3 className="h-12 w-12 text-gray-400" />
    <div className="ml-2 text-gray-500">Activity Chart Placeholder</div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Students</p>
              <p className="text-3xl font-bold">2,845</p>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                12% increase
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Faculty Members</p>
              <p className="text-3xl font-bold">142</p>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                5% increase
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
              <p className="text-3xl font-bold">89</p>
              <p className="text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 inline mr-1" />
                This semester
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Placement Rate</p>
              <p className="text-3xl font-bold">92%</p>
              <p className="text-xs text-muted-foreground mt-1">
                <CheckCircle className="h-3 w-3 inline mr-1" />
                Last graduate batch
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* First Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>System Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityChart />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">1,245</div>
                  <div className="text-sm text-gray-500">Logins Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">87%</div>
                  <div className="text-sm text-gray-500">Assignment Submissions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-gray-500">New Enrollments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">98.2%</div>
                  <div className="text-sm text-gray-500">System Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="flex gap-4 items-center">
                  <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <School className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">New course created: "Advanced Machine Learning"</p>
                    <p className="text-sm text-gray-500">by Prof. Johnson • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                  <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">15 new students registered</p>
                    <p className="text-sm text-gray-500">Computer Science Department • 3 hours ago</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                  <div className="h-9 w-9 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">Mid-semester exams schedule published</p>
                    <p className="text-sm text-gray-500">by Admin User • 5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                  <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <BookCheck className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Grade submission deadline reminder sent</p>
                    <p className="text-sm text-gray-500">to all faculty members • 6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Second Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Department Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Computer Science</span>
                    <span>854 students</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Electrical Engineering</span>
                    <span>623 students</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Mechanical Engineering</span>
                    <span>512 students</span>
                  </div>
                  <Progress value={51} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Business Administration</span>
                    <span>437 students</span>
                  </div>
                  <Progress value={44} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Biology</span>
                    <span>329 students</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <Users className="h-6 w-6 mb-2" />
                  <div className="text-sm font-medium">Manage Users</div>
                </Card>
                
                <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <BookOpen className="h-6 w-6 mb-2" />
                  <div className="text-sm font-medium">View Courses</div>
                </Card>
                
                <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <Briefcase className="h-6 w-6 mb-2" />
                  <div className="text-sm font-medium">Placement Portal</div>
                </Card>
                
                <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <div className="text-sm font-medium">Generate Reports</div>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Server Load</span>
                    <span>42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Database Usage</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Storage Capacity</span>
                    <span>74%</span>
                  </div>
                  <Progress value={74} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
