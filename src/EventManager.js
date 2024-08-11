import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./EventManager.css";

function EventManager({ countdownUnit }) {
  const [events, setEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem("events");
      return savedEvents ? JSON.parse(savedEvents) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("events", JSON.stringify(events));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [events]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setEvents((prevEvents) => [...prevEvents]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addOrUpdateEvent = () => {
    if (eventName && eventDate) {
      if (editingIndex !== null && editingIndex < events.length) {
        const updatedEvents = [...events];
        updatedEvents[editingIndex] = { name: eventName, date: eventDate };
        setEvents(updatedEvents);
      } else {
        setEvents([...events, { name: eventName, date: eventDate }]);
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setEventName("");
    setEventDate("");
  };

  const cancelEdit = () => {
    resetForm();
  };

  const editEvent = (index) => {
    if (index < events.length) {
      setEditingIndex(index);
      setEventName(events[index].name);
      setEventDate(events[index].date);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      resetForm();
    }
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    if (editingIndex === index) {
      resetForm();
    } else if (editingIndex !== null && index < editingIndex) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const calculateCountdown = (date) => {
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0); // Set to midnight
    const currentDate = new Date();
    const diff = eventDate - currentDate;

    if (diff < 0) {
      return "Event has passed";
    }

    const totalSeconds = diff / 1000;
    const totalMinutes = totalSeconds / 60;
    const totalHours = totalMinutes / 60;
    const totalDays = totalHours / 24;
    const totalWeeks = totalDays / 7;

    switch (countdownUnit) {
      case "seconds":
        return `${totalSeconds.toFixed(0)} second${
          totalSeconds !== 1 ? "s" : ""
        }`;
      case "hours":
        return `${totalHours.toFixed(3)} hour${totalHours !== 1 ? "s" : ""}`;
      case "days":
        return `${totalDays.toFixed(3)} day${totalDays !== 1 ? "s" : ""}`;
      case "weeks":
        return `${totalWeeks.toFixed(3)} week${totalWeeks !== 1 ? "s" : ""}`;
      default:
        const years = Math.floor(totalDays / 365);
        const months = Math.floor((totalDays % 365) / 30);
        const remainingDays = Math.floor(totalDays % 30);
        const hours = Math.floor(totalHours % 24);
        const minutes = Math.floor(totalMinutes % 60);
        const seconds = Math.floor(totalSeconds % 60);

        const parts = [];
        if (years > 0) parts.push(`${years} year${years !== 1 ? "s" : ""}`);
        if (months > 0) parts.push(`${months} month${months !== 1 ? "s" : ""}`);
        if (remainingDays > 0)
          parts.push(`${remainingDays} day${remainingDays !== 1 ? "s" : ""}`);
        if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
        if (minutes > 0)
          parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
        if (seconds > 0)
          parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);

        return parts.join(", ");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="event-manager">
      <div className="event-form">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          min={today}
        />
        <button
          onClick={addOrUpdateEvent}
          className={
            editingIndex !== null ? "update-event-btn" : "add-event-btn"
          }
        >
          {editingIndex !== null ? "Update Event" : "Add Event"}
        </button>
        {editingIndex !== null && (
          <button onClick={cancelEdit} className="cancel-edit-btn">
            Cancel
          </button>
        )}
      </div>

      <div className="event-list">
        {events.length === 0 ? (
          <p className="no-events">
            No events added yet. Start by adding a new event.
          </p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-header">
                <div>
                  <div className="event-name">{event.name}</div>
                  <div className="event-date">
                    {new Date(event.date).toDateString()}
                  </div>
                </div>
                <p className="countdown">{calculateCountdown(event.date)}</p>
                <div className="event-icons">
                  <FaEdit
                    className="edit-icon"
                    onClick={() => editEvent(index)}
                  />
                  <FaTrash
                    className="delete-icon"
                    onClick={() => deleteEvent(index)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventManager;
