
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, Filter, ChevronDown, Calendar, Clock, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { coursesData } from "@/data/mockData";
import { useState } from "react";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter courses based on search query
  const filteredCourses = coursesData.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.department.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search courses..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>
      
      {/* Course Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses
              .filter(course => course.progress! > 0 && course.progress! < 100)
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses
              .filter(course => course.progress === 100)
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            {filteredCourses.filter(course => course.progress === 100).length === 0 && (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-1">No Completed Courses</h3>
                <p className="text-gray-500">Keep learning to complete your courses!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    department: string;
    description: string;
    image: string;
    progress?: number;
    enrolledStudents?: number;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="h-40 bg-gray-200 relative">
        {course.image ? (
          <img 
            src={`${course.image}?w=400&h=200&fit=crop&auto=format`} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-100">
            <BookOpen className="h-12 w-12 text-campus-blue" />
          </div>
        )}
      </div>
      
      <CardContent className="pt-6 flex-grow">
        <div className="mb-2 flex items-center">
          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
            {course.department}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          <span className="font-medium">Instructor:</span> {course.instructor}
        </p>
        <p className="text-sm line-clamp-2 mb-4">{course.description}</p>
        
        <div className="flex items-center text-xs text-muted-foreground space-x-4 mb-3">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>8 weeks</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Self-paced</span>
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>{course.enrolledStudents} students</span>
          </div>
        </div>
        
        {course.progress !== undefined && (
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Button variant="default" className="w-full bg-campus-blue hover:bg-blue-700">
          {course.progress === 0 ? "Start Course" : "Continue Learning"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Courses;
