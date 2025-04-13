import { Link } from "react-router-dom";
import MainNav from "@/components/navigation/MainNav";
import Footer from "@/components/navigation/Footer";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Code, 
  BarChart, 
  GraduationCap,
  Users,
  Monitor,
  CheckCircle,
  ArrowRight,
  Terminal,
  FileText,
  Award,
  Calendar,
  LineChart,
  PieChart,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-campus-blue to-campus-teal py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Advanced Student Analytics for Better Academic Outcomes
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Comprehensive analytics platform that combines academic performance tracking with coding skill development metrics for data-driven education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-campus-blue hover:bg-gray-100"
                asChild
              >
                <Link to="/signin">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block absolute right-0 bottom-0 w-1/3 h-full">
          {/* We would add an illustration or image here in production */}
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Analytics Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track performance metrics and gain insights to improve student learning outcomes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-5 flex items-center justify-center">
                  <div className="rounded-full bg-blue-100 p-3">
                    <LineChart className="h-8 w-8 text-campus-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  Performance Tracking
                </h3>
                <p className="text-gray-600 text-center">
                  Monitor student performance trends over time with detailed analytics dashboards.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-5 flex items-center justify-center">
                  <div className="rounded-full bg-teal-100 p-3">
                    <Code className="h-8 w-8 text-campus-teal" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  Coding Skills Analysis
                </h3>
                <p className="text-gray-600 text-center">
                  Detailed metrics on coding proficiency across multiple languages and skill categories.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-5 flex items-center justify-center">
                  <div className="rounded-full bg-orange-100 p-3">
                    <BarChart3 className="h-8 w-8 text-campus-orange" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  Data Visualization
                </h3>
                <p className="text-gray-600 text-center">
                  Interactive charts and graphs to visualize student progress and identify trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* For Faculty Section - Analytics Dashboard Preview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Advanced Analytics for Educators</h2>
              <div className="space-y-5">
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-campus-blue mr-3 flex-shrink-0" />
                  <p>Track individual and class-level performance metrics in real-time</p>
                </div>
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-campus-blue mr-3 flex-shrink-0" />
                  <p>Identify students who need additional support with early warning indicators</p>
                </div>
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-campus-blue mr-3 flex-shrink-0" />
                  <p>Monitor attendance patterns and engagement levels across courses</p>
                </div>
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-campus-blue mr-3 flex-shrink-0" />
                  <p>Assess coding skill development with detailed proficiency breakdowns</p>
                </div>
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-campus-blue mr-3 flex-shrink-0" />
                  <p>Generate customized reports for department meetings and accreditation</p>
                </div>
              </div>
              <Button className="mt-8 bg-campus-blue hover:bg-blue-700">
                Faculty Analytics Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-campus-blue" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-xl">Analytics Dashboard</h3>
                    <p className="text-sm text-gray-500">Real-time performance metrics</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium mb-1">Class Average</div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-campus-blue">82%</span>
                      <span className="text-xs text-green-500 ml-2 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        3.2%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium mb-1">Attendance</div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-campus-teal">88%</span>
                      <span className="text-xs text-red-500 ml-2">-1.5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Skills Distribution</div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Problem Solving</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Coding Speed</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Debugging</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-1.5" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="text-gray-500">25 Students Enrolled</div>
                  <div className="text-campus-blue font-medium">View Details →</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* For Students Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <div className="bg-gray-50 rounded-xl shadow-xl p-6 w-full max-w-md">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                    <PieChart className="h-6 w-6 text-campus-teal" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-xl">Student Progress Portal</h3>
                    <p className="text-sm text-gray-500">Personal performance tracking</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="text-sm font-medium mb-3">Current Performance</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-md">
                      <div className="text-xs text-gray-500">Course Average</div>
                      <div className="text-lg font-bold text-campus-blue">85%</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <div className="text-xs text-gray-500">Weekly Progress</div>
                      <div className="text-lg font-bold text-green-600">+12%</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Skill Growth</div>
                    <div className="text-xs text-campus-blue">Last 30 days</div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Algorithm Knowledge</span>
                        <span className="text-green-600">↑ 15%</span>
                      </div>
                      <Progress value={72} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Code Quality</span>
                        <span className="text-green-600">↑ 8%</span>
                      </div>
                      <Progress value={70} className="h-1.5" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <Award className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">12 Days Streak</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">View All Skills</Button>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">Student Progress Insights</h2>
              <div className="space-y-5">
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-campus-teal mr-3 flex-shrink-0" />
                  <p>Track your individual performance metrics and compare to class averages</p>
                </div>
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-campus-teal mr-3 flex-shrink-0" />
                  <p>Identify personal strengths and areas for improvement with skill breakdowns</p>
                </div>
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-campus-teal mr-3 flex-shrink-0" />
                  <p>Monitor your coding skill development across multiple languages</p>
                </div>
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-campus-teal mr-3 flex-shrink-0" />
                  <p>Set personalized learning goals based on performance data</p>
                </div>
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-campus-teal mr-3 flex-shrink-0" />
                  <p>Receive tailored recommendations for practice exercises and resources</p>
                </div>
              </div>
              <Button className="mt-8 bg-campus-teal hover:bg-teal-700">
                Student Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-campus-blue py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Educational Analytics?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join Campus Bridge today and unlock powerful insights to improve student outcomes and drive academic success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-campus-blue hover:bg-gray-100"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
