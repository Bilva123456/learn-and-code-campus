
import {
  BookOpen,
  Code,
  GraduationCap,
  BarChart3,
  Users,
  Award,
  FileText,
  Bot,
  Code2,
  Users2,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const WebsiteInfo = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50" id="about">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About Campus Bridge</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            An integrated academic LMS and coding skill development platform designed to enhance
            the learning experience for university students and faculty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-campus-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2">Comprehensive LMS</h3>
            <p className="text-gray-600">
              Access and manage academic courses, lecture materials, assignments, and track attendance all in one place.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-campus-teal" />
            </div>
            <h3 className="text-xl font-bold mb-2">Coding Development</h3>
            <p className="text-gray-600">
              Practice coding with an integrated compiler supporting multiple languages, structured learning paths, and problem-solving tracks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <Bot className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Assistant</h3>
            <p className="text-gray-600">
              Get real-time code hints, debugging assistance, and personalized learning recommendations powered by advanced AI.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Users2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Collaborative Learning</h3>
            <p className="text-gray-600">
              Work together with peers in live group code rooms for pair programming and collaborative problem-solving.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-campus-orange" />
            </div>
            <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
            <p className="text-gray-600">
              Track your progress with detailed analytics, including skill heatmaps, performance metrics, and improvement suggestions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Achievements & Gamification</h3>
            <p className="text-gray-600">
              Stay motivated with badges, weekly streaks, and a rewarding achievement system that recognizes your progress.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center">Key User Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-r border-gray-200 pr-6 last:border-r-0 last:pr-0">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-6 w-6 text-campus-blue mr-3" />
                <h3 className="text-xl font-bold">Student Interface</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-blue"></div>
                  </div>
                  Access academic courses and materials
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-blue"></div>
                  </div>
                  Practice coding in multiple languages
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-blue"></div>
                  </div>
                  Track personal achievements and progress
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-blue"></div>
                  </div>
                  Collaborate with peers in group coding rooms
                </li>
              </ul>
            </div>

            <div className="border-r border-gray-200 px-6 last:border-r-0 last:pr-0 md:border-r">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-campus-teal mr-3" />
                <h3 className="text-xl font-bold">Faculty Panel</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <div className="rounded-full bg-teal-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-teal"></div>
                  </div>
                  Create and manage course content
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-teal-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-teal"></div>
                  </div>
                  Design coding assignments with test cases
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-teal-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-teal"></div>
                  </div>
                  Track student progress and attendance
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-teal-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-teal"></div>
                  </div>
                  Analyze student performance metrics
                </li>
              </ul>
            </div>

            <div className="pl-6 last:pl-0">
              <div className="flex items-center mb-4">
                <Layers className="h-6 w-6 text-campus-orange mr-3" />
                <h3 className="text-xl font-bold">Admin Panel</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-orange"></div>
                  </div>
                  Manage user accounts and access control
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-orange"></div>
                  </div>
                  Monitor platform-wide metrics and usage
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-orange"></div>
                  </div>
                  Oversee placement activities and job matching
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-orange-100 p-1 mr-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-campus-orange"></div>
                  </div>
                  Generate academic and coding performance reports
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            className="bg-campus-blue hover:bg-blue-700 px-8"
            onClick={() => navigate("/signin")}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WebsiteInfo;
