"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageHeader } from "@/components/page-header"

export default function SettingsPage() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [profileSubmitted, setProfileSubmitted] = useState(false)
  const [passwordSubmitted, setPasswordSubmitted] = useState(false)
  const [preferencesSubmitted, setPreferencesSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Password validation errors
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    general: "",
  })

  const [feedbackForm, setFeedbackForm] = useState({
    type: "general",
    subject: "",
    message: "",
    anonymous: false,
  })

  const [feedbackErrors, setFeedbackErrors] = useState({
    subject: "",
    message: "",
  })

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFeedbackForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (feedbackErrors[name as keyof typeof feedbackErrors]) {
      setFeedbackErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleFeedbackSwitchChange = (checked: boolean) => {
    setFeedbackForm((prev) => ({
      ...prev,
      anonymous: checked,
    }))
  }

  const handleFeedbackTypeChange = (value: string) => {
    setFeedbackForm((prev) => ({
      ...prev,
      type: value,
    }))
  }

  const validateFeedbackForm = () => {
    const errors = {
      subject: "",
      message: "",
    }
    let isValid = true

    if (!feedbackForm.subject.trim()) {
      errors.subject = "Subject is required"
      isValid = false
    }

    if (!feedbackForm.message.trim()) {
      errors.message = "Message is required"
      isValid = false
    } else if (feedbackForm.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters"
      isValid = false
    }

    setFeedbackErrors(errors)
    return isValid
  }

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateFeedbackForm()) {
      return
    }

    // If validation passes, show success message
    setFeedbackSubmitted(true)

    // Reset form
    setFeedbackForm({
      type: "general",
      subject: "",
      message: "",
      anonymous: false,
    })

    // Use a cleanup function to prevent state updates after unmounting
    setTimeout(() => {
      setFeedbackSubmitted(false)
    }, 3000)
  }

  const handleProfileSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    setProfileSubmitted(true)

    // Use a cleanup function to prevent state updates after unmounting
    setTimeout(() => {
      setProfileSubmitted(false)
    }, 3000)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (passwordErrors[name as keyof typeof passwordErrors]) {
      setPasswordErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validatePasswordForm = () => {
    const errors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      general: "",
    }
    let isValid = true

    // Validate current password
    if (!passwordForm.currentPassword) {
      errors.currentPassword = "Current password is required"
      isValid = false
    }

    // Validate new password
    if (!passwordForm.newPassword) {
      errors.newPassword = "New password is required"
      isValid = false
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters"
      isValid = false
    }

    // Validate confirm password
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password"
      isValid = false
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setPasswordErrors(errors)
    return isValid
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validatePasswordForm()) {
      return
    }

    // If validation passes, show success message
    setPasswordSubmitted(true)

    // Reset form
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    // Use a cleanup function to prevent state updates after unmounting
    setTimeout(() => {
      setPasswordSubmitted(false)
    }, 3000)
  }

  const handlePreferencesSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    setPreferencesSubmitted(true)

    // Use a cleanup function to prevent state updates after unmounting
    setTimeout(() => {
      setPreferencesSubmitted(false)
    }, 3000)
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
      <PageHeader title="Settings" description="Manage your account and preferences" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full sm:w-auto flex flex-wrap">
          <TabsTrigger value="profile" className="flex-1 sm:flex-initial">
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 sm:flex-initial">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex-1 sm:flex-initial">
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="sm:text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue="John Doe" className="sm:col-span-3" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="sm:text-right">
                    Email
                  </Label>
                  <Input id="email" defaultValue="john.doe@example.com" className="sm:col-span-3" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="sm:text-right">
                    Phone
                  </Label>
                  <Input id="phone" defaultValue="(555) 123-4567" className="sm:col-span-3" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="relationship" className="sm:text-right">
                    Relationship
                  </Label>
                  <div className="sm:col-span-3">
                    <Select defaultValue="parent">
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="guardian">Guardian</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              {profileSubmitted && (
                <div className="w-full rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="flex">
                    <div className="text-sm font-medium text-green-800 dark:text-green-400">
                      Profile information updated successfully!
                    </div>
                  </div>
                </div>
              )}
              <Button className="w-full sm:w-auto" onClick={handleProfileSubmit}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <form onSubmit={handlePasswordSubmit}>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Update your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="current-password" className="sm:text-right">
                    Current Password
                  </Label>
                  <div className="sm:col-span-3">
                    <Input
                      id="current-password"
                      name="currentPassword"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className={passwordErrors.currentPassword ? "border-red-500" : ""}
                    />
                    {passwordErrors.currentPassword && (
                      <p className="text-xs text-red-500 mt-1">{passwordErrors.currentPassword}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-password" className="sm:text-right">
                    New Password
                  </Label>
                  <div className="sm:col-span-3">
                    <Input
                      id="new-password"
                      name="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className={passwordErrors.newPassword ? "border-red-500" : ""}
                    />
                    {passwordErrors.newPassword && (
                      <p className="text-xs text-red-500 mt-1">{passwordErrors.newPassword}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="confirm-password" className="sm:text-right">
                    Confirm Password
                  </Label>
                  <div className="sm:col-span-3">
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className={passwordErrors.confirmPassword ? "border-red-500" : ""}
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">{passwordErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>
                {passwordErrors.general && (
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                    <div className="sm:col-span-3 sm:col-start-2">
                      <p className="text-sm text-red-500">{passwordErrors.general}</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                {passwordSubmitted && (
                  <div className="w-full rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                    <div className="flex">
                      <div className="text-sm font-medium text-green-800 dark:text-green-400">
                        Password updated successfully!
                      </div>
                    </div>
                  </div>
                )}
                <Button type="submit" className="w-full sm:w-auto">
                  Update Password
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Communication Channels</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive notifications via text message</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive notifications on your device</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Messages</div>
                    <div className="text-sm text-muted-foreground">Notifications for new messages</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Grade Updates</div>
                    <div className="text-sm text-muted-foreground">Notifications when grades are updated</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Calendar Events</div>
                    <div className="text-sm text-muted-foreground">Notifications for upcoming events</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Attendance Updates</div>
                    <div className="text-sm text-muted-foreground">Notifications for attendance changes</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Resource Updates</div>
                    <div className="text-sm text-muted-foreground">Notifications when new resources are shared</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              {preferencesSubmitted && (
                <div className="w-full rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="flex">
                    <div className="text-sm font-medium text-green-800 dark:text-green-400">
                      Notification preferences saved successfully!
                    </div>
                  </div>
                </div>
              )}
              <Button className="w-full sm:w-auto" onClick={handlePreferencesSubmit}>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Provide Feedback</CardTitle>
              <CardDescription>Share your thoughts and suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFeedbackSubmit}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="feedback-type">Feedback Type</Label>
                    <Select value={feedbackForm.type} onValueChange={handleFeedbackTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Feedback</SelectItem>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="issue">Report an Issue</SelectItem>
                        <SelectItem value="teacher">Teacher Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Brief subject of your feedback"
                      value={feedbackForm.subject}
                      onChange={handleFeedbackChange}
                      className={feedbackErrors.subject ? "border-red-500" : ""}
                    />
                    {feedbackErrors.subject && <p className="text-xs text-red-500 mt-1">{feedbackErrors.subject}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please provide details about your feedback"
                      className={`min-h-[150px] ${feedbackErrors.message ? "border-red-500" : ""}`}
                      value={feedbackForm.message}
                      onChange={handleFeedbackChange}
                    />
                    {feedbackErrors.message && <p className="text-xs text-red-500 mt-1">{feedbackErrors.message}</p>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="anonymous"
                      checked={feedbackForm.anonymous}
                      onCheckedChange={handleFeedbackSwitchChange}
                    />
                    <Label htmlFor="anonymous">Submit anonymously</Label>
                  </div>
                  {feedbackSubmitted && (
                    <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                      <div className="flex">
                        <div className="text-sm font-medium text-green-800 dark:text-green-400">
                          Thank you for your feedback! We appreciate your input.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button type="submit" className="w-full sm:w-auto">
                    Submit Feedback
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

