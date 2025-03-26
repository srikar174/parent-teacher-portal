"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, FileText, Search, Video } from "lucide-react"
import { PageHeader } from "@/components/page-header"

// Sample resources data
const resources = [
  {
    id: 1,
    title: "Math Practice Worksheets",
    type: "document",
    subject: "Math",
    grade: "5th Grade",
    date: "2024-03-10",
    description: "Practice worksheets for fractions and decimals",
  },
  {
    id: 2,
    title: "Science Project Guidelines",
    type: "document",
    subject: "Science",
    grade: "5th Grade",
    date: "2024-03-05",
    description: "Guidelines for the upcoming renewable energy project",
  },
  {
    id: 3,
    title: "Reading List for Summer",
    type: "document",
    subject: "English",
    grade: "5th Grade",
    date: "2024-03-01",
    description: "Recommended books for summer reading",
  },
  {
    id: 4,
    title: "Introduction to Fractions",
    type: "video",
    subject: "Math",
    grade: "5th Grade",
    date: "2024-02-20",
    description: "Video tutorial explaining fractions concepts",
  },
  {
    id: 5,
    title: "Solar System Interactive Model",
    type: "interactive",
    subject: "Science",
    grade: "5th Grade",
    date: "2024-02-15",
    description: "Interactive model of the solar system",
  },
]

// Resource card component
function ResourceCard({ resource }: { resource: any }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base line-clamp-1">{resource.title}</CardTitle>
            <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
          </div>
          {resource.type === "document" && <FileText className="h-5 w-5 text-muted-foreground shrink-0 ml-2" />}
          {resource.type === "video" && <Video className="h-5 w-5 text-muted-foreground shrink-0 ml-2" />}
          {resource.type === "interactive" && <BookOpen className="h-5 w-5 text-muted-foreground shrink-0 ml-2" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="secondary">{resource.subject}</Badge>
          <Badge variant="outline">{resource.grade}</Badge>
          <Badge variant="outline">{resource.type}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">Added on {new Date(resource.date).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter resources based on search query
  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
      <PageHeader title="Resources" description="Educational materials shared by teachers" />

      <div className="flex flex-col space-y-6">
        <div className="w-full">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full sm:w-auto flex overflow-x-auto whitespace-nowrap no-scrollbar pb-1">
            <TabsTrigger value="all" className="flex-1 sm:flex-initial">
              All Resources
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex-1 sm:flex-initial">
              Documents
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex-1 sm:flex-initial">
              Videos
            </TabsTrigger>
            <TabsTrigger value="interactive" className="flex-1 sm:flex-initial">
              Interactive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
              {filteredResources.length === 0 && (
                <div className="col-span-full flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No resources found</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources
                .filter((resource) => resource.type === "document")
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              {filteredResources.filter((r) => r.type === "document").length === 0 && (
                <div className="col-span-full flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No document resources found</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources
                .filter((resource) => resource.type === "video")
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              {filteredResources.filter((r) => r.type === "video").length === 0 && (
                <div className="col-span-full flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <Video className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No video resources found</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="interactive" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources
                .filter((resource) => resource.type === "interactive")
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              {filteredResources.filter((r) => r.type === "interactive").length === 0 && (
                <div className="col-span-full flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No interactive resources found</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

