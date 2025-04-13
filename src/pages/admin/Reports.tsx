
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Download, 
  Calendar, 
  FileText, 
  Share2,
  Mail,
  Clock,
  GraduationCap,
  Users,
  ArrowRight,
  Printer
} from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartPieChart,
  Pie,
  Cell
} from "recharts";

// Mock data for Academic Performance
const coursePerformanceData = [
  { name: "CS101", students: 120, avgScore: 82, passRate: 94 },
  { name: "CS201", students: 95, avgScore: 78, passRate: 91 },
  { name: "CS301", students: 88, avgScore: 74, passRate: 87 },
  { name: "CS401", students: 72, avgScore: 76, passRate: 89 },
  { name: "CS501", students: 55, avgScore: 71, passRate: 85 }
];

// Mock data for monthly user engagement
const monthlyEngagementData = [
  { month: "Jan", students: 75, faculty: 25 },
  { month: "Feb", students: 82, faculty: 28 },
  { month: "Mar", students: 91, faculty: 31 },
  { month: "Apr", students: 84, faculty: 27 },
  { month: "May", students: 95, faculty: 32 },
  { month: "Jun", students: 88, faculty: 30 },
  { month: "Jul", students: 79, faculty: 26 },
  { month: "Aug", students: 85, faculty: 29 },
  { month: "Sep", students: 94, faculty: 33 },
  { month: "Oct", students: 98, faculty: 35 },
  { month: "Nov", students: 96, faculty: 34 },
  { month: "Dec", students: 91, faculty: 31 }
];

// Mock data for user distribution
const userDistributionData = [
  { name: "Students", value: 2150, color: "#4f46e5" },
  { name: "Faculty", value: 175, color: "#16a34a" },
  { name: "Admins", value: 25, color: "#9b87f5" }
];

// Mock reports list
const recentReports = [
  {
    id: 1,
    title: "Q1 Academic Performance Report",
    generated: "2025-04-01",
    author: "Admin Team",
    type: "performance",
    department: "All Departments"
  },
  {
    id: 2,
    title: "Faculty Attendance Summary",
    generated: "2025-04-05",
    author: "Admin Team",
    type: "attendance",
    department: "All Departments"
  },
  {
    id: 3,
    title: "Placement Statistics 2025",
    generated: "2025-04-08",
    author: "Placement Cell",
    type: "placement",
    department: "Career Services"
  },
  {
    id: 4,
    title: "System Usage Analytics",
    generated: "2025-04-10",
    author: "System Admin",
    type: "system",
    department: "IT Department"
  }
];

// Report Template options
const reportTemplates = [
  { id: "academic", name: "Academic Performance Report" },
  { id: "attendance", name: "Attendance Summary Report" },
  { id: "placement", name: "Placement Statistics Report" },
  { id: "system", name: "System Usage Report" },
  { id: "custom", name: "Custom Report" }
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTemplate, setSelectedTemplate] = useState(reportTemplates[0].id);
  const [dateRange, setDateRange] = useState({ start: "2025-03-01", end: "2025-04-13" });
  
  const handleGenerateReport = () => {
    toast.success("Report generation started. You will be notified when it's ready.");
    // In a real app, this would trigger a backend process to generate the report
  };
  
  const handleScheduleReport = () => {
    toast.success("Report scheduled successfully!");
  };
  
  const handleDownloadReport = (id: number) => {
    toast.success("Report download started.");
    // In a real app, this would trigger a download of the report file
  };
  
  const handleShareReport = (id: number) => {
    toast.success("Share dialog would open here.");
    // In a real app, this would open a dialog to share the report via email or other means
  };
  
  const COLORS = ['#4f46e5', '#16a34a', '#9b87f5', '#f97316', '#ef4444'];
  
  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Reports
          </Button>
          <Button className="flex items-center gap-2" onClick={handleGenerateReport}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>
      
      {/* Main Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            User Analytics
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Generate Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-6">
          {/* Metrics Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-campus-teal" />
                  Academic Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">86%</div>
                <div className="text-sm text-muted-foreground">Average Course Pass Rate</div>
                <div className="mt-2 text-sm flex items-center text-green-600">
                  <span>↑ 3.2% from last semester</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-campus-blue" />
                  User Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,350</div>
                <div className="text-sm text-muted-foreground">Active Users This Month</div>
                <div className="mt-2 text-sm flex items-center text-green-600">
                  <span>↑ 5.7% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-campus-blue" />
                  Reports Generated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">47</div>
                <div className="text-sm text-muted-foreground">Reports in Last 30 Days</div>
                <div className="mt-2 text-sm flex items-center text-blue-600">
                  <span>Most common: Academic Performance</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activity Over Time</CardTitle>
                <CardDescription>
                  Monthly active users by role
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyEngagementData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stackId="1"
                      stroke="#4f46e5"
                      fill="#4f46e5"
                    />
                    <Area
                      type="monotone"
                      dataKey="faculty"
                      stackId="1"
                      stroke="#16a34a"
                      fill="#16a34a"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Export Chart
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>
                  Breakdown of system users by role
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPieChart>
                    <Pie
                      data={userDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {userDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartPieChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Export Chart
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Recently generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/40 font-medium text-sm">
                  <div className="col-span-5">Report Title</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Generated On</div>
                  <div className="col-span-3">Actions</div>
                </div>
                
                <div className="divide-y">
                  {recentReports.map((report) => (
                    <div key={report.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/20">
                      <div className="col-span-5">
                        <div className="font-medium">{report.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.department}
                        </div>
                      </div>
                      <div className="col-span-2 capitalize">
                        {report.type}
                      </div>
                      <div className="col-span-2">
                        {report.generated}
                      </div>
                      <div className="col-span-3 flex space-x-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleShareReport(report.id)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="academic" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>
                Course performance metrics across departments
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RechartBarChart
                  data={coursePerformanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="avgScore" name="Average Score" fill="#4f46e5" />
                  <Bar yAxisId="right" dataKey="passRate" name="Pass Rate %" fill="#16a34a" />
                </RechartBarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto">
                <Download className="h-4 w-4 mr-2" />
                Export Performance Data
              </Button>
            </CardFooter>
          </Card>
          
          {/* Academic Report coming soon placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Academic Reports</CardTitle>
              <CardDescription>
                More detailed academic analytics are coming soon
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-12">
              <div className="text-center">
                <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Advanced Analytics Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  We're working on implementing more detailed academic reports including 
                  grade distributions, course trends, and student progress tracking.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>
                System usage statistics coming soon
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-12">
              <div className="text-center">
                <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">User Analytics Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  This section will provide detailed analytics on user behavior, system 
                  usage patterns, and feature engagement metrics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="generate" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Report</CardTitle>
              <CardDescription>
                Select parameters to generate a custom report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium block mb-1">Report Template</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                  >
                    {reportTemplates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Department</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="all">All Departments</option>
                    <option value="cs">Computer Science</option>
                    <option value="ee">Electrical Engineering</option>
                    <option value="me">Mechanical Engineering</option>
                    <option value="math">Mathematics</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Start Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-md"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">End Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-md"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium block mb-1">Additional Options</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="includeCharts" className="mr-2" />
                      <label htmlFor="includeCharts">Include Charts</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="includeRawData" className="mr-2" />
                      <label htmlFor="includeRawData">Include Raw Data</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="compareWithPrevious" className="mr-2" />
                      <label htmlFor="compareWithPrevious">Compare with Previous Period</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-6">
                <label className="text-sm font-medium block mb-1">Report Format</label>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center">
                    <input type="radio" id="formatPDF" name="format" className="mr-2" checked />
                    <label htmlFor="formatPDF">PDF</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="formatExcel" name="format" className="mr-2" />
                    <label htmlFor="formatExcel">Excel</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="formatCSV" name="format" className="mr-2" />
                    <label htmlFor="formatCSV">CSV</label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-6">
                <label className="text-sm font-medium block mb-1">Delivery Options</label>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="emailReport" className="mr-2" />
                    <label htmlFor="emailReport" className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" /> 
                      Email Report
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="scheduleRecurring" className="mr-2" />
                    <label htmlFor="scheduleRecurring" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule Recurring
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleScheduleReport}>
                Schedule Report
              </Button>
              <Button onClick={handleGenerateReport}>
                Generate Now
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
