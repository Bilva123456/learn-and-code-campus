
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Code, 
  BarChart3, 
  PlusCircle, 
  Edit, 
  Trash, 
  Upload, 
  Download,
  FileText,
  Video,
  Layout,
  CheckSquare,
  Layers
} from "lucide-react";
import { facultyCoursesData, coursesData } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FacultyPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Combine faculty courses with general courses for demo
  const allCourses = [...facultyCoursesData, ...coursesData];
  
  // Filter courses based on search query
  const filteredCourses = allCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.department.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Faculty Portal</h1>
        <Button className="bg-campus-teal hover:bg-teal-700">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Course
        </Button>
      </div>
      
      {/* Faculty Dashboard Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Courses */}
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
              <p className="text-3xl font-bold">{allCourses.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-campus-blue" />
            </div>
          </CardContent>
        </Card>
        
        {/* Total Students */}
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Students</p>
              <p className="text-3xl font-bold">248</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        {/* Assignments */}
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Assignments</p>
              <p className="text-3xl font-bold">32</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        {/* Coding Exercises */}
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Coding Exercises</p>
              <p className="text-3xl font-bold">56</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Code className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Faculty Panel */}
      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="coding">Coding Assignments</TabsTrigger>
          <TabsTrigger value="analytics">Student Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <Input 
              placeholder="Search courses..." 
              className="max-w-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Layout className="h-4 w-4 mr-2" />
                View as Grid
              </Button>
            </div>
          </div>
          
          {/* Courses Table */}
          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/40 font-medium text-sm">
              <div className="col-span-4">Course</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-2">Students</div>
              <div className="col-span-2">Last Updated</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            
            <div className="divide-y">
              {filteredCourses.map((course) => (
                <div key={course.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/20">
                  <div className="col-span-4">
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.instructor}
                    </div>
                  </div>
                  <div className="col-span-2">{course.department}</div>
                  <div className="col-span-2">{course.enrolledStudents}</div>
                  <div className="col-span-2">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 flex justify-end space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Documents & PDFs</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Upload lecture materials, notes, and reading materials for your courses.
                </p>
                <div className="border border-dashed rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Drag files or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOC, TXT (Max 50MB)</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upload Materials</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2">
                  <Video className="h-5 w-5" />
                  <span>Video Lectures</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Record or upload video lectures, tutorials, and demonstrations.
                </p>
                <div className="border border-dashed rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Add video content</p>
                  <p className="text-xs text-muted-foreground mt-1">MP4, MOV, WEBM (Max 1GB)</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Manage Videos</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2">
                  <CheckSquare className="h-5 w-5" />
                  <span>Quizzes & Assessments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Create quizzes, tests, and other assessments to evaluate student knowledge.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full flex justify-between">
                    <span>Multiple Choice Quiz</span>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full flex justify-between">
                    <span>Essay Assignment</span>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full flex justify-between">
                    <span>Timed Exam</span>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create Assessment</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="coding" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Coding Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-md hover:bg-muted/20">
                      <div>
                        <div className="font-medium">Binary Search Tree Implementation</div>
                        <div className="text-sm text-muted-foreground">Due: April 20, 2024</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border rounded-md hover:bg-muted/20">
                      <div>
                        <div className="font-medium">Sorting Algorithms Practice</div>
                        <div className="text-sm text-muted-foreground">Due: April 25, 2024</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border rounded-md hover:bg-muted/20">
                      <div>
                        <div className="font-medium">Database Query Optimization</div>
                        <div className="text-sm text-muted-foreground">Due: May 5, 2024</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Coding Assignment
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                          JS
                        </div>
                        <div>
                          <div className="font-medium">John Smith</div>
                          <div className="text-sm text-muted-foreground">Binary Search Tree Implementation</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mr-3">
                          Completed
                        </div>
                        <Button variant="outline" size="sm">Review</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                          EJ
                        </div>
                        <div>
                          <div className="font-medium">Emma Johnson</div>
                          <div className="text-sm text-muted-foreground">Sorting Algorithms Practice</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-3">
                          In Progress
                        </div>
                        <Button variant="outline" size="sm">Review</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Submission Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Binary Search Tree Implementation</span>
                        <span>18/25</span>
                      </div>
                      <Progress value={72} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>72% submitted</span>
                        <span>Due in 3 days</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sorting Algorithms Practice</span>
                        <span>12/25</span>
                      </div>
                      <Progress value={48} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>48% submitted</span>
                        <span>Due in 8 days</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Database Query Optimization</span>
                        <span>3/25</span>
                      </div>
                      <Progress value={12} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>12% submitted</span>
                        <span>Due in 18 days</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-4">Difficulty Distribution</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-green-600">Easy</span>
                            <span>40%</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-yellow-600">Medium</span>
                            <span>45%</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-red-600">Hard</span>
                            <span>15%</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="h-5 w-5" />
                    <span>Templates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use predefined templates to quickly create new assignments.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Code className="h-4 w-4 mr-2" />
                      Algorithm Challenge
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Code className="h-4 w-4 mr-2" />
                      Data Structure Implementation
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Code className="h-4 w-4 mr-2" />
                      API Integration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Student Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/20 p-8 rounded-lg text-center">
                <BarChart3 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">Analytics Dashboard Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                  Comprehensive student performance analytics will be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyPanel;
