import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Calendar, Flame, Star, Trophy, TrendingUp, CheckCircle, Lock } from "lucide-react";

const Achievements = () => {
  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">My Achievements</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Current Streak"
          value="5 days"
          description="Keep it up!"
          icon={<Flame className="h-6 w-6 text-orange-500" />}
          color="bg-orange-100"
        />
        <StatsCard 
          title="Longest Streak"
          value="14 days"
          description="Your personal best"
          icon={<Trophy className="h-6 w-6 text-yellow-500" />}
          color="bg-yellow-100"
        />
        <StatsCard 
          title="Total XP"
          value="2,450"
          description="Level 8"
          icon={<Star className="h-6 w-6 text-blue-500" />}
          color="bg-blue-100"
        />
      </div>
      
      <Tabs defaultValue="badges">
        <TabsList className="mb-6 grid grid-cols-3 max-w-md">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="badges">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BadgeCard 
              title="Code Novice"
              description="Complete your first coding challenge"
              icon={<Award className="h-10 w-10 text-blue-500" />}
              earned={true}
              date="April 5, 2025"
            />
            <BadgeCard 
              title="Python Master"
              description="Complete 50 Python challenges"
              icon={<Award className="h-10 w-10 text-green-500" />}
              earned={true}
              date="April 8, 2025"
              progress={100}
            />
            <BadgeCard 
              title="Algorithm Ace"
              description="Solve 25 algorithmic problems"
              icon={<Award className="h-10 w-10 text-purple-500" />}
              earned={false}
              progress={68}
              total={25}
              current={17}
            />
            <BadgeCard 
              title="Perfect Attendance"
              description="Attend all lectures for a course"
              icon={<Award className="h-10 w-10 text-cyan-500" />}
              earned={true}
              date="March 30, 2025"
            />
            <BadgeCard 
              title="Team Player"
              description="Complete 5 group projects"
              icon={<Award className="h-10 w-10 text-orange-500" />}
              earned={false}
              progress={60}
              total={5}
              current={3}
            />
            <BadgeCard 
              title="Early Bird"
              description="Submit 10 assignments before deadline"
              icon={<Award className="h-10 w-10 text-amber-500" />}
              earned={false}
              progress={40}
              total={10}
              current={4}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>Course Leaderboard</CardTitle>
              <CardDescription>Top performers in your current courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", course: "Database Systems", points: 2840, rank: 1 },
                  { name: "John Doe", course: "Web Development", points: 2450, rank: 2 },
                  { name: "Emily Chen", course: "Algorithms", points: 2320, rank: 3 },
                  { name: "Michael Brown", course: "Database Systems", points: 2290, rank: 4 },
                  { name: "Jessica Taylor", course: "Web Development", points: 2150, rank: 5 },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`h-8 w-8 flex items-center justify-center rounded-full ${
                        user.rank === 1 ? "bg-yellow-100 text-yellow-700" : 
                        user.rank === 2 ? "bg-gray-100 text-gray-700" : 
                        user.rank === 3 ? "bg-orange-100 text-orange-700" : 
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {user.rank}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{user.points} XP</p>
                      <Badge variant={user.rank <= 3 ? "default" : "outline"}>
                        {user.rank === 1 ? "Gold" : user.rank === 2 ? "Silver" : user.rank === 3 ? "Bronze" : `Rank ${user.rank}`}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Progress</CardTitle>
                <CardDescription>Track your progress across different programming skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: "Problem Solving", progress: 75 },
                    { skill: "Python", progress: 82 },
                    { skill: "Java", progress: 45 },
                    { skill: "Algorithms", progress: 60 },
                    { skill: "Data Structures", progress: 68 },
                  ].map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{skill.skill}</p>
                        <p className="text-sm text-muted-foreground">{skill.progress}%</p>
                      </div>
                      <Progress value={skill.progress} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Activity</CardTitle>
                <CardDescription>Your learning activity over the past months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-end justify-between px-2">
                  {[65, 40, 75, 50, 80, 95, 60, 45, 70, 55, 85, 90].map((height, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        className="w-6 bg-campus-blue rounded-t-sm" 
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs mt-1">{["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const StatsCard = ({ title, value, description, icon, color }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={`${color} p-3 rounded-full`}>
            {icon}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-end">
              <h3 className="text-2xl font-bold">{value}</h3>
              <p className="text-xs text-muted-foreground ml-2 mb-1">{description}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface BadgeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  date?: string;
  progress?: number;
  total?: number;
  current?: number;
}

const BadgeCard = ({ title, description, icon, earned, date, progress, total, current }: BadgeCardProps) => {
  return (
    <Card className={`border-2 ${earned ? "border-green-200" : "border-gray-200"}`}>
      <CardContent className="pt-6 pb-4 px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 relative">
            <div className={`p-4 rounded-full ${earned ? "bg-green-100" : "bg-gray-100"}`}>
              {earned ? icon : <Lock className="h-10 w-10 text-gray-400" />}
            </div>
            {earned && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {description}
          </p>
          
          {earned ? (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Earned on {date}</span>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{current}/{total}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievements;
