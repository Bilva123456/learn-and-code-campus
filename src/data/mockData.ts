// Types
export interface Course {
  id: string;
  title: string;
  instructor: string;
  department: string;
  description: string;
  image: string;
  progress?: number;
  enrolledStudents?: number;
  createdAt: string;
  updatedAt: string;
  courseCode?: string;
  status?: string;
  maxStudents?: string;
  startDate?: string;
  endDate?: string;
}

export interface CodingTrack {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  description: string;
  totalProblems: number;
  completedProblems?: number;
  image: string;
}

export interface CodeProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  trackId: string;
  starterCode: {
    [key: string]: string;
  };
  testCases: {
    input: string;
    output: string;
  }[];
  hints: string[];
}

// Mock Courses Data
export const coursesData: Course[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    instructor: 'Dr. Alan Turing',
    department: 'Computer Science',
    description: 'Foundational concepts in computing, algorithms, and problem solving.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    progress: 65,
    enrolledStudents: 120,
    createdAt: '2024-03-10T00:00:00.000Z',
    updatedAt: '2024-03-10T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Database Management Systems',
    instructor: 'Dr. Grace Hopper',
    department: 'Information Technology',
    description: 'Comprehensive study of database design, management, and optimization.',
    image: 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8',
    progress: 32,
    enrolledStudents: 85,
    createdAt: '2024-02-15T00:00:00.000Z',
    updatedAt: '2024-02-15T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'Object-Oriented Programming',
    instructor: 'Prof. James Gosling',
    department: 'Computer Science',
    description: 'Deep dive into OOP concepts, design patterns, and best practices.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    progress: 78,
    enrolledStudents: 95,
    createdAt: '2024-01-20T00:00:00.000Z',
    updatedAt: '2024-01-20T00:00:00.000Z',
  },
  {
    id: '4',
    title: 'Web Development Fundamentals',
    instructor: 'Prof. Tim Berners-Lee',
    department: 'Information Technology',
    description: 'Introduction to HTML, CSS, and JavaScript for building web applications.',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613',
    progress: 45,
    enrolledStudents: 150,
    createdAt: '2024-03-01T00:00:00.000Z',
    updatedAt: '2024-03-01T00:00:00.000Z',
  },
];

// Mock Coding Tracks Data
export const codingTracksData: CodingTrack[] = [
  {
    id: '1',
    title: 'Data Structures & Algorithms',
    level: 'Intermediate',
    language: 'Python',
    description: 'Master essential data structures and algorithms for technical interviews.',
    totalProblems: 50,
    completedProblems: 18,
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
  },
  {
    id: '2',
    title: 'Web Development Bootcamp',
    level: 'Beginner',
    language: 'JavaScript',
    description: 'Build responsive websites with modern JavaScript frameworks.',
    totalProblems: 35,
    completedProblems: 12,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  },
  {
    id: '3',
    title: 'Java Programming Masterclass',
    level: 'Intermediate',
    language: 'Java',
    description: 'Comprehensive Java programming from basics to advanced concepts.',
    totalProblems: 45,
    completedProblems: 22,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  },
  {
    id: '4',
    title: 'Competitive Programming',
    level: 'Advanced',
    language: 'C++',
    description: 'Advanced problem-solving techniques for programming competitions.',
    totalProblems: 60,
    completedProblems: 8,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
  },
];

// Mock Code Problems Data
export const codeProblemsData: CodeProblem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    trackId: '1',
    starterCode: {
      'python': `def two_sum(nums, target):
    # Your code here
    pass`,
      'javascript': `function twoSum(nums, target) {
    # Your code here
}`,
      'java': `public int[] twoSum(int[] nums, int target) {
    # Your code here
    return null;
}`,
      'cpp': `vector<int> twoSum(vector<int>& nums, int target) {
    # Your code here
    return {};
}`
    },
    testCases: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      }
    ],
    hints: [
      'A brute force approach would be O(n²), can you do better?',
      'Consider using a hash map to reduce time complexity.',
    ]
  },
  {
    id: '2',
    title: 'Reverse String',
    difficulty: 'Easy',
    description: 'Write a function that reverses a string. The input string is given as an array of characters.',
    trackId: '1',
    starterCode: {
      'python': `def reverse_string(s):
    # Your code here
    pass`,
      'javascript': `function reverseString(s) {
    # Your code here
}`,
      'java': `public void reverseString(char[] s) {
    # Your code here
}`,
      'cpp': `void reverseString(vector<char>& s) {
    # Your code here
}`
    },
    testCases: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    hints: [
      'Try a two-pointer approach.',
      'No need for extra space, can you swap in place?',
    ]
  },
];

// Mock Activity Data for Dashboard
export const recentActivitiesData = [
  {
    id: '1',
    type: 'course_progress',
    course: 'Introduction to Computer Science',
    completedModule: 'Algorithms Basics',
    date: '2024-04-10T14:30:00.000Z',
  },
  {
    id: '2',
    type: 'coding_challenge',
    challenge: 'Two Sum',
    result: 'Success',
    language: 'Python',
    date: '2024-04-09T16:45:00.000Z',
  },
  {
    id: '3',
    type: 'assignment_submission',
    assignment: 'Database Design Project',
    course: 'Database Management Systems',
    date: '2024-04-07T11:20:00.000Z',
  },
  {
    id: '4',
    type: 'course_enrollment',
    course: 'Web Development Fundamentals',
    date: '2024-04-05T09:15:00.000Z',
  },
];

// Mock Weekly Streak Data
export const weeklyStreakData = [
  { day: 'Mon', completed: 3 },
  { day: 'Tue', completed: 5 },
  { day: 'Wed', completed: 2 },
  { day: 'Thu', completed: 7 },
  { day: 'Fri', completed: 4 },
  { day: 'Sat', completed: 0 },
  { day: 'Sun', completed: 1 },
];

// Mock Skill Progress Data
export const skillProgressData = [
  { skill: 'Python', level: 75 },
  { skill: 'Java', level: 40 },
  { skill: 'JavaScript', level: 60 },
  { skill: 'Data Structures', level: 55 },
  { skill: 'Algorithms', level: 50 },
  { skill: 'Web Development', level: 65 },
  { skill: 'Database', level: 45 },
];

// Mock Faculty Course Data
export const facultyCoursesData: Course[] = [
  {
    id: '5',
    title: 'Advanced Programming Paradigms',
    instructor: 'Dr. John Doe',
    department: 'Computer Science',
    description: 'Exploring functional, object-oriented, and procedural programming approaches.',
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2',
    enrolledStudents: 42,
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
    courseCode: 'CS401',
    status: 'Active',
  },
  {
    id: '6',
    title: 'Mobile Application Development',
    instructor: 'Dr. John Doe',
    department: 'Information Technology',
    description: 'Fundamentals of building mobile applications for iOS and Android platforms.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    enrolledStudents: 38,
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-03-25T00:00:00.000Z',
    courseCode: 'IT302',
    status: 'Active',
  },
];
