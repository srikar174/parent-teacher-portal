"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BarChart, Download, GraduationCap, LineChart, Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"

// Sample student data
const students = [
  {
    id: 1,
    name: "Emma Johnson",
    grade: "5th Grade",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EJ",
  },
  {
    id: 2,
    name: "Noah Smith",
    grade: "5th Grade",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "NS",
  },
]

// Sample grades data
const grades = [
  { subject: "Math", current: 95, previous: 92, grade: "A", teacher: "Mr. Smith" },
  { subject: "Science", current: 88, previous: 85, grade: "B+", teacher: "Ms. Johnson" },
  { subject: "English", current: 92, previous: 90, grade: "A-", teacher: "Mrs. Davis" },
  { subject: "History", current: 85, previous: 82, grade: "B", teacher: "Mr. Wilson" },
  { subject: "Art", current: 98, previous: 95, grade: "A+", teacher: "Ms. Roberts" },
]

// Sample attendance data
const attendance = [
  { date: "2024-03-01", status: "Present", notes: "" },
  { date: "2024-03-02", status: "Present", notes: "" },
  { date: "2024-03-03", status: "Absent", notes: "Doctor's appointment" },
  { date: "2024-03-04", status: "Present", notes: "" },
  { date: "2024-03-05", status: "Late", notes: "Arrived 15 minutes late" },
  { date: "2024-03-08", status: "Present", notes: "" },
  { date: "2024-03-09", status: "Present", notes: "" },
  { date: "2024-03-10", status: "Present", notes: "" },
]

export default function StudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState(students[0])
  const [activeTab, setActiveTab] = useState("progress")

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
      <PageHeader title="Students" description="View student progress, grades, and attendance" />

      <div className="flex flex-col space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Student Information</CardTitle>
              <div className="w-full sm:w-[180px]">
                <Select
                  value={selectedStudent.id.toString()}
                  onValueChange={(value) => {
                    const student = students.find((s) => s.id.toString() === value)
                    if (student) setSelectedStudent(student)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardDescription>View and track student performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="h-16 w-16 shrink-0">
                <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                <AvatarFallback>{selectedStudent.initials}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium">{selectedStudent.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedStudent.grade}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                  <Badge variant="outline">Student ID: {selectedStudent.id}</Badge>
                  <Badge variant="outline">2023-2024</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full sm:w-auto flex overflow-x-auto whitespace-nowrap no-scrollbar pb-1">
            <TabsTrigger value="progress" className="flex-1 sm:flex-initial">
              Progress
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex-1 sm:flex-initial">
              Grades
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex-1 sm:flex-initial">
              Attendance
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex-1 sm:flex-initial">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Academic Progress</CardTitle>
                <CardDescription>Current semester performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {grades.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{subject.subject}</span>
                        </div>
                        <span className="text-sm font-medium">
                          {subject.grade} ({subject.current}%)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={subject.current} className="h-2" />
                        <span className="text-xs text-muted-foreground w-12">{subject.current}%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {subject.current > subject.previous ? (
                          <span className="text-green-500">
                            ↑ {subject.current - subject.previous}% improvement from last term
                          </span>
                        ) : subject.current < subject.previous ? (
                          <span className="text-red-500">
                            ↓ {subject.previous - subject.current}% decrease from last term
                          </span>
                        ) : (
                          <span>No change from last term</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
                <div>
                  <CardTitle>Grade Report</CardTitle>
                  <CardDescription>Current academic year</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium mb-4">Current Term Grades</h4>
                    <div className="rounded-md border overflow-x-auto">
                      <div className="min-w-[600px]">
                        <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                          <div>Subject</div>
                          <div>Grade</div>
                          <div>Percentage</div>
                          <div>Teacher</div>
                        </div>
                        {grades.map((subject) => (
                          <div key={subject.subject} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
                            <div>{subject.subject}</div>
                            <div>{subject.grade}</div>
                            <div>{subject.current}%</div>
                            <div>{subject.teacher}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-4">Grade Trends</h4>
                    <div className="h-[200px] flex items-center justify-center rounded-md border border-dashed">
                      <div className="flex flex-col items-center space-y-2 text-center">
                        <LineChart className="h-10 w-10 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Grade trend visualization would appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
                <div>
                  <CardTitle>Attendance Record</CardTitle>
                  <CardDescription>Current academic year</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                  <div className="w-full sm:w-[120px]">
                    <Select defaultValue="march">
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="january">January</SelectItem>
                        <SelectItem value="february">February</SelectItem>
                        <SelectItem value="march">March</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div className="flex flex-col items-center p-4 rounded-lg bg-green-100 dark:bg-green-900/20">
                      <span className="font-medium text-2xl">18</span>
                      <span className="text-muted-foreground">Present</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg bg-red-100 dark:bg-red-900/20">
                      <span className="font-medium text-2xl">2</span>
                      <span className="text-muted-foreground">Absent</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                      <span className="font-medium text-2xl">1</span>
                      <span className="text-muted-foreground">Late</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                      <span className="font-medium text-2xl">95%</span>
                      <span className="text-muted-foreground">Attendance Rate</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-4">Recent Attendance</h4>
                    <div className="rounded-md border overflow-x-auto">
                      <div className="min-w-[500px]">
                        <div className="grid grid-cols-3 gap-4 p-4 font-medium border-b">
                          <div>Date</div>
                          <div>Status</div>
                          <div>Notes</div>
                        </div>
                        {attendance.map((record, index) => (
                          <div key={index} className="grid grid-cols-3 gap-4 p-4 border-b last:border-0">
                            <div>{new Date(record.date).toLocaleDateString()}</div>
                            <div>
                              {record.status === "Present" && (
                                <Badge variant="outline" className="bg-green-100 dark:bg-green-900/20">
                                  Present
                                </Badge>
                              )}
                              {record.status === "Absent" && (
                                <Badge variant="outline" className="bg-red-100 dark:bg-red-900/20">
                                  Absent
                                </Badge>
                              )}
                              {record.status === "Late" && (
                                <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900/20">
                                  Late
                                </Badge>
                              )}
                            </div>
                            <div>{record.notes || "-"}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Academic Reports</CardTitle>
                <CardDescription>Download and view student reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-2">
                        <BarChart className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium">Q1 Progress Report</h4>
                          <p className="text-xs text-muted-foreground">September - November 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-2">
                        <BarChart className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium">Q2 Progress Report</h4>
                          <p className="text-xs text-muted-foreground">December - February 2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium">Teacher Comments</h4>
                          <p className="text-xs text-muted-foreground">March 2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

