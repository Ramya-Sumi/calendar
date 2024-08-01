"use client";
import React, { useState, useCallback,useEffect } from "react";
import { useDispatch } from "react-redux";
import { format, parse, startOfWeek, endOfWeek, getDay, startOfMonth, endOfMonth, startOfDay } from "date-fns";
import { enUS } from "date-fns/locale";
import Link from "next/link";
import {
Calendar,
dateFnsLocalizer,
} from "react-big-calendar";
import SideMenu from "@/app/dashboard/component/SideMenu";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
const locales = {
"en-US": enUS,
};

const localizer = dateFnsLocalizer({
format,
parse,
startOfWeek,
endOfWeek,
getDay,
locales,
});

export default function P_M_Todo0() {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [currentAction, setCurrentAction] = useState("week"); // Default to "week"

  const [activeEventModal, setActiveEventModal] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Fetch events based on the date range
  const fetchEvents = useCallback(async (date, action) => {
  let startDate, endDate;

  if (action === "month") {
    startDate = startOfMonth(date);
    endDate = endOfMonth(date);
  } else if (action === "week") {
    startDate = startOfWeek(date);
    endDate = endOfWeek(date);
  } else { // not using
    startDate = startOfDay(date);
    endDate = startOfDay(date); 
  }

  const formattedStart = format(startDate, "yyyy-MM-dd");
  const formattedEnd = format(endDate, "yyyy-MM-dd");

  try {
  let response;
  // Call the API for week or month
  response = await fetch(`http://52.35.66.255:8000/calendar_app/api/calendar?from_date=${formattedStart}&to_date=${formattedEnd}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Full API Response:", data); // Log the entire response

  if (!data || data.length === 0) {
    console.warn("No events found for this date range.");
    return; // Return early if no events found
  }

  const uniqueEvents = [];
  const seenKeys = new Set();

  // Handle the case where data is an array or a single object
  if (Array.isArray(data)) {
    data.forEach(event => {
      const position = event.job_id.jobRequest_Role; // Position
      const interviewer = event.job_id.jobRequest_createdBy ? 
      `${event.job_id.jobRequest_createdBy.firstName} ${event.job_id.jobRequest_createdBy.lastName}` : 
      'N/A'; // Interviewer
      const startTime = format(new Date(event.start), "HH:mm"); // Start time
      const endTime = format(new Date(event.end), "HH:mm"); // End time

      // Create a unique key based on Position, Interviewer, and Time
      const uniqueKey = `${position}-${interviewer}-${startTime}-${endTime}`;

    if (!seenKeys.has(uniqueKey)) {
      seenKeys.add(uniqueKey);
      uniqueEvents.push({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
      });
    }
    });
  } else {
    // If data is a single object, process it directly
    const event = data; // Since data is not an array, handle it directly
    const position = event.job_id.jobRequest_Role; // Position
    const interviewer = event.job_id.jobRequest_createdBy ? 
    `${event.job_id.jobRequest_createdBy.firstName} ${event.job_id.jobRequest_createdBy.lastName}` : 
    'N/A'; // Interviewer

    // Add the single event to uniqueEvents
    uniqueEvents.push({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
    });
  }

  setEvents(uniqueEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
  }, []);

  const handleNavigate = useCallback((newDate, action) => {
    setCurrentAction(action);

    console.log("Navigated to:", newDate);
    console.log("Action:", action);

    fetchEvents(newDate, action);
  }, [fetchEvents]);

  useEffect(() => {
    // Fetch events for the initial view when the component mounts
    const today = new Date();
    fetchEvents(today, currentAction);
  }, [fetchEvents, currentAction]);


  const handleRangeChange = useCallback(({ start, end }) => {
    console.log("Range change triggered with:", { start, end });
    fetchEvents(start, "week"); // Default to week; adjust as needed
  }, [fetchEvents]);


  const onNavigate = useCallback((newDate, action) => {
    setCurrentAction(action); // Update currentAction when navigating

    console.log("Navigated to:", newDate);
    console.log("Action:", action);

    // Ensure newDate is a valid date before proceeding
    if (!(newDate instanceof Date) || isNaN(newDate.getTime())) {
    console.error("Invalid newDate:", newDate);
    return;
  }

  // Calculate the start and end of the week
  const start = startOfWeek(newDate);
  const end = endOfWeek(newDate);

  console.log("Calculated start:", start);
  console.log("Calculated end:", end);

  // Ensure valid dates before calling handleRangeChange
  if (start instanceof Date && !isNaN(start.getTime()) && end instanceof Date && !isNaN(end.getTime())) {
    handleRangeChange({ start, end });
  } else {
    console.error("Invalid start or end date during navigation:", { start, end });
  }
  }, [handleRangeChange]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Add suffix to the day (st, nd, rd, th)
    const suffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // 4-20
    switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
    }
  };

  return `${day}${suffix(day)} ${month} ${year}`;
  };
  const formatInterviewTimeRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const startHours = startDate.getHours();
    const endHours = endDate.getHours();

    const startFormatted = `${startHours % 12 || 12} ${startHours >= 12 ? 'p.m.' : 'a.m.'}`;
    const endFormatted = `${endHours % 12 || 12} ${endHours >= 12 ? 'p.m.' : 'a.m.'}`;

    return `${startFormatted} - ${endFormatted}`;
  };


  const handleSelectSlot = useCallback(({ start }) => {
    console.log("Slot selected:", { start });
    fetchEvents(start, "day"); // Fetch events for the selected day
  }, [fetchEvents]);

const handleSelect = async (event, e) => {
console.log("Selected event:", event);

const { id } = event; // Assuming each event has an 'id' field
setActiveEventModal(event);
setPosition({ x: e.clientX, y: e.clientY });

try {
  console.log("Selected event ID:", id);
  const response = await fetch(`http://52.35.66.255:8000/calendar_app/api/calendar_meeting?id=${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Meeting details:", data);
  setActiveEventModal(data); // Update the modal with the meeting details
  } catch (error) {
    console.error("Error fetching meeting details:", error);
  }
};


const handleViewChange = useCallback((view) => {
  setCurrentAction(view);
  const today = new Date(); // Use today to fetch events for the initial view
  fetchEvents(today, view);
}, [fetchEvents]);


const CustomEvent = ({ event, action }: { event: any; action: string }) => {
return (
  <>
    {action === "week" ? (
    <div className="calendarTopSection">
      <ul>
        <li className="text-[12px] py-1">Position: {event.job_id.jobRequest_Role}</li>
        <li className="text-[12px] py-1">
        Interview with: 
        {event.job_id && event.job_id.jobRequest_createdBy ? (
        `${event.job_id.jobRequest_createdBy.firstName || 'N/A'} ${event.job_id.jobRequest_createdBy.lastName || ''}`
        ) : (
        'N/A'
        )}
        </li>            
        <li className="text-[12px] py-1">Time: {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")}</li>
        <li className="text-[12px] py-1">Via: Google meet</li>
      </ul>
    </div>
    ) : action === "day" ? (
    <div className="calendarTopSections">
    <div className="contents">
      <ul>
        <li>Interview with: {event.job_id && event.job_id.jobRequest_createdBy ? (
        `${event.job_id.jobRequest_createdBy.firstName || 'N/A'} ${event.job_id.jobRequest_createdBy.lastName || ''}`
        ) : (
        'N/A'
        )}</li>
        <li>Position: {event.job_id.jobRequest_Role}</li>
        <li>Created by: {event.user_det.handled_by.firstName} {event.user_det.handled_by.lastName}</li>
        <li>Interview Date: {formatDate(event.start)}</li>
        <li>Interview Time: {formatInterviewTimeRange(event.start, event.end)}</li>
        <li>Interview Via: Google Meet</li>
      </ul>
    </div>
    <div className="button-container">
      <span>
        <img src="/image/google-meet-logo.png" alt="Google Meet" width="200" height="200" style={{ marginTop: '5px' }} />
      </span>
      <button className="join-button" onClick={() => window.open(event.link, "_blank")}>
      Join
      </button>
    </div>
    </div>
    ) : (
    <div className="calendarTopSection">
      <ul>
        <li className="text-[12px] py-1">Position: {event.job_id.jobRequest_Role}</li>
        <li className="text-[12px] py-1">
        Interview with: 
        {event.job_id && event.job_id.jobRequest_createdBy ? (
        `${event.job_id.jobRequest_createdBy.firstName || 'N/A'} ${event.job_id.jobRequest_createdBy.lastName || ''}`
        ) : (
        'N/A'
        )}
        </li>            
        <li className="text-[12px] py-1">Time: {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")}</li>
        <li className="text-[12px] py-1">Via: Google meet</li>
      </ul>
    </div>
    )}
  </>
);
};



return (
<section>
  <div className="container-fluid my-md-5 my-4">
    <div className="row">
      <div className="col-lg-1 leftMenuWidth ps-0 position-relative">
      <SideMenu />
      </div>
      <div className="col-lg-11 pe-lg-4 ps-lg-0">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-8 projectText">
            <h1>Calendar</h1>
            <p className="mt-3">
            Enjoy your selecting potential candidates Tracking and Management System.
            </p>
          </div>
        <div className="col-lg-4 mt-3 mt-lg-0 text-center text-lg-end">
          <Link prefetch href="/P_M_JobDescriptions1" className="btn btn-light me-3 mx-lg-2">JD Assets</Link>
          <Link prefetch href="P_M_JobDescriptions4" className="btn btn-blue bg-[#0a66c2!important]">Create New JD</Link>
        </div>
        </div>
        <div className="TotalEmployees shadow bg-white rounded-3 p-3 w-100 mt-4">
        <h3 className="projectManHeading">Your Todo’s</h3>
          <div style={{ width: "100%", position: "relative" }}>
          <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          defaultView={"week"}
          timeslots={4}
          step={15}
          views={{ month: true, week: true, day: true }}
          components={{
          event: (eventProps) => (
          <CustomEvent {...eventProps} action={currentAction} />
          ),
          }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelect} 
          onNavigate={handleNavigate} 
          onView={handleViewChange}
          />

          {activeEventModal && <EventDetailModal />}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
);
}
