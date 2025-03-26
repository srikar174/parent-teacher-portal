"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, BookOpen, Calendar, Check, GraduationCap, MessageSquare, Trash2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: "New message from Ms. Johnson",
    description: "About the upcoming science project",
    type: "message",
    date: "2024-03-10T10:30:00",
    read: false,
  },
  {
    id: 2,
    title: "Grade updated for Science",
    description: "Your child's grade has been updated",
    type: "grade",
    date: "2024-03-09T15:45:00",
    read: false,
  },
  {
    id: 3,
    title: "Parent-Teacher Conference scheduled",
    description: "March 15, 2024 at 3:30 PM",
    type: "event",
    date: "2024-03-08T13:15:00",
    read: true,
  },
  {
    id: 4,
    title: "New resource shared: Math Practice",
    description: "Practice worksheets for fractions and decimals",
    type: "resource",
    date: "2024-03-07T09:20:00",
    read: true,
  },
  {
    id: 5,
    title: "Attendance marked: Absent",
    description: "Your child was marked absent on March 3, 2024",
    type: "attendance",
    date: "2024-03-03T16:00:00",
    read: true,
  },
]

// Notification card component
function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
}: {
  notification: any
  onMarkAsRead: (id: number) => void
  onDelete: (id: number) => void
}) {
  return (
    <Card className={notification.read ? "" : "border-primary"}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-primary/10 p-2 shrink-0">
              {notification.type === "message" && <MessageSquare className="h-4 w-4 text-primary" />}
              {notification.type === "grade" && <GraduationCap className="h-4 w-4 text-primary" />}
              {notification.type === "event" && <Calendar className="h-4 w-4 text-primary" />}
              {notification.type === "resource" && <BookOpen className="h-4 w-4 text-primary" />}
              {notification.type === "attendance" && <Bell className="h-4 w-4 text-primary" />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{notification.title}</p>
              <p className="text-xs text-muted-foreground">{notification.description}</p>
              <p className="text-xs text-muted-foreground">{new Date(notification.date).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex space-x-2 shrink-0">
            {!notification.read && (
              <Button variant="ghost" size="icon" onClick={() => onMarkAsRead(notification.id)}>
                <Check className="h-4 w-4" />
                <span className="sr-only">Mark as read</span>
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => onDelete(notification.id)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [activeTab, setActiveTab] = useState("all")

  const markAsRead = (id: number) => {
    setNotificationsList(
      notificationsList.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const deleteNotification = (id: number) => {
    setNotificationsList(notificationsList.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map((notification) => ({ ...notification, read: true })))
  }

  const unreadCount = notificationsList.filter((notification) => !notification.read).length

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
      <PageHeader title="Notifications" description="Stay updated with important information" />

      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="text-lg font-medium">Notifications</span>
            {unreadCount > 0 && <Badge variant="secondary">{unreadCount} unread</Badge>}
          </div>
          <div className="flex items-center">
            <Button variant="outline" size="sm" onClick={markAllAsRead} className="w-full">
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full sm:w-auto flex overflow-x-auto whitespace-nowrap no-scrollbar pb-1">
            <TabsTrigger value="all" className="flex-1 sm:flex-initial">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1 sm:flex-initial">
              Unread
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex-1 sm:flex-initial">
              Messages
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex-1 sm:flex-initial">
              Grades
            </TabsTrigger>
            <TabsTrigger value="events" className="flex-1 sm:flex-initial">
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {notificationsList.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
              {notificationsList.length === 0 && (
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <Bell className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            <div className="space-y-4">
              {notificationsList
                .filter((notification) => !notification.read)
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
              {notificationsList.filter((n) => !n.read).length === 0 && (
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <Bell className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No unread notifications</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <div className="space-y-4">
              {notificationsList
                .filter((notification) => notification.type === "message")
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
              {notificationsList.filter((n) => n.type === "message").length === 0 && (
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <MessageSquare className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No message notifications</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="grades" className="space-y-4">
            <div className="space-y-4">
              {notificationsList
                .filter((notification) => notification.type === "grade")
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
              {notificationsList.filter((n) => n.type === "grade").length === 0 && (
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <GraduationCap className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No grade notifications</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="space-y-4">
              {notificationsList
                .filter((notification) => notification.type === "event")
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
              {notificationsList.filter((n) => n.type === "event").length === 0 && (
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <Calendar className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No event notifications</p>
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

