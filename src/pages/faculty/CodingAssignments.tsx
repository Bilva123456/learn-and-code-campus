
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Code, Edit, FileText, Plus, Search, Clock, CheckCircle2, AlertCircle, HelpCircle, ChevronDown, Users } from "lucide-react";
import { toast } from "sonner";

// Example assignment data
const assignments = [
  {
    id: "1",
    title: "Binary Search Tree Implementation",
    description: "Implement a binary search tree with insert, delete, and search operations",
    dueDate: "2024-04-20",
    difficulty: "Hard",
    points: 100,
    status: "active",
    submissionCount: 18,
    totalStudents: 25,
    language: "Java",
    testCases: 8
  },
  {
    id: "2",
    title: "Sorting Algorithms Practice",
    description: "Implement quicksort, mergesort, and bubble sort algorithms and compare their performance",
    dueDate: "2024-04-25",
    difficulty: "Medium",
    points: 75,
    status: "active",
    submissionCount: 12,
    totalStudents: 25,
    language: "Python",
    testCases: 6
  },
  {
    id: "3",
    title: "Database Query Optimization",
    description: "Optimize SQL queries for a given database schema to improve performance",
    dueDate: "2024-05-05",
    difficulty: "Medium",
    points: 80,
    status: "active",
    submissionCount: 3,
    totalStudents: 25,
    language: "SQL",
    testCases: 5
  }
];

// Example submissions data
const submissions = [
  {
    id: "1",
    studentName: "John Smith",
    studentId: "JS2024",
    assignmentTitle: "Binary Search Tree Implementation",
    submissionDate: "2024-04-15T14:30:00",
    status: "completed",
    score: 95,
    timeSpent: "3h 15m"
  },
  {
    id: "2",
    studentName: "Emma Johnson",
    studentId: "EJ2024",
    assignmentTitle: "Sorting Algorithms Practice",
    submissionDate: "2024-04-17T09:45:00",
    status: "in-progress",
    score: null,
    timeSpent: "1h 45m"
  },
  {
    id: "3",
    studentName: "Michael Brown",
    studentId: "MB2024",
    assignmentTitle: "Binary Search Tree Implementation",
    submissionDate: "2024-04-16T11:20:00",
    status: "needs-review",
    score: null,
    timeSpent: "2h 30m"
  },
  {
    id: "4",
    studentName: "Sophia Garcia",
    studentId: "SG2024",
    assignmentTitle: "Sorting Algorithms Practice",
    submissionDate: "2024-04-17T16:10:00",
    status: "completed",
    score: 82,
    timeSpent: "2h 05m"
  }
];

const CodingAssignments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [assignmentsList, setAssignmentsList] = useState(assignments);
  const [submissionsList, setSubmissionsList] = useState(submissions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    difficulty: "",
    points: "",
    language: "",
    testCases: ""
  });
  
  const filteredAssignments = assignmentsList.filter(assignment =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.language.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCreateAssignment = () => {
    const assignmentToAdd = {
      ...newAssignment,
      id: (assignmentsList.length + 1).toString(),
      status: "active",
      submissionCount: 0,
      totalStudents: 25,
      points: parseInt(newAssignment.points),
      testCases: parseInt(newAssignment.testCases || "0")
    };
    
    setAssignmentsList([...assignmentsList, assignmentToAdd]);
    setIsDialogOpen(false);
    toast.success("Assignment created successfully!");
    setNewAssignment({
      title: "",
      description: "",
      dueDate: "",
      difficulty: "",
      points: "",
      language: "",
      testCases: ""
    });
  };
  
  // Function to get appropriate status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "needs-review":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coding Assignments</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-campus-teal hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Coding Assignment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input 
                  id="title"
                  placeholder="Binary Search Tree Implementation" 
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Detailed assignment instructions..." 
                  className="min-h-[100px]"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input 
                    id="dueDate"
                    type="date" 
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input 
                    id="points"
                    type="number" 
                    placeholder="100" 
                    value={newAssignment.points}
                    onChange={(e) => setNewAssignment({...newAssignment, points: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select 
                    onValueChange={(value) => setNewAssignment({...newAssignment, difficulty: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Programming Language</Label>
                  <Select 
                    onValueChange={(value) => setNewAssignment({...newAssignment, language: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Java">Java</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="C++">C++</SelectItem>
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                      <SelectItem value="SQL">SQL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="testCases">Number of Test Cases</Label>
                <Input 
                  id="testCases"
                  type="number" 
                  placeholder="5" 
                  value={newAssignment.testCases}
                  onChange={(e) => setNewAssignment({...newAssignment, testCases: e.target.value})}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="automaticGrading" />
                <Label htmlFor="automaticGrading">Enable automatic grading</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateAssignment}>Create Assignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="assignments">
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assignments" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>All Assignments</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search assignments..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-4">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium flex items-center">
                            <Code className="h-5 w-5 mr-2 text-campus-blue" />
                            {assignment.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={
                              assignment.difficulty === "Easy" ? "bg-green-500" : 
                              assignment.difficulty === "Medium" ? "bg-yellow-500" : 
                              "bg-red-500"
                            }>
                              {assignment.difficulty}
                            </Badge>
                            <Badge variant="outline">{assignment.language}</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {assignment.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-4">
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{assignment.testCases} Test Cases</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{assignment.submissionCount}/{assignment.totalStudents} Submitted</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-muted/20 p-4 md:w-48 flex flex-row md:flex-col justify-between">
                        <div className="text-center mb-2">
                          <div className="text-2xl font-bold">{assignment.points}</div>
                          <div className="text-xs text-muted-foreground">Points</div>
                        </div>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" className="w-full">View Details</Button>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-muted/10 border-t">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          Submission Rate: {Math.round((assignment.submissionCount / assignment.totalStudents) * 100)}%
                        </div>
                        <Progress value={(assignment.submissionCount / assignment.totalStudents) * 100} className="w-48 h-2" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="submissions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Submissions</CardTitle>
              <CardDescription>
                View and grade student submissions for your coding assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submissionsList.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {submission.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium">{submission.studentName}</h4>
                        <p className="text-sm text-muted-foreground">{submission.assignmentTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-sm">
                        <div className="text-muted-foreground">Submitted</div>
                        <div>{new Date(submission.submissionDate).toLocaleDateString()} at {new Date(submission.submissionDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(submission.status)}
                        <span className="ml-1 text-sm capitalize">
                          {submission.status.replace("-", " ")}
                        </span>
                      </div>
                      <div className="w-12 text-center">
                        <div className="font-medium">{submission.score ?? "-"}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Algorithm Challenges</CardTitle>
                <CardDescription>
                  Standard algorithm implementation assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/20">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 mr-2 text-campus-blue" />
                      <span>Sorting Algorithms</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/20">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 mr-2 text-campus-blue" />
                      <span>Search Algorithms</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/20">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 mr-2 text-campus-blue" />
                      <span>Graph Algorithms</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Algorithm Template
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Structures</CardTitle>
                <CardDescription>
                  Implementation of common data structures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/20">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 mr-2 text-campus-blue" />
                      <span>Binary Trees</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/20">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 mr-2 text-campus-blue" />
                      <span>Hash Tables</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/20">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 mr-2 text-campus-blue" />
                      <span>Linked Lists</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Data Structure Template
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Language-Specific</CardTitle>
                <CardDescription>
                  Templates for specific programming languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/20">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 mr-2 text-campus-blue" />
                      <span>Java OOP Design</span>
                    </div>
                    <Badge>Java</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/20">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 mr-2 text-campus-blue" />
                      <span>Python Data Analysis</span>
                    </div>
                    <Badge>Python</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/20">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 mr-2 text-campus-blue" />
                      <span>JavaScript Frontend</span>
                    </div>
                    <Badge>JavaScript</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Language Template
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodingAssignments;
