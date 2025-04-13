
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Edit, Plus, Search, Trash2, Upload, Users, Video, FileText, Book } from "lucide-react";
import { toast } from "sonner";
import { Course, facultyCoursesData } from "@/data/mockData";

const CourseManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>(facultyCoursesData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    department: "",
    courseCode: "",
    startDate: "",
    endDate: "",
    maxStudents: "30"
  });
  
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (course.department && course.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (course.courseCode && course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleCreateCourse = () => {
    // Create a new course with all required properties from the Course interface
    const courseToAdd: Course = {
      id: (courses.length + 1).toString(),
      title: newCourse.title,
      description: newCourse.description,
      department: newCourse.department,
      courseCode: newCourse.courseCode,
      startDate: newCourse.startDate,
      endDate: newCourse.endDate,
      maxStudents: newCourse.maxStudents,
      instructor: "Prof. Smith",
      enrolledStudents: 0,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97", // Default image
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "Active",
      progress: 0
    };
    
    setCourses([...courses, courseToAdd]);
    setIsDialogOpen(false);
    toast.success("Course created successfully!");
    setNewCourse({
      title: "",
      description: "",
      department: "",
      courseCode: "",
      startDate: "",
      endDate: "",
      maxStudents: "30"
    });
  };
  
  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
    toast.success("Course deleted successfully!");
  };
  
  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-campus-teal hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input 
                    id="title"
                    placeholder="Introduction to Computer Science" 
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseCode">Course Code</Label>
                  <Input 
                    id="courseCode"
                    placeholder="CS101" 
                    value={newCourse.courseCode}
                    onChange={(e) => setNewCourse({...newCourse, courseCode: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Enter course description" 
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    onValueChange={(value) => setNewCourse({...newCourse, department: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Max Students</Label>
                  <Input 
                    id="maxStudents"
                    type="number" 
                    placeholder="30" 
                    value={newCourse.maxStudents}
                    onChange={(e) => setNewCourse({...newCourse, maxStudents: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate"
                    type="date" 
                    value={newCourse.startDate}
                    onChange={(e) => setNewCourse({...newCourse, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input 
                    id="endDate"
                    type="date" 
                    value={newCourse.endDate}
                    onChange={(e) => setNewCourse({...newCourse, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateCourse}>Create Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Course List</TabsTrigger>
          <TabsTrigger value="materials">Course Materials</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>All Courses</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
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
                    <TableHead>Course</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        {course.title}
                        <div className="text-xs text-muted-foreground">{course.instructor}</div>
                      </TableCell>
                      <TableCell>{course.courseCode}</TableCell>
                      <TableCell>{course.department}</TableCell>
                      <TableCell>{course.enrolledStudents}</TableCell>
                      <TableCell>
                        <Badge variant={course.status === "Active" ? "default" : "outline"}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="materials" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Lecture Materials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-dashed rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Drag files or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOC, PPT (Max 50MB)</p>
                </div>
                <Input id="file-upload" type="file" className="hidden" />
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => document.getElementById("file-upload")?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Materials
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="h-5 w-5 mr-2" />
                  Video Lectures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-dashed rounded-lg p-4 text-center">
                  <Video className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Upload recorded lectures</p>
                  <p className="text-xs text-muted-foreground mt-1">MP4, MOV (Max 500MB)</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  Manage Videos
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="h-5 w-5 mr-2" />
                  Resource Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Course Syllabus.pdf</span>
                    </div>
                    <Badge>New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Week 1 Slides.pptx</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Reading List.docx</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Resources</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Course Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Week 1: Introduction</h3>
                      <p className="text-sm text-muted-foreground">April 15-21, 2024</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Topics: Course Overview, Basic Concepts, Development Environment Setup</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Week 2: Fundamentals</h3>
                      <p className="text-sm text-muted-foreground">April 22-28, 2024</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Topics: Data Types, Operators, Control Structures</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Week 3: Functions and Methods</h3>
                      <p className="text-sm text-muted-foreground">April 29 - May 5, 2024</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Topics: Functions, Parameters, Return Values, Scope</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Schedule Item
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseManagement;
