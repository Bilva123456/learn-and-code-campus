import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  GraduationCap,
  BookOpen,
  Shield,
  Lock,
  Mail,
  ArrowLeft,
} from "lucide-react";

// Define schemas for form validation
const baseSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const studentSchema = baseSchema.extend({});

const facultySchema = baseSchema.extend({
  facultyId: z.string().min(3, "Faculty ID must be at least 3 characters"),
});

const adminSchema = baseSchema.extend({
  adminCode: z.string().min(6, "Admin code must be at least 6 characters"),
});

const SignInPage = () => {
  const [activeTab, setActiveTab] = useState("student");
  const navigate = useNavigate();

  // Student form
  const studentForm = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Faculty form
  const facultyForm = useForm<z.infer<typeof facultySchema>>({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      email: "",
      password: "",
      facultyId: "",
    },
  });

  // Admin form
  const adminForm = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: "",
      password: "",
      adminCode: "",
    },
  });

  // Form submission handlers
  const onStudentSubmit = (values: z.infer<typeof studentSchema>) => {
    console.log("Student sign in:", values);
    toast.success("Student sign in successful", {
      description: "Redirecting to dashboard...",
    });
    
    // Set authentication state and user role
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("userRole", "student");
    
    // For now, we'll just redirect to the dashboard after a short delay
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const onFacultySubmit = (values: z.infer<typeof facultySchema>) => {
    console.log("Faculty sign in:", values);
    toast.success("Faculty sign in successful", {
      description: "Redirecting to faculty portal...",
    });
    
    // Set authentication state and user role
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("userRole", "faculty");
    
    setTimeout(() => navigate("/faculty"), 1500);
  };

  const onAdminSubmit = (values: z.infer<typeof adminSchema>) => {
    console.log("Admin sign in:", values);
    toast.success("Admin sign in successful", {
      description: "Redirecting to admin dashboard...",
    });
    
    // Set authentication state and user role
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("userRole", "admin");
    
    setTimeout(() => navigate("/admin"), 1500);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-campus-blue hover:text-campus-teal transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Choose your account type to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="student" className="flex items-center justify-center">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="faculty" className="flex items-center justify-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Faculty
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center justify-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>
              
              {/* Student Sign In Form */}
              <TabsContent value="student">
                <Form {...studentForm}>
                  <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-4">
                    <FormField
                      control={studentForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input className="pl-10" placeholder="student@example.com" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={studentForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                className="pl-10" 
                                type="password" 
                                placeholder="••••••••" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-campus-blue hover:bg-blue-700"
                    >
                      Sign In as Student
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              {/* Faculty Sign In Form */}
              <TabsContent value="faculty">
                <Form {...facultyForm}>
                  <form onSubmit={facultyForm.handleSubmit(onFacultySubmit)} className="space-y-4">
                    <FormField
                      control={facultyForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input className="pl-10" placeholder="faculty@example.com" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={facultyForm.control}
                      name="facultyId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Faculty ID</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input className="pl-10" placeholder="FAC12345" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={facultyForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                className="pl-10" 
                                type="password" 
                                placeholder="••••••••" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-campus-teal hover:bg-teal-700"
                    >
                      Sign In as Faculty
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              {/* Admin Sign In Form */}
              <TabsContent value="admin">
                <Form {...adminForm}>
                  <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className="space-y-4">
                    <FormField
                      control={adminForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input className="pl-10" placeholder="admin@example.com" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={adminForm.control}
                      name="adminCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admin Code</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input className="pl-10" placeholder="ADMIN-ACCESS-CODE" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={adminForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                className="pl-10" 
                                type="password" 
                                placeholder="••••••••" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-campus-orange hover:bg-orange-700"
                    >
                      Sign In as Admin
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-gray-500">
              Don't have an account? <a href="#" className="text-campus-blue hover:underline">Create one</a>
            </div>
            <div className="text-sm text-center text-gray-500">
              <a href="#" className="text-campus-blue hover:underline">Forgot password?</a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
