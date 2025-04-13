
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart4, 
  Download, 
  Search, 
  Users, 
  Calendar, 
  Clock, 
  Award,
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  XCircle,
  ChevronUp,
  ChevronDown,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock performance data
const performanceData = [
  { name: 'Assignment 1', scores: 85, average: 78 },
  { name: 'Assignment 2', scores: 72, average: 75 },
  { name: 'Assignment 3', scores: 90, average: 80 },
  { name: 'Quiz 1', scores: 78, average: 72 },
  { name: 'Midterm', scores: 82, average: 76 },
  { name: 'Assignment 4', scores: 88, average: 79 },
  { name: 'Assignment 5', scores: 95, average: 82 },
];

// Mock attendance data
const attendanceData = [
  { week: 'Week 1', present: 95, absent: 5 },
  { week: 'Week 2', present: 92, absent: 8 },
  { week: 'Week 3', present: 88, absent: 12 },
  { week: 'Week 4', present: 90, absent: 10 },
  { week: 'Week 5', present: 85, absent: 15 },
  { week: 'Week 6', present: 87, absent: 13 },
  { week: 'Week 7', present: 91, absent: 9 },
];

// Mock engagement data
const engagementData = [
  { day: 'Mon', coding: 3.5, discussions: 1.2 },
  { day: 'Tue', coding: 2.8, discussions: 0.8 },
  { day: 'Wed', coding: 4.2, discussions: 2.1 },
  { day: 'Thu', coding: 3.0, discussions: 1.5 },
  { day: 'Fri', coding: 2.5, discussions: 2.0 },
  { day: 'Sat', coding: 1.0, discussions: 0.5 },
  { day: 'Sun', coding: 0.8, discussions: 0.3 },
];

// Mock skill distribution data
const skillsData = [
  { name: 'Problem Solving', value: 78 },
  { name: 'Coding Speed', value: 65 },
  { name: 'Algorithm Knowledge', value: 72 },
  { name: 'Debugging', value: 85 },
  { name: 'Code Quality', value: 70 },
];

// Mock student data
const students = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    averageScore: 87,
    attendance: 92,
    completedAssignments: 8,
    totalAssignments: 10,
    trend: 'up'
  },
  {
    id: '2',
    name: 'Emma Johnson',
    email: 'emma.j@example.com',
    averageScore: 92,
    attendance: 95,
    completedAssignments: 10,
    totalAssignments: 10,
    trend: 'up'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    averageScore: 74,
    attendance: 85,
    completedAssignments: 7,
    totalAssignments: 10,
    trend: 'down'
  },
  {
    id: '4',
    name: 'Sophia Garcia',
    email: 'sophia.g@example.com',
    averageScore: 81,
    attendance: 88,
    completedAssignments: 9,
    totalAssignments: 10,
    trend: 'up'
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james.w@example.com',
    averageScore: 68,
    attendance: 78,
    completedAssignments: 5,
    totalAssignments: 10,
    trend: 'down'
  }
];

// Mock course data for dropdown
const courses = [
  { value: 'cs101', label: 'Introduction to Computer Science' },
  { value: 'cs201', label: 'Data Structures and Algorithms' },
  { value: 'cs301', label: 'Database Systems' },
  { value: 'cs401', label: 'Machine Learning Fundamentals' }
];

// Colors for charts
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];
const ATTENDANCE_COLORS = ['#4ade80', '#f87171'];

const StudentAnalytics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(courses[0].value);
  
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Analytics</h1>
        <div className="flex items-center gap-4">
          <Select
            value={selectedCourse}
            onValueChange={setSelectedCourse}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course.value} value={course.value}>
                  {course.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Class Average</p>
              <p className="text-3xl font-bold">82%</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ChevronUp className="h-3 w-3 mr-1" />
                3.2% since last month
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
              <p className="text-3xl font-bold">88%</p>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <ChevronDown className="h-3 w-3 mr-1" />
                1.5% since last month
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Assignment Completion</p>
              <p className="text-3xl font-bold">78%</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ChevronUp className="h-3 w-3 mr-1" />
                5.4% since last month
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">At-Risk Students</p>
              <p className="text-3xl font-bold">3</p>
              <p className="text-xs text-muted-foreground mt-1">
                Out of 25 students
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="students">Student List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Student Performance Trends</CardTitle>
                <CardDescription>
                  Average scores compared to class average over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="scores" 
                        stroke="#8884d8" 
                        name="Class Score" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="average" 
                        stroke="#82ca9d" 
                        name="Average" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>
                  Average student proficiency by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={skillsData}
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" name="Proficiency">
                        {skillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>
                  Distribution of grades across the class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'A (90-100%)', value: 8 },
                          { name: 'B (80-89%)', value: 10 },
                          { name: 'C (70-79%)', value: 4 },
                          { name: 'D (60-69%)', value: 2 },
                          { name: 'F (0-59%)', value: 1 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[0, 1, 2, 3, 4].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <div>Total Students: 25</div>
                <div>Class Average: 82%</div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Indicators</CardTitle>
                <CardDescription>
                  Key performance metrics for the current course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Assignment Completion</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Quiz Performance</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Code Quality</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Participation</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Problem-Solving Ability</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="attendance" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Attendance Rate</CardTitle>
                <CardDescription>
                  Attendance percentage for each week of the course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="present" stackId="a" fill="#4ade80" name="Present" />
                      <Bar dataKey="absent" stackId="a" fill="#f87171" name="Absent" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>
                  Summary of attendance across the course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Present', value: 88 },
                          { name: 'Absent', value: 12 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[0, 1].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={ATTENDANCE_COLORS[index % ATTENDANCE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span>Present</span>
                    </div>
                    <span>88%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <span>Absent</span>
                    </div>
                    <span>12%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Based on 7 weeks of classes
              </CardFooter>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Attendance by Student</CardTitle>
              <CardDescription>
                Individual student attendance records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead>Last Absent</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{Math.round(student.attendance / 100 * 14)} days</TableCell>
                      <TableCell>{14 - Math.round(student.attendance / 100 * 14)} days</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={student.attendance} className="w-24 h-2" />
                          <span>{student.attendance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.attendance < 90 ? "April 10, 2024" : "N/A"}</TableCell>
                      <TableCell>
                        {student.attendance >= 90 ? (
                          <Badge className="bg-green-500">Excellent</Badge>
                        ) : student.attendance >= 80 ? (
                          <Badge className="bg-yellow-500">Good</Badge>
                        ) : (
                          <Badge className="bg-red-500">Concerning</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Engagement</CardTitle>
                <CardDescription>
                  Hours spent on coding and discussions per day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={engagementData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="coding" fill="#8884d8" name="Coding Hours" />
                      <Bar dataKey="discussions" fill="#82ca9d" name="Discussion Hours" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>
                  Key engagement indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Platform Logins</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Code Submissions</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Discussion Participation</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Resource Access</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Practice Problems</span>
                    <span>56%</span>
                  </div>
                  <Progress value={56} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Students with highest engagement scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-campus-blue text-white flex items-center justify-center mr-3">
                        EJ
                      </div>
                      <div>
                        <div className="font-medium">Emma Johnson</div>
                        <div className="text-sm text-muted-foreground">10 hrs/week</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500">★★★★★</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-campus-blue text-white flex items-center justify-center mr-3">
                        SG
                      </div>
                      <div>
                        <div className="font-medium">Sophia Garcia</div>
                        <div className="text-sm text-muted-foreground">8.5 hrs/week</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500">★★★★☆</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-campus-blue text-white flex items-center justify-center mr-3">
                        JS
                      </div>
                      <div>
                        <div className="font-medium">John Smith</div>
                        <div className="text-sm text-muted-foreground">7.8 hrs/week</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500">★★★★☆</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Intervention Needed</CardTitle>
                <CardDescription>
                  Students with low engagement scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-red-100 text-red-800 flex items-center justify-center mr-3">
                        JW
                      </div>
                      <div>
                        <div className="font-medium">James Wilson</div>
                        <div className="text-sm text-muted-foreground">2.1 hrs/week</div>
                      </div>
                    </div>
                    <Button size="sm" variant="destructive">Contact</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-red-100 text-red-800 flex items-center justify-center mr-3">
                        AL
                      </div>
                      <div>
                        <div className="font-medium">Alex Lee</div>
                        <div className="text-sm text-muted-foreground">3.2 hrs/week</div>
                      </div>
                    </div>
                    <Button size="sm" variant="destructive">Contact</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center mr-3">
                        MB
                      </div>
                      <div>
                        <div className="font-medium">Michael Brown</div>
                        <div className="text-sm text-muted-foreground">4.5 hrs/week</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Contact</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="students" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>All Students</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Average Score</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Assignments</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {student.averageScore}%
                          {student.trend === 'up' && <ChevronUp className="h-4 w-4 text-green-500 ml-1" />}
                          {student.trend === 'down' && <ChevronDown className="h-4 w-4 text-red-500 ml-1" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={student.attendance} className="w-24 h-2" />
                          <span>{student.attendance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {student.completedAssignments}/{student.totalAssignments} completed
                      </TableCell>
                      <TableCell>
                        {student.averageScore >= 85 ? (
                          <Badge className="bg-green-500">High</Badge>
                        ) : student.averageScore >= 70 ? (
                          <Badge className="bg-yellow-500">Average</Badge>
                        ) : (
                          <Badge className="bg-red-500">Low</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAnalytics;
