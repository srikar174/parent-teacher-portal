"use client"

import { useState, useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarDays, Clock, MapPin, Plus } from "lucide-react"
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

// Sample events data
const events = [
  {
    id: 1,
    title: "Parent-Teacher Conference",
    date: "2024-03-15",
    time: "3:30 PM - 4:00 PM",
    location: "Room 102",
    description: "Discuss student progress and upcoming projects",
  },
  {
    id: 2,
    title: "Science Fair",
    date: "2024-03-20",
    time: "1:00 PM - 3:00 PM",
    location: "School Gymnasium",
    description: "Annual science fair with student projects on display",
  },
  {
    id: 3,
    title: "Field Trip - Museum",
    date: "2024-04-05",
    time: "9:00 AM - 2:00 PM",
    location: "City Museum",
    description: "Educational trip to the natural history museum",
  },
]

// Memoized event card component to prevent unnecessary re-renders
const EventCard = memo(({ event, onClick }: { event: any; onClick: () => void }) => (
  <Card className="cursor-pointer hover:bg-accent" onClick={onClick}>
    <CardContent className="p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{event.title}</h3>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4 shrink-0" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4 shrink-0" />
          <span>{event.location}</span>
        </div>
      </div>
    </CardContent>
  </Card>
))
EventCard.displayName = "EventCard"

// Memoized event details component
const EventDetails = memo(({ event }: { event: any }) => (
  <Card className="mt-6">
    <CardHeader>
      <CardTitle>{event.title}</CardTitle>
      <CardDescription>Event Details</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className="font-medium">Date:</div>
          <div className="sm:col-span-3">{new Date(event.date).toLocaleDateString()}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className="font-medium">Time:</div>
          <div className="sm:col-span-3">{event.time}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className="font-medium">Location:</div>
          <div className="sm:col-span-3">{event.location}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className="font-medium">Description:</div>
          <div className="sm:col-span-3">{event.description}</div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex flex-col sm:flex-row gap-2">
      <Button variant="outline" className="w-full sm:w-auto">
        Add to Calendar
      </Button>
      <Button className="w-full sm:w-auto">RSVP</Button>
    </CardFooter>
  </Card>
))
EventDetails.displayName = "EventDetails"

// Memoized empty events placeholder
const EmptyEventsPlaceholder = memo(() => (
  <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
    <div className="flex flex-col items-center space-y-2 text-center">
      <CalendarDays className="h-10 w-10 text-muted-foreground" />
      <h3 className="font-medium">No events for this day</h3>
      <p className="text-sm text-muted-foreground">Select a different day or schedule a new appointment</p>
    </div>
  </div>
))
EmptyEventsPlaceholder.displayName = "EmptyEventsPlaceholder"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)
  const [showCalendar, setShowCalendar] = useState(true)

  // Add state for the new appointment form
  const [newAppointment, setNewAppointment] = useState({
    teacher: "",
    date: date ? date.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    time: "",
    reason: "",
  })

  // Memoized event filtering function
  const filteredEvents = useCallback(() => {
    if (!date) return []

    try {
      const selectedDate = date.toISOString().split("T")[0]
      return events.filter((event) => {
        const eventDate = new Date(event.date).toISOString().split("T")[0]
        return eventDate === selectedDate
      })
    } catch (e) {
      return []
    }
  }, [date])

  // Memoized date formatter
  const formatDate = useCallback((date: Date | undefined) => {
    if (!date) return "Events"
    try {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return "Events"
    }
  }, [])

  // Update the handleDateSelect function to also update the new appointment date
  const handleDateSelect = useCallback((newDate: Date | undefined) => {
    setDate(newDate)
    setSelectedEvent(null)
    setShowCalendar(false)

    // Update the appointment date when a new date is selected
    if (newDate) {
      setNewAppointment((prev) => ({
        ...prev,
        date: newDate.toISOString().split("T")[0],
      }))
    }
  }, [])

  // Add a function to handle appointment submission
  const handleAppointmentSubmit = () => {
    // Validate form
    if (!newAppointment.teacher || !newAppointment.date || !newAppointment.time || !newAppointment.reason) {
      alert("Please fill out all fields")
      return
    }

    // Create new event
    const newEvent = {
      id: events.length + 1,
      title: `Meeting with ${newAppointment.teacher}`,
      date: newAppointment.date,
      time: newAppointment.time,
      location: "School",
      description: newAppointment.reason,
    }

    // Add to events array
    events.unshift(newEvent)

    // Reset form
    setNewAppointment({
      teacher: "",
      date: date ? date.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      time: "",
      reason: "",
    })

    // Close dialog
    setShowAppointmentForm(false)

    // Select the new event if it's on the currently selected date
    if (date && date.toISOString().split("T")[0] === newAppointment.date) {
      setSelectedEvent(newEvent)
    }
  }

  // Get filtered events
  const currentEvents = filteredEvents()

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Calendar" description="View and schedule events and appointments" />

        {/* Mobile view toggle button */}
        <div className="md:hidden">
          <Button variant="outline" size="sm" onClick={() => setShowCalendar(!showCalendar)}>
            {showCalendar ? "View Events" : "View Calendar"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`md:col-span-1 ${showCalendar ? "block" : "hidden md:block"}`}>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto px-1 sm:px-4">
              <div className="w-full flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border w-full max-w-[350px]"
                  disabled={(date) => {
                    // Disable dates in the past
                    const today = new Date()
                    today.setHours(0, 0, 0, 0) // Set to beginning of day
                    return date < today
                  }}
                  classNames={{
                    months: "flex flex-col space-y-4",
                    month: "space-y-4 w-full",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md flex-1",
                    day: "h-8 w-full p-0 font-normal aria-selected:opacity-100 flex items-center justify-center",
                    day_selected:
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={showAppointmentForm} onOpenChange={setShowAppointmentForm}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule an Appointment</DialogTitle>
                    <DialogDescription>Request a meeting with a teacher or staff member</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                      <Label htmlFor="teacher" className="sm:text-right">
                        Teacher
                      </Label>
                      <Input
                        id="teacher"
                        className="sm:col-span-3"
                        placeholder="Enter teacher name"
                        value={newAppointment.teacher}
                        onChange={(e) => setNewAppointment({ ...newAppointment, teacher: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="sm:text-right">
                        Date
                      </Label>
                      <Input
                        id="date"
                        className="sm:col-span-3"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="sm:text-right">
                        Time
                      </Label>
                      <Input
                        id="time"
                        className="sm:col-span-3"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                      <Label htmlFor="reason" className="sm:text-right">
                        Reason
                      </Label>
                      <Input
                        id="reason"
                        className="sm:col-span-3"
                        placeholder="Brief description of the meeting"
                        value={newAppointment.reason}
                        onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAppointmentForm(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAppointmentSubmit}>Schedule Appointment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
        <div className={`md:col-span-2 ${!showCalendar ? "block" : "hidden md:block"}`}>
          <Card>
            <CardHeader>
              <CardTitle>{formatDate(date)}</CardTitle>
              <CardDescription>{currentEvents.length} events scheduled for this day</CardDescription>
            </CardHeader>
            <CardContent>
              {currentEvents.length > 0 ? (
                <div className="space-y-4">
                  {currentEvents.map((event) => (
                    <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
                  ))}
                </div>
              ) : (
                <EmptyEventsPlaceholder />
              )}
            </CardContent>
          </Card>

          {selectedEvent && <EventDetails event={selectedEvent} />}
        </div>
      </div>
    </div>
  )
}

