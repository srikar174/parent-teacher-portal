"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, UserPlus } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample initial conversations data
const initialConversations = [
  {
    id: 1,
    name: "Ms. Johnson",
    role: "Science Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MJ",
    lastMessage: "About the upcoming science project...",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    name: "Mr. Smith",
    role: "Math Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
    lastMessage: "Math homework for next week",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    name: "Mrs. Davis",
    role: "English Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MD",
    lastMessage: "English literature assignment feedback",
    time: "2 days ago",
    unread: false,
  },
]

// Sample messages for the first conversation
const sampleMessages = [
  {
    id: 1,
    sender: "Ms. Johnson",
    content:
      "Hello! I wanted to discuss the upcoming science project with you. Your child has been doing great in class.",
    time: "10:30 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Thank you for letting me know. What details should I know about the project?",
    time: "10:35 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Ms. Johnson",
    content:
      "The project will be about renewable energy sources. Students will need to create a small model demonstrating one type of renewable energy. Materials can be simple household items.",
    time: "10:42 AM",
    isMe: false,
  },
]

// Automated replies based on keywords
const automatedReplies = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: "Hello! How can I help you today regarding your child's education?",
  },
  {
    keywords: ["project", "assignment", "homework"],
    response:
      "I'm glad you're asking about that. The project is coming along well. Your child has been very engaged in class.",
  },
  {
    keywords: ["grade", "score", "marks", "performance"],
    response:
      "Your child has been performing well in recent assessments. They scored above class average in the last test.",
  },
  {
    keywords: ["meeting", "conference", "appointment", "schedule"],
    response: "I'm available for a parent-teacher meeting next week. Would Tuesday or Thursday afternoon work for you?",
  },
  {
    keywords: ["thank", "thanks"],
    response: "You're welcome! Please let me know if you have any other questions.",
  },
]

export default function MessagesPage() {
  // Move conversations to state so changes trigger re-renders
  const [conversations, setConversations] = useState(initialConversations)
  const [selectedConversation, setSelectedConversation] = useState(initialConversations[0])
  const [messages, setMessages] = useState(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const [showConversations, setShowConversations] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [newContact, setNewContact] = useState({ name: "", role: "", avatar: "/placeholder.svg?height=40&width=40" })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [contactAdded, setContactAdded] = useState(false)
  const [formError, setFormError] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!newContact.name.trim()) {
      setFormError("Name is required")
      return
    }

    setFormError("")

    const initials = newContact.name
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)

    const newConversation = {
      id: Date.now(), // Use timestamp for unique ID
      name: newContact.name,
      role: newContact.role || "Staff",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: initials,
      lastMessage: "No messages yet",
      time: "Just now",
      unread: false,
    }

    // Update conversations state to trigger re-render
    const updatedConversations = [newConversation, ...conversations]
    setConversations(updatedConversations)

    // Select the new conversation
    setSelectedConversation(newConversation)

    // Clear messages for the new conversation
    setMessages([])

    // Reset form
    setNewContact({ name: "", role: "", avatar: "/placeholder.svg?height=40&width=40" })

    // Close dialog
    setDialogOpen(false)

    // Show success message
    setContactAdded(true)
    setTimeout(() => setContactAdded(false), 3000)

    // On mobile, switch to message view
    setShowConversations(false)
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Generate an automated reply based on the user's message
  const generateReply = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase()

    // Find a matching reply based on keywords
    for (const reply of automatedReplies) {
      if (reply.keywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
        return reply.response
      }
    }

    // Default reply if no keywords match
    return "Thank you for your message. I'll get back to you soon with more information about your child's progress."
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userMsg = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }

    setMessages([...messages, userMsg])
    setNewMessage("")

    // Update the last message in the conversation
    const updatedConversations = conversations.map((conv) =>
      conv.id === selectedConversation.id ? { ...conv, lastMessage: newMessage, time: "Just now" } : conv,
    )
    setConversations(updatedConversations)

    // Update selected conversation
    setSelectedConversation((prev) => ({
      ...prev,
      lastMessage: newMessage,
      time: "Just now",
    }))

    // Show typing indicator
    setIsTyping(true)

    // Generate automated reply after a delay
    setTimeout(() => {
      setIsTyping(false)

      const replyMsg = {
        id: messages.length + 2,
        sender: selectedConversation.name,
        content: generateReply(userMsg.content),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: false,
      }

      setMessages((prevMessages) => [...prevMessages, replyMsg])
    }, 1500) // 1.5 second delay for realistic typing simulation
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 mb-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Messages" description="Communicate with teachers and staff" />

        {/* Mobile view toggle button */}
        <div className="md:hidden">
          <Button variant="outline" size="sm" onClick={() => setShowConversations(!showConversations)}>
            {showConversations ? "View Messages" : "View Conversations"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)] min-h-[400px] max-h-[800px]">
        {/* Conversations list - hidden on mobile when viewing messages */}
        <div className={`md:col-span-1 space-y-4 ${showConversations ? "block" : "hidden md:block"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Conversations</h2>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Person
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddContact}>
                  <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                    <DialogDescription>Add a new teacher or staff member to your conversations.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id="name"
                          value={newContact.name}
                          onChange={(e) => {
                            setNewContact({ ...newContact, name: e.target.value })
                            if (e.target.value.trim()) setFormError("")
                          }}
                          className={formError ? "border-red-500" : ""}
                          placeholder="Enter name"
                          required
                        />
                        {formError && <p className="text-xs text-red-500 mt-1">{formError}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select
                        value={newContact.role}
                        onValueChange={(value) => setNewContact({ ...newContact, role: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Math Teacher">Math Teacher</SelectItem>
                          <SelectItem value="Science Teacher">Science Teacher</SelectItem>
                          <SelectItem value="English Teacher">English Teacher</SelectItem>
                          <SelectItem value="History Teacher">History Teacher</SelectItem>
                          <SelectItem value="Principal">Principal</SelectItem>
                          <SelectItem value="Counselor">Counselor</SelectItem>
                          <SelectItem value="Staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Contact</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-2 overflow-auto max-h-[calc(100vh-280px)] scrollbar-thin">
            {contactAdded && (
              <div className="rounded-md bg-green-50 p-2 mb-2 dark:bg-green-900/20">
                <div className="flex">
                  <div className="text-sm font-medium text-green-800 dark:text-green-400">
                    Contact added successfully!
                  </div>
                </div>
              </div>
            )}
            {conversations.map((conversation) => (
              <Card
                key={conversation.id}
                className={`cursor-pointer ${selectedConversation.id === conversation.id ? "bg-accent" : ""}`}
                onClick={() => {
                  setSelectedConversation(conversation)
                  setShowConversations(false) // On mobile, switch to message view
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={conversation.avatar} alt={conversation.name} />
                      <AvatarFallback>{conversation.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{conversation.name}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Message thread - hidden on mobile when viewing conversations list */}
        <div className={`md:col-span-2 ${!showConversations ? "block" : "hidden md:block"}`}>
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                  <AvatarFallback>{selectedConversation.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedConversation.name}</CardTitle>
                  <CardDescription>{selectedConversation.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto space-y-4 p-4 scrollbar-thin messages-container">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 text-sm ${message.isMe ? "justify-end" : ""}`}
                  >
                    {!message.isMe && (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                        <AvatarFallback>{selectedConversation.initials}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`grid gap-1 max-w-[75%] ${message.isMe ? "ml-auto" : ""}`}>
                      {!message.isMe && <div className="font-semibold">{message.sender}</div>}
                      <div
                        className={`rounded-lg p-3 break-words ${message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <p>{message.content}</p>
                      </div>
                      <div className={`text-xs text-muted-foreground ${message.isMe ? "justify-self-end" : ""}`}>
                        {message.time}
                      </div>
                    </div>
                    {message.isMe && (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                        <AvatarFallback>YO</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>No messages yet</p>
                    <p className="text-sm">Send a message to start the conversation</p>
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-3 text-sm">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                    <AvatarFallback>{selectedConversation.initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1 max-w-[75%]">
                    <div className="font-semibold">{selectedConversation.name}</div>
                    <div className="rounded-lg p-3 bg-muted">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                        <div
                          className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter className="pt-0 p-4 border-t flex-shrink-0 bg-background mb-4">
              <form className="flex w-full items-center space-x-2" onSubmit={handleSendMessage}>
                <Input
                  className="flex-1"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

