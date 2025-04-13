
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Video, 
  Upload, 
  Folder, 
  Image, 
  File,
  Check,
  AlertCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const ContentLibrary = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFolder, setSelectedFolder] = useState("documents");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to array
      const fileArray = Array.from(e.target.files);
      
      // Check file size (max 50MB)
      const oversizedFiles = fileArray.filter(file => file.size > 50 * 1024 * 1024);
      
      if (oversizedFiles.length > 0) {
        toast.error("Some files exceed the 50MB limit and were not added");
        const validFiles = fileArray.filter(file => file.size <= 50 * 1024 * 1024);
        setSelectedFiles([...selectedFiles, ...validFiles]);
      } else {
        setSelectedFiles([...selectedFiles, ...fileArray]);
      }
    }
  };
  
  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }
    
    setUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        setSelectedFiles([]);
        setUploadProgress(0);
        toast.success("Files uploaded successfully");
      }
    }, 500);
  };
  
  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };
  
  const getFileIcon = (file: File) => {
    const fileType = file.type;
    
    if (fileType.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else if (fileType.includes("doc")) {
      return <FileText className="h-5 w-5 text-blue-500" />;
    } else if (fileType.includes("image")) {
      return <Image className="h-5 w-5 text-purple-500" />;
    } else if (fileType.includes("video")) {
      return <Video className="h-5 w-5 text-green-500" />;
    } else {
      return <File className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Library</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Folder className="h-4 w-4" />
          New Folder
        </Button>
      </div>
      
      <Tabs defaultValue="documents" onValueChange={setSelectedFolder}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="documents">Documents & PDFs</TabsTrigger>
          <TabsTrigger value="videos">Video Lectures</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes & Assessments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Upload Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Drag files or click to upload</h3>
                  <p className="text-sm text-muted-foreground mt-2">PDF, DOC, TXT (Max 50MB)</p>
                  <Input 
                    id="file-upload" 
                    type="file" 
                    multiple 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                </div>
                
                {selectedFiles.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium">Selected Files ({selectedFiles.length})</h3>
                    <div className="max-h-60 overflow-y-auto space-y-2 p-2 border rounded-md">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center gap-2">
                            {getFileIcon(file)}
                            <span className="text-sm truncate max-w-[200px] md:max-w-[400px]">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveFile(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || uploading}
              >
                {uploading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Materials
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">Recent Uploads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* These would come from your database in a real app */}
              <Card className="overflow-hidden">
                <div className="bg-blue-100 p-8 flex justify-center">
                  <FileText className="h-12 w-12 text-blue-700" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">Course Introduction.pdf</h3>
                  <p className="text-sm text-gray-500">Uploaded on April 10, 2023</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="bg-red-100 p-8 flex justify-center">
                  <FileText className="h-12 w-12 text-red-700" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">Week 1 - Reading Materials.pdf</h3>
                  <p className="text-sm text-gray-500">Uploaded on April 8, 2023</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="bg-green-100 p-8 flex justify-center">
                  <FileText className="h-12 w-12 text-green-700" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">Assignment Guidelines.docx</h3>
                  <p className="text-sm text-gray-500">Uploaded on April 5, 2023</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Upload Video Lectures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => document.getElementById("video-upload")?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Drag video files or click to upload</h3>
                  <p className="text-sm text-muted-foreground mt-2">MP4, MOV, WEBM (Max 1GB)</p>
                  <Input 
                    id="video-upload" 
                    type="file" 
                    multiple 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".mp4,.mov,.webm"
                  />
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Video Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="text-sm font-medium block mb-1">
                        Video Title
                      </label>
                      <Input id="title" placeholder="Enter video title" />
                    </div>
                    <div>
                      <label htmlFor="description" className="text-sm font-medium block mb-1">
                        Description
                      </label>
                      <textarea 
                        id="description" 
                        placeholder="Enter video description" 
                        className="w-full p-2 border rounded-md" 
                        rows={3}
                      />
                    </div>
                    <div>
                      <label htmlFor="course" className="text-sm font-medium block mb-1">
                        Related Course
                      </label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Data Structures and Algorithms</option>
                        <option>Web Development</option>
                        <option>Machine Learning Fundamentals</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">Your Video Lectures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                  <Video className="h-16 w-16 text-gray-400" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm">Play</Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">Introduction to Data Structures</h3>
                  <p className="text-sm text-gray-500">Duration: 45 minutes</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                  <Video className="h-16 w-16 text-gray-400" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm">Play</Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">Algorithms Performance Analysis</h3>
                  <p className="text-sm text-gray-500">Duration: 52 minutes</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="quizzes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                Create Quiz or Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="quiz-title" className="text-sm font-medium block mb-1">
                    Quiz Title
                  </label>
                  <Input id="quiz-title" placeholder="Enter quiz title" />
                </div>
                
                <div>
                  <label htmlFor="quiz-type" className="text-sm font-medium block mb-1">
                    Quiz Type
                  </label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Multiple Choice</option>
                    <option>True/False</option>
                    <option>Short Answer</option>
                    <option>Essay</option>
                    <option>Coding Challenge</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Time Limit
                  </label>
                  <div className="flex items-center gap-2">
                    <Input type="number" placeholder="Minutes" className="w-24" />
                    <span>minutes</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Available From
                  </label>
                  <div className="flex items-center gap-4">
                    <Input type="date" />
                    <Input type="time" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Available Until
                  </label>
                  <div className="flex items-center gap-4">
                    <Input type="date" />
                    <Input type="time" />
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Quiz Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="shuffle" />
                      <label htmlFor="shuffle">Shuffle questions</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="show-results" />
                      <label htmlFor="show-results">Show results immediately</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="multiple-attempts" />
                      <label htmlFor="multiple-attempts">Allow multiple attempts</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Add Questions</Button>
              <Button>Create Quiz</Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">Your Quizzes & Assessments</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Data Structures Midterm Quiz</h3>
                    <p className="text-sm text-gray-500">15 questions • 45 minutes</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Algorithm Analysis Weekly Test</h3>
                    <p className="text-sm text-gray-500">8 questions • 20 minutes</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Final Programming Challenge</h3>
                    <p className="text-sm text-gray-500">Coding Assessment • 120 minutes</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentLibrary;
