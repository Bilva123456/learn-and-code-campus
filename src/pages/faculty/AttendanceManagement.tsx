
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Search,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  BarChart3,
  Calendar,
  AlertTriangle,
  Filter,
  Plus,
  ChevronDown,
  FileText,
  MoreVertical,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock student data
const students = [
  { id: "1", name: "John Smith", present: true, late: false, absent: false, absences: 2, attendance: 92, lastUpdated: "2024-04-13T09:30:00" },
  { id: "2", name: "Emma Johnson", present: false, late: true, absent: false, absences: 0, attendance: 95, lastUpdated: "2024-04-13T09:30:00" },
  { id: "3", name: "Michael Brown", present: true, late: false, absent: false, absences: 3, attendance: 85, lastUpdated: "2024-04-13T09:30:00" },
  { id: "4", name: "Sophia Garcia", present: true, late: false, absent: false, absences: 1, attendance: 90, lastUpdated: "2024-04-13T09:30:00" },
  { id: "5", name: "James Wilson", present: false, late: false, absent: true, absences: 5, attendance: 78, lastUpdated: "2024-04-13T09:30:00" },
  { id: "6", name: "Olivia Martinez", present: true, late: false, absent: false, absences: 1, attendance: 92, lastUpdated: "2024-04-13T09:30:00" },
  { id: "7", name: "Daniel Lee", present: false, late: true, absent: false, absences: 2, attendance: 88, lastUpdated: "2024-04-13T09:30:00" },
  { id: "8", name: "Ava Thompson", present: false, late: false, absent: true, absences: 4, attendance: 80, lastUpdated: "2024-04-13T09:30:00" }
];

// Mock class sessions
const classSessions = [
  { id: "1", date: "2024-04-13", topic: "Introduction to Data Structures", attended: 22, absent: 3, percentAttended: 88 },
  { id: "2", date: "2024-04-10", topic: "Arrays and Linked Lists", attended: 20, absent: 5, percentAttended: 80 },
  { id: "3", date: "2024-04-06", topic: "Stacks and Queues", attended: 23, absent: 2, percentAttended: 92 },
  { id: "4", date: "2024-04-03", topic: "Trees and Binary Search Trees", attended: 21, absent: 4, percentAttended: 84 },
  { id: "5", date: "2024-03-30", topic: "Graphs and Graph Algorithms", attended: 19, absent: 6, percentAttended: 76 },
];

// Mock course data for dropdown
const courses = [
  { value: "cs101", label: "Introduction to Computer Science" },
  { value: "cs201", label: "Data Structures and Algorithms" },
  { value: "cs301", label: "Database Systems" },
  { value: "cs401", label: "Machine Learning Fundamentals" }
];

const AttendanceManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(courses[1].value);
  const [studentsList, setStudentsList] = useState(students);
  const [classSessionsList, setClassSessionsList] = useState(classSessions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    date: "",
    topic: "",
    notes: ""
  });
  
  const filteredStudents = studentsList.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAttendanceChange = (studentId, status) => {
    setStudentsList(studentsList.map(student => {
      if (student.id === studentId) {
        // Reset all statuses
        const updatedStudent = {
          ...student,
          present: false,
          late: false,
          absent: false
        };
        
        // Set the selected status
        updatedStudent[status] = true;
        
        // Update absences count if marking as absent
        if (status === 'absent') {
          updatedStudent.absences += 1;
          updatedStudent.attendance = Math.max(0, student.attendance - 2);
        } else if (status === 'late' && student.absent) {
          // If changing from absent to late, reduce absence count
          updatedStudent.absences = Math.max(0, student.absences - 1);
          updatedStudent.attendance = Math.min(100, student.attendance + 1);
        } else if (status === 'present' && student.absent) {
          // If changing from absent to present, reduce absence count
          updatedStudent.absences = Math.max(0, student.absences - 1);
          updatedStudent.attendance = Math.min(100, student.attendance + 2);
        }
        
        updatedStudent.lastUpdated = new Date().toISOString();
        
        return updatedStudent;
      }
      return student;
    }));
    
    toast.success(`Attendance status updated for student`);
  };
  
  const handleCreateSession = () => {
    const sessionToAdd = {
      ...newSession,
      id: (classSessionsList.length + 1).toString(),
      attended: 20,
      absent: 5,
      percentAttended: 80
    };
    
    setClassSessionsList([sessionToAdd, ...classSessionsList]);
    setIsDialogOpen(false);
    toast.success("Class session created successfully!");
    setNewSession({
      date: "",
      topic: "",
      notes: ""
    });
  };
  
  const handleBulkMarkAttendance = (status) => {
    const updatedStudents = studentsList.map(student => ({
      ...student,
      present: status === 'present',
      late: status === 'late',
      absent: status === 'absent',
      lastUpdated: new Date().toISOString()
    }));
    
    setStudentsList(updatedStudents);
    toast.success(`All students marked as ${status}`);
  };
  
  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-campus-teal hover:bg-teal-700">
                <Plus className="h-4 w-4 mr-2" />
                New Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Class Session</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Session Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="topic">Topic/Title</Label>
                  <Input
                    id="topic"
                    placeholder="Topic of this class session"
                    value={newSession.topic}
                    onChange={(e) => setNewSession({...newSession, topic: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Session Notes (Optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Additional notes for this session"
                    value={newSession.notes}
                    onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateSession}>Create Session</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Attendance</p>
              <p className="text-3xl font-bold">88%</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
              <p className="text-3xl font-bold">{classSessions.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Present Today</p>
              <p className="text-3xl font-bold">{studentsList.filter(s => s.present).length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Absent Today</p>
              <p className="text-3xl font-bold">{studentsList.filter(s => s.absent).length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today's Attendance</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Mark Attendance - {new Date().toLocaleDateString()}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleBulkMarkAttendance('present')}>
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Mark All Present
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkMarkAttendance('late')}>
                        <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                        Mark All Late
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkMarkAttendance('absent')}>
                        <XCircle className="h-4 w-4 mr-2 text-red-600" />
                        Mark All Absent
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardDescription>
                {courses.find(c => c.value === selectedCourse)?.label} - {new Date().toDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Absences</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>
                        {student.present ? (
                          <Badge className="bg-green-500">Present</Badge>
                        ) : student.late ? (
                          <Badge className="bg-yellow-500">Late</Badge>
                        ) : student.absent ? (
                          <Badge className="bg-red-500">Absent</Badge>
                        ) : (
                          <Badge variant="outline">Not Marked</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {student.absences}
                          {student.absences > 3 && (
                            <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={student.attendance} className="w-24 h-2" />
                          <span>{student.attendance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(student.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant={student.present ? "default" : "outline"} 
                            size="sm"
                            onClick={() => handleAttendanceChange(student.id, 'present')}
                          >
                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                            Present
                          </Button>
                          <Button 
                            variant={student.late ? "default" : "outline"} 
                            size="sm"
                            onClick={() => handleAttendanceChange(student.id, 'late')}
                          >
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            Late
                          </Button>
                          <Button 
                            variant={student.absent ? "default" : "outline"} 
                            size="sm"
                            onClick={() => handleAttendanceChange(student.id, 'absent')}
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            Absent
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredStudents.length} of {studentsList.length} students
              </p>
              <Button onClick={() => toast.success("Attendance submitted successfully!")}>
                Submit Attendance
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Past Class Sessions</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <CardDescription>
                Attendance history for {courses.find(c => c.value === selectedCourse)?.label}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Attended</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classSessionsList.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        {new Date(session.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {session.topic}
                      </TableCell>
                      <TableCell>{session.attended}</TableCell>
                      <TableCell>{session.absent}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={session.percentAttended} className="w-24 h-2" />
                          <span>{session.percentAttended}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Attendance Summary Report</CardTitle>
                <CardDescription>
                  Download or generate custom attendance reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select defaultValue="summary">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Summary Report</SelectItem>
                        <SelectItem value="detailed">Detailed Report</SelectItem>
                        <SelectItem value="student">Per Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Include Data</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="absences" defaultChecked />
                      <label htmlFor="absences">Absences</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="lateArrivals" defaultChecked />
                      <label htmlFor="lateArrivals">Late Arrivals</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="trends" defaultChecked />
                      <label htmlFor="trends">Attendance Trends</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="atRisk" defaultChecked />
                      <label htmlFor="atRisk">At-Risk Students</label>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border rounded-lg bg-muted/20 flex flex-col items-center justify-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Generate Custom Report</h3>
                  <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
                    Create a customized attendance report based on your selected parameters. 
                    Reports can be downloaded as Excel, CSV, or PDF.
                  </p>
                  <div className="flex space-x-3">
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button variant="outline">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      This Week's Attendance
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Student Attendance Summary
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      At-Risk Students Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Monthly Attendance Trends
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Import/Export</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-dashed rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">Import attendance data</p>
                    <p className="text-xs text-muted-foreground mt-1">CSV, Excel (Max 5MB)</p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Attendance Data
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export All Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceManagement;
