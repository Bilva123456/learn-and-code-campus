
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  Building, 
  Calendar, 
  Download, 
  Filter, 
  GraduationCap, 
  Plus, 
  Search, 
  Upload,
  UserCheck,
  LineChart,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Software Developer",
    company: "TechCorp",
    location: "Remote",
    salary: "$80,000 - $100,000",
    posted: "2025-03-15",
    applicants: 24,
    status: "active",
    deadline: "2025-05-15",
    description: "Looking for a skilled software developer proficient in React and Node.js."
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "DataAnalytics Inc",
    location: "New York, NY",
    salary: "$90,000 - $120,000",
    posted: "2025-03-20",
    applicants: 16,
    status: "active",
    deadline: "2025-05-10",
    description: "Seeking a data scientist with experience in machine learning and statistical analysis."
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "CreativeDesigns Co",
    location: "San Francisco, CA",
    salary: "$75,000 - $95,000",
    posted: "2025-03-25",
    applicants: 12,
    status: "active",
    deadline: "2025-04-30",
    description: "Looking for a talented UX/UI designer to create elegant user experiences."
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    salary: "$85,000 - $110,000",
    posted: "2025-04-01",
    applicants: 8,
    status: "active",
    deadline: "2025-05-20",
    description: "Seeking a DevOps engineer with expertise in AWS, Docker, and CI/CD pipelines."
  }
];

// Mock candidates data
const mockCandidates = [
  {
    id: 1,
    name: "Jennifer Smith",
    course: "B.Tech Computer Science",
    graduation: "2025",
    skills: ["JavaScript", "React", "Node.js"],
    applications: 3,
    interviews: 2,
    status: "interviewing"
  },
  {
    id: 2,
    name: "Michael Johnson",
    course: "M.Tech Data Science",
    graduation: "2025",
    skills: ["Python", "Machine Learning", "SQL"],
    applications: 5,
    interviews: 1,
    status: "placed"
  },
  {
    id: 3,
    name: "Emma Williams",
    course: "B.Tech Computer Science",
    graduation: "2025",
    skills: ["Java", "Spring", "React"],
    applications: 4,
    interviews: 0,
    status: "applying"
  },
  {
    id: 4,
    name: "David Brown",
    course: "M.Tech AI & ML",
    graduation: "2026",
    skills: ["Python", "TensorFlow", "Deep Learning"],
    applications: 2,
    interviews: 1,
    status: "interviewing"
  }
];

// Mock statistics
const placementStats = {
  totalJobs: 37,
  activeJobs: 18,
  totalCandidates: 215,
  placedCandidates: 78,
  avgSalary: "$92,500",
  topCompany: "Microsoft (12 hires)"
};

const PlacementPanel = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  
  const filteredJobs = mockJobs.filter(job => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }
    return true;
  });
  
  const filteredCandidates = mockCandidates.filter(candidate => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        candidate.name.toLowerCase().includes(query) ||
        candidate.course.toLowerCase().includes(query) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    return true;
  });
  
  const handleAddJob = () => {
    toast.success("Job posting added successfully!");
    setShowAddJobForm(false);
  };
  
  const getCandidateStatusBadge = (status: string) => {
    switch (status) {
      case "placed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Placed
          </Badge>
        );
      case "interviewing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Interviewing
          </Badge>
        );
      case "applying":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            Applying
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            {status}
          </Badge>
        );
    }
  };
  
  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Placement Panel</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          {activeTab === "jobs" ? (
            <Button onClick={() => setShowAddJobForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Job Posting
            </Button>
          ) : (
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Import Candidates
            </Button>
          )}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div className="text-3xl font-bold">{placementStats.activeJobs}</div>
                <div className="text-sm text-muted-foreground">Active Postings</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{placementStats.totalJobs}</div>
                <div className="text-sm text-muted-foreground">Total Postings</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div className="text-3xl font-bold">{placementStats.placedCandidates}</div>
                <div className="text-sm text-muted-foreground">Placed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{placementStats.totalCandidates}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div className="text-3xl font-bold">{placementStats.avgSalary}</div>
                <div className="text-sm text-muted-foreground">Avg. Salary</div>
              </div>
              <div className="text-right">
                <div className="text-md font-medium">{placementStats.topCompany}</div>
                <div className="text-sm text-muted-foreground">Top Recruiter</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="jobs" className="mb-6">
        <TabsList>
          <TabsTrigger value="jobs" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            Job Postings
          </TabsTrigger>
          <TabsTrigger value="candidates" className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            Candidates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 my-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder={activeTab === "jobs" ? "Search jobs by title, company or location..." : "Search candidates by name, course or skills..."}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        {/* Add Job Form */}
        {showAddJobForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Job Posting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium block mb-1">Job Title</label>
                  <Input placeholder="Enter job title" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Company</label>
                  <Input placeholder="Enter company name" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Location</label>
                  <Input placeholder="Enter job location" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Salary Range</label>
                  <Input placeholder="E.g. $80,000 - $100,000" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Application Deadline</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Required Skills</label>
                  <Input placeholder="E.g. JavaScript, React, Node.js" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium block mb-1">Job Description</label>
                  <textarea 
                    className="w-full p-2 border rounded-md min-h-[100px]"
                    placeholder="Enter detailed job description"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-2">
                <Button variant="outline" onClick={() => setShowAddJobForm(false)}>Cancel</Button>
                <Button onClick={handleAddJob}>Add Job</Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Tab Contents */}
        <TabsContent value="jobs" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Building className="h-4 w-4" />
                        {job.company} • {job.location}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {job.applicants} Applicants
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <p className="text-sm leading-relaxed">{job.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Deadline: {job.deadline}
                      </div>
                      <div className="mx-2">•</div>
                      <div>{job.salary}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">
                    Edit Posting
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="candidates" className="mt-0">
          <div className="border rounded-md overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/40 font-medium text-sm">
              <div className="col-span-3">Candidate</div>
              <div className="col-span-3">Course & Graduation</div>
              <div className="col-span-3">Skills</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            
            <div className="divide-y">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/20">
                  <div className="col-span-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {candidate.name.split(' ').map(part => part[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {candidate.applications} Applications • {candidate.interviews} Interviews
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
                      <div>
                        <div>{candidate.course}</div>
                        <div className="text-sm text-muted-foreground">
                          Class of {candidate.graduation}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    {getCandidateStatusBadge(candidate.status)}
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Analytics</CardTitle>
                <CardDescription>This feature is coming soon. It will provide detailed charts and metrics about placement trends.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center p-12">
                <div className="text-center">
                  <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Analytics Dashboard Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md">
                    Our team is working on implementing comprehensive placement analytics 
                    with visualizations for placement rates, salary trends, and industry breakdowns.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlacementPanel;
