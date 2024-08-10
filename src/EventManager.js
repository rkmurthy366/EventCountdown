import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./EventManager.css";

function EventManager() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setEvents((prevEvents) => [...prevEvents]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addOrUpdateEvent = () => {
    if (eventName && eventDate) {
      const updatedEvents = [...events];
      if (editingIndex !== null) {
        updatedEvents[editingIndex] = { name: eventName, date: eventDate };
        setEditingIndex(null);
      } else {
        updatedEvents.push({ name: eventName, date: eventDate });
      }
      setEvents(updatedEvents);
      setEventName("");
      setEventDate("");
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEventName("");
    setEventDate("");
  };

  const editEvent = (index) => {
    setEditingIndex(index);
    setEventName(events[index].name);
    setEventDate(events[index].date);
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const calculateCountdown = (date) => {
    const eventDate = new Date(date);
    const currentDate = new Date();
    const diff = eventDate - currentDate;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44)
    );
    const weeks = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7)
    );
    const days = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const parts = [];

    if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
    if (months > 0)
      parts.push(`${months} ${months === 1 ? "month" : "months"}`);
    if (weeks > 0) parts.push(`${weeks} ${weeks === 1 ? "week" : "weeks"}`);
    if (days > 0) parts.push(`${days} ${days === 1 ? "day" : "days"}`);
    if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
    if (minutes > 0)
      parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
    if (seconds > 0)
      parts.push(`${seconds} ${seconds === 1 ? "second" : "seconds"}`);

    return parts.length > 0 ? parts.join(", ") : "Event has passed";
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
          min={today} // Disable past dates
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
