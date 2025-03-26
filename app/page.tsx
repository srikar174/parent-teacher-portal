import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, MessageSquare, Bell, Users, BookOpen } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"

// Loading fallback for dashboard cards
function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="animate-pulse">
        <div className="h-5 w-1/3 bg-muted rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-muted rounded"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 w-1/4 bg-muted rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-muted rounded mb-4"></div>
        <div className="h-4 w-1/3 bg-muted rounded"></div>
      </CardContent>
    </Card>
  )
}

// Dashboard cards with suspense for better loading experience
function DashboardCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Suspense fallback={<CardSkeleton />}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+2 since yesterday</p>
            <Link href="/messages" className="text-sm text-primary hover:underline mt-2 inline-block">
              View messages
            </Link>
          </CardContent>
        </Card>
      </Suspense>
      <Suspense fallback={<CardSkeleton />}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Parent-Teacher Conference, School Trip</p>
            <Link href="/calendar" className="text-sm text-primary hover:underline mt-2 inline-block">
              View calendar
            </Link>
          </CardContent>
        </Card>
      </Suspense>
      <Suspense fallback={<CardSkeleton />}>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 new since last login</p>
            <Link href="/notifications" className="text-sm text-primary hover:underline mt-2 inline-block">
              View notifications
            </Link>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}

// Student progress card with suspense
function StudentProgressCard() {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <Card>
        <CardHeader>
          <CardTitle>Student Progress</CardTitle>
          <CardDescription>Recent academic performance and attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Math</span>
              </div>
              <span className="text-sm font-medium">A (95%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Science</span>
              </div>
              <span className="text-sm font-medium">B+ (88%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">English</span>
              </div>
              <span className="text-sm font-medium">A- (92%)</span>
            </div>
            <Link href="/students" className="text-sm text-primary hover:underline inline-block">
              View full report
            </Link>
          </div>
        </CardContent>
      </Card>
    </Suspense>
  )
}

// Resources card with suspense
function ResourcesCard() {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>Recently shared educational materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Math Practice Worksheets</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Science Project Guidelines</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Reading List for Summer</span>
            </div>
            <Link href="/resources" className="text-sm text-primary hover:underline inline-block">
              View all resources
            </Link>
          </div>
        </CardContent>
      </Card>
    </Suspense>
  )
}

// Recent activity card with suspense
function RecentActivityCard() {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent interactions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-2 shrink-0">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">New message from Ms. Johnson</p>
                <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-2 shrink-0">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Grade updated for Science</p>
                <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-2 shrink-0">
                <CalendarDays className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Parent-Teacher Conference scheduled</p>
                <p className="text-xs text-muted-foreground">2 days ago at 1:15 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-2 shrink-0">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">New resource shared: Math Practice</p>
                <p className="text-xs text-muted-foreground">3 days ago at 9:20 AM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Suspense>
  )
}

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      <PageHeader title="Dashboard" description="Welcome to your Parent-Teacher Portal dashboard." />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview" className="flex-1 sm:flex-initial">
            Overview
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex-1 sm:flex-initial">
            Recent Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <DashboardCards />
          <div className="grid gap-4 md:grid-cols-2">
            <StudentProgressCard />
            <ResourcesCard />
          </div>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <RecentActivityCard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

