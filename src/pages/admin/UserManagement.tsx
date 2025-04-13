
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  GraduationCap, 
  UserPlus, 
  Search, 
  Filter, 
  User,
  Shield,
  CheckCircle,
  X,
  MoreHorizontal,
  Download,
  Printer
} from "lucide-react";
import { toast } from "sonner";

// Mock user data
const mockUsers = [
  { 
    id: 1, 
    name: "John Smith", 
    email: "john.smith@example.com", 
    role: "student", 
    department: "Computer Science", 
    status: "active", 
    joinDate: "2023-09-01" 
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    email: "sarah.johnson@example.com", 
    role: "student", 
    department: "Electrical Engineering", 
    status: "active", 
    joinDate: "2023-09-05" 
  },
  { 
    id: 3, 
    name: "Dr. Michael Brown", 
    email: "michael.brown@example.com", 
    role: "faculty", 
    department: "Computer Science", 
    status: "active", 
    joinDate: "2021-01-15" 
  },
  { 
    id: 4, 
    name: "Prof. Emily Davis", 
    email: "emily.davis@example.com", 
    role: "faculty", 
    department: "Mathematics", 
    status: "active", 
    joinDate: "2020-08-10" 
  },
  { 
    id: 5, 
    name: "Alex Wilson", 
    email: "alex.wilson@example.com", 
    role: "admin", 
    department: "IT Department", 
    status: "active", 
    joinDate: "2019-05-20" 
  }
];

const UserManagement = () => {
  const [userType, setUserType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  
  const filteredUsers = mockUsers.filter(user => {
    // Filter by user type
    if (userType !== "all" && user.role !== userType) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const handleAddUser = () => {
    toast.success("User added successfully!");
    setShowAddUserForm(false);
  };
  
  const handleUserAction = (action: string, userId: number) => {
    const user = mockUsers.find(u => u.id === userId);
    if (!user) return;
    
    switch (action) {
      case "edit":
        toast.info(`Editing user: ${user.name}`);
        break;
      case "disable":
        toast.success(`User ${user.name} disabled`);
        break;
      case "delete":
        toast.success(`User ${user.name} deleted`);
        break;
      default:
        break;
    }
  };
  
  const getUserStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" /> Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <X className="h-3 w-3 mr-1" /> Inactive
        </span>
      );
    }
  };
  
  const getUserRoleIcon = (role: string) => {
    switch (role) {
      case "student":
        return <User className="h-4 w-4 text-blue-600" />;
      case "faculty":
        return <GraduationCap className="h-4 w-4 text-green-600" />;
      case "admin":
        return <Shield className="h-4 w-4 text-purple-600" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button onClick={() => setShowAddUserForm(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>
      
      {/* User Filters */}
      <div className="mb-6">
        <Tabs defaultValue="all" onValueChange={setUserType}>
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="student">Students</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="admin">Admins</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by name, email or department..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
      </div>
      
      {/* Add User Form */}
      {showAddUserForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium block mb-1">Full Name</label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Email</label>
                <Input placeholder="Enter email address" type="email" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Role</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Department</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="cs">Computer Science</option>
                  <option value="ee">Electrical Engineering</option>
                  <option value="me">Mechanical Engineering</option>
                  <option value="math">Mathematics</option>
                  <option value="physics">Physics</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Password</label>
                <Input placeholder="Create password" type="password" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Confirm Password</label>
                <Input placeholder="Confirm password" type="password" />
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-2">
              <Button variant="outline" onClick={() => setShowAddUserForm(false)}>Cancel</Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Users Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/40 font-medium text-sm">
              <div className="col-span-4">User</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            
            <div className="divide-y">
              {filteredUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/20">
                  <div className="col-span-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {user.name.split(' ').map(part => part[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-1">
                    {getUserRoleIcon(user.role)}
                    <span className="capitalize">{user.role}</span>
                  </div>
                  <div className="col-span-2">{user.department}</div>
                  <div className="col-span-2">
                    {getUserStatusBadge(user.status)}
                  </div>
                  <div className="col-span-2 flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleUserAction("edit", user.id)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleUserAction("delete", user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
