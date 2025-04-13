
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Code, 
  Check, 
  ChevronRight, 
  Play, 
  ChevronDown, 
  Lightbulb, 
  RefreshCw,
  CircleCheck,
  CircleX,
  AlertTriangle,
  Clock
} from "lucide-react";
import { codingTracksData, codeProblemsData } from "@/data/mockData";

const CodePractice = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("python");
  const [codeValue, setCodeValue] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{ success: boolean; message: string }[] | null>(null);
  
  // Find current problem
  const currentProblem = codeProblemsData.find(problem => problem.id === selectedProblem);
  
  const handleRunCode = () => {
    setIsRunning(true);
    
    // Simulate running code with a delay
    setTimeout(() => {
      setIsRunning(false);
      // Mock test results
      setTestResults([
        { success: true, message: "Test Case 1: Passed" },
        { success: false, message: "Test Case 2: Failed - Expected [1,2], got [2,1]" }
      ]);
    }, 1500);
  };
  
  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId);
    setSelectedProblem(null);
    setTestResults(null);
  };
  
  const handleProblemSelect = (problemId: string) => {
    const problem = codeProblemsData.find(p => p.id === problemId);
    
    if (problem) {
      setSelectedProblem(problemId);
      setCodeValue(problem.starterCode[selectedLanguage] || "// No starter code available for this language");
      setTestResults(null);
    }
  };
  
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    
    if (currentProblem) {
      setCodeValue(currentProblem.starterCode[language] || "// No starter code available for this language");
    }
  };
  
  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">Code Practice</h1>
      
      <Tabs defaultValue="tracks" className="mb-6">
        <TabsList>
          <TabsTrigger value="tracks">Coding Tracks</TabsTrigger>
          <TabsTrigger value="problems">All Problems</TabsTrigger>
          <TabsTrigger value="submissions">My Submissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tracks" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {codingTracksData.map((track) => (
              <Card 
                key={track.id} 
                className={`cursor-pointer transition-all ${selectedTrack === track.id ? 'ring-2 ring-campus-blue' : 'hover:shadow-md'}`}
                onClick={() => handleTrackSelect(track.id)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Code className="h-6 w-6 text-campus-blue" />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      track.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      track.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {track.level}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{track.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{track.language}</p>
                  <p className="text-sm mb-4 line-clamp-2">{track.description}</p>
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{track.completedProblems}/{track.totalProblems} problems</span>
                    </div>
                    <Progress value={(track.completedProblems! / track.totalProblems) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Selected Track Problems */}
          {selectedTrack && (
            <>
              <h2 className="text-xl font-semibold mb-4">
                {codingTracksData.find(track => track.id === selectedTrack)?.title} - Problems
              </h2>
              <div className="space-y-4">
                {codeProblemsData
                  .filter(problem => problem.trackId === selectedTrack)
                  .map((problem) => (
                    <Card 
                      key={problem.id} 
                      className={`cursor-pointer transition-all ${selectedProblem === problem.id ? 'ring-2 ring-campus-blue' : 'hover:bg-gray-50'}`}
                      onClick={() => handleProblemSelect(problem.id)}
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 ${
                            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {problem.difficulty === 'Easy' ? 'E' : problem.difficulty === 'Medium' ? 'M' : 'H'}
                          </div>
                          <div>
                            <h3 className="font-medium">{problem.title}</h3>
                            <p className="text-xs text-muted-foreground">
                              {problem.difficulty} · 
                              <span className="ml-2">Success Rate: 65%</span>
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="problems" className="mt-6">
          <div className="space-y-4">
            {codeProblemsData.map((problem) => (
              <Card 
                key={problem.id} 
                className={`cursor-pointer transition-all ${selectedProblem === problem.id ? 'ring-2 ring-campus-blue' : 'hover:bg-gray-50'}`}
                onClick={() => handleProblemSelect(problem.id)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 ${
                      problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {problem.difficulty === 'Easy' ? 'E' : problem.difficulty === 'Medium' ? 'M' : 'H'}
                    </div>
                    <div>
                      <h3 className="font-medium">{problem.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {problem.difficulty} · 
                        <span className="ml-2">Track: {codingTracksData.find(t => t.id === problem.trackId)?.title}</span>
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="submissions" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-1">No Recent Submissions</h3>
              <p className="text-gray-500 mb-6">Solve coding problems to see your submissions here</p>
              <Button variant="outline">Practice Now</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Problem Workspace */}
      {selectedProblem && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Problem Description */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>{currentProblem?.title}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  currentProblem?.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  currentProblem?.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentProblem?.difficulty}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>{currentProblem?.description}</p>
                
                <h4 className="font-semibold mt-4 mb-2">Examples:</h4>
                {currentProblem?.testCases.map((testCase, index) => (
                  <div key={index} className="mb-4 bg-gray-50 p-3 rounded-md">
                    <p className="font-mono text-sm mb-2">Input: {testCase.input}</p>
                    <p className="font-mono text-sm">Output: {testCase.output}</p>
                  </div>
                ))}
                
                <div className="mt-6 bg-yellow-50 p-3 rounded-md">
                  <h4 className="font-semibold mb-1 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
                    Hints
                  </h4>
                  <ul className="list-disc pl-5 text-sm space-y-2">
                    {currentProblem?.hints.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Code Editor */}
          <div>
            <Card>
              <CardHeader className="pb-2 flex-row justify-between items-center">
                <CardTitle className="text-base">
                  Solution
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select 
                    value={selectedLanguage}
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* This is a simple code editor UI, in a real app you'd use a code editor component like CodeMirror or Monaco Editor */}
                <div className="code-editor-content">
                  <pre><code>{codeValue}</code></pre>
                </div>
              </CardContent>
              <CardFooter className="border-t justify-end space-x-2 py-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (currentProblem) {
                      setCodeValue(currentProblem.starterCode[selectedLanguage]);
                      setTestResults(null);
                    }
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  variant="default" 
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="bg-campus-blue hover:bg-blue-700"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Code
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Test Results */}
            {testResults && (
              <Card className="mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-md flex items-start ${
                          result.success ? 'bg-green-50' : 'bg-red-50'
                        }`}
                      >
                        {result.success ? (
                          <CircleCheck className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                        ) : (
                          <CircleX className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                        )}
                        <span 
                          className={`text-sm ${result.success ? 'text-green-800' : 'text-red-800'}`}
                        >
                          {result.message}
                        </span>
                      </div>
                    ))}
                    
                    <div className="py-2 text-sm">
                      <div className="flex justify-between font-medium">
                        <span>Test Cases Passed:</span>
                        <span>1/2 (50%)</span>
                      </div>
                      <Progress 
                        value={50} 
                        className="h-2 mt-2" 
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-campus-teal hover:bg-teal-700">
                        <Check className="h-4 w-4 mr-2" />
                        Submit Solution
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePractice;
