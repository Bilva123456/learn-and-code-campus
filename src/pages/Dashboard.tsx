
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Code, 
  Award, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Flame,
  File
} from "lucide-react";
import { 
  recentActivitiesData, 
  coursesData, 
  weeklyStreakData,
  skillProgressData,
  codingTracksData
} from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Course Metric */}
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Enrolled Courses</p>
              <p className="text-3xl font-bold">{coursesData.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-campus-blue" />
            </div>
          </CardContent>
        </Card>
        
        {/* Coding Track Metric */}
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Coding Tracks</p>
              <p className="text-3xl font-bold">{codingTracksData.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
              <Code className="h-6 w-6 text-campus-teal" />
            </div>
          </CardContent>
        </Card>
        
        {/* Badges Metric */}
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Badges Earned</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Award className="h-6 w-6 text-campus-orange" />
            </div>
          </CardContent>
        </Card>
        
        {/* Current Streak */}
        <Card>
          <CardContent className="flex flex-row items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
              <p className="text-3xl font-bold">7 days</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <Flame className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Courses */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Active Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coursesData.slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-start bg-gray-50 p-4 rounded-lg">
                  <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-campus-blue" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <a href="/courses" className="text-sm text-campus-blue hover:underline">View all courses</a>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Weekly Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStreakData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Task Completion Rate: <span className="text-campus-blue font-medium">85%</span></p>
            </div>
          </CardContent>
        </Card>
        
        {/* Coding Practice */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Coding Practice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {codingTracksData.slice(0, 3).map((track) => (
                <div key={track.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{track.title}</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {track.level}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{track.language}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Problems Solved</span>
                      <span>{track.completedProblems}/{track.totalProblems}</span>
                    </div>
                    <Progress value={(track.completedProblems! / track.totalProblems) * 100} className="h-2" />
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <a href="/practice" className="text-sm text-campus-teal hover:underline">View all tracks</a>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Skill Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Skill Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillProgressData.slice(0, 4).map((skill) => (
                <div key={skill.skill} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{skill.skill}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
              <div className="text-center pt-2">
                <a href="#" className="text-sm text-campus-blue hover:underline">View full skill report</a>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivitiesData.map((activity) => (
                <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100">
                    {activity.type === 'course_progress' && <BookOpen className="h-4 w-4" />}
                    {activity.type === 'coding_challenge' && <Code className="h-4 w-4" />}
                    {activity.type === 'assignment_submission' && <File className="h-4 w-4" />}
                    {activity.type === 'course_enrollment' && <CheckCircle2 className="h-4 w-4" />}
                  </div>
                  <div className="ml-3 flex-1">
                    {activity.type === 'course_progress' && (
                      <p className="text-sm">
                        Completed module <span className="font-medium">{activity.completedModule}</span> in <span className="font-medium">{activity.course}</span>
                      </p>
                    )}
                    {activity.type === 'coding_challenge' && (
                      <p className="text-sm">
                        Solved <span className="font-medium">{activity.challenge}</span> coding challenge in <span className="font-medium">{activity.language}</span> with <span className="text-green-600 font-medium">{activity.result}</span>
                      </p>
                    )}
                    {activity.type === 'assignment_submission' && (
                      <p className="text-sm">
                        Submitted <span className="font-medium">{activity.assignment}</span> for <span className="font-medium">{activity.course}</span>
                      </p>
                    )}
                    {activity.type === 'course_enrollment' && (
                      <p className="text-sm">
                        Enrolled in <span className="font-medium">{activity.course}</span>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {new Date(activity.date).toLocaleDateString()} at {new Date(activity.date).toLocaleTimeString()} 
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
