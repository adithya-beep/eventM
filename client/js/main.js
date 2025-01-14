// Helper function to display API responses
function showMessage(message, type = 'success') {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', type);
    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);
    setTimeout(() => {
      messageContainer.remove();
    }, 3000);
  }
  
  // Fetch all events and display them on the event management page
  function fetchEvents() {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        const eventTableBody = document.querySelector('#eventTable tbody');
        eventTableBody.innerHTML = ''; // Clear previous data
        data.forEach(event => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.description}</td>
            <td>${event.location}</td>
            <td>${new Date(event.date).toLocaleDateString()}</td>
            <td>
              <button onclick="editEvent('${event._id}')">Edit</button>
              <button onclick="deleteEvent('${event._id}')">Delete</button>
            </td>
          `;
          eventTableBody.appendChild(row);
        });
      })
      .catch(error => showMessage('Failed to fetch events', 'error'));
  }
  
  // Fetch all attendees for the attendee management page
  function fetchAttendees() {
    fetch('/api/attendees')
      .then(response => response.json())
      .then(data => {
        const attendeeTableBody = document.querySelector('#attendeeTable tbody');
        attendeeTableBody.innerHTML = ''; // Clear previous data
        data.forEach(attendee => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${attendee.name}</td>
            <td>${attendee.email}</td>
            <td>
              <button onclick="deleteAttendee('${attendee._id}')">Delete</button>
            </td>
          `;
          attendeeTableBody.appendChild(row);
        });
      })
      .catch(error => showMessage('Failed to fetch attendees', 'error'));
  }
  
  // Fetch tasks for a specific event on the task tracker page
  function fetchTasks(eventId) {
    fetch(`/api/tasks/${eventId}`)
      .then(response => response.json())
      .then(data => {
        const taskTable = document.getElementById('taskTable');
        taskTable.innerHTML = ''; // Clear previous tasks
  
        if (data.length === 0) {
          taskTable.innerHTML = '<p>No tasks assigned yet.</p>';
          return;
        }
  
        data.forEach(task => {
          const taskElement = document.createElement('div');
          taskElement.classList.add('task');
          taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>Deadline: ${new Date(task.deadline).toLocaleDateString()}</p>
            <p>Status: ${task.status}</p>
            <button onclick="updateTaskStatus('${task._id}', '${task.status === 'Pending' ? 'Completed' : 'Pending'}')">
              Mark as ${task.status === 'Pending' ? 'Completed' : 'Pending'}
            </button>
          `;
          taskTable.appendChild(taskElement);
        });
      })
      .catch(error => showMessage('Failed to fetch tasks', 'error'));
  }
  
  // Function to add or update an event
  function addOrUpdateEvent(eventId = null) {
    const name = document.querySelector('#eventName').value;
    const description = document.querySelector('#eventDescription').value;
    const location = document.querySelector('#eventLocation').value;
    const date = new Date(document.querySelector('#eventDate').value).toISOString();
  
    if (!name || !description || !location || !date) {
      showMessage('Please fill in all fields', 'error');
      return;
    }
  
    const eventData = { name, description, location, date };
    const method = eventId ? 'PUT' : 'POST';
    const url = eventId ? `/api/events/${eventId}` : '/api/events';
  
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    })
      .then(response => response.json())
      .then(data => {
        showMessage(eventId ? 'Event updated successfully' : 'Event added successfully');
        fetchEvents(); // Refresh event list
      })
      .catch(error => showMessage('Failed to save event', 'error'));
  }
  
  // Delete an event
  function deleteEvent(eventId) {
    if (!confirm('Are you sure you want to delete this event?')) return;
  
    fetch(`/api/events/${eventId}`, {
      method: 'DELETE',
    })
      .then(() => {
        showMessage('Event deleted successfully');
        fetchEvents(); // Refresh event list
      })
      .catch(error => showMessage('Failed to delete event', 'error'));
  }
  
  // Add a new attendee
  function addAttendee() {
    const name = document.querySelector('#attendeeName').value;
    const email = document.querySelector('#attendeeEmail').value;
  
    if (!name || !email) {
      showMessage('Please fill in all fields', 'error');
      return;
    }
  
    const attendeeData = { name, email };
  
    fetch('/api/attendees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attendeeData),
    })
      .then(response => response.json())
      .then(data => {
        showMessage('Attendee added successfully');
        fetchAttendees(); // Refresh attendee list
      })
      .catch(error => showMessage('Failed to add attendee', 'error'));
  }
  
  // Delete an attendee
  function deleteAttendee(attendeeId) {
    if (!confirm('Are you sure you want to delete this attendee?')) return;
  
    fetch(`/api/attendees/${attendeeId}`, {
      method: 'DELETE',
    })
      .then(() => {
        showMessage('Attendee deleted successfully');
        fetchAttendees(); // Refresh attendee list
      })
      .catch(error => showMessage('Failed to delete attendee', 'error'));
  }
  
  // Update task status (Pending/Completed)
  function updateTaskStatus(taskId, newStatus) {
    const taskData = { status: newStatus };
  
    fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    })
      .then(response => response.json())
      .then(() => {
        showMessage(`Task marked as ${newStatus}`);
        fetchTasks(taskId); // Refresh tasks
      })
      .catch(error => showMessage('Failed to update task status', 'error'));
  }
  
  // Initialize events on the Event Management page
  if (document.querySelector('#eventTable')) {
    fetchEvents();
  }
  
  // Initialize attendees on the Attendee Management page
  if (document.querySelector('#attendeeTable')) {
    fetchAttendees();
  }
  
  // Initialize tasks on the Task Tracker page (pass the event ID here)
  if (document.getElementById('taskTable')) {
    const eventId = 'your-event-id'; // You can pass the actual event ID
    fetchTasks(eventId);
  }
  

//ssssssssssssssssssssssssssss
document.getElementById('attendee-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh

    // Gather form data
    const attendeeData = {
        name: document.getElementById('attendee-name').value,
        email: document.getElementById('attendee-email').value,
        eventName: document.getElementById('event-name').value,  // Event name instead of ID
    };

    // Call the addAttendee function to send data to the backend
    addAttendee(attendeeData);
});

// Function to handle adding attendee
async function addAttendee(attendeeData) {
    try {
        const response = await fetch('/api/attendees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendeeData),
        });
        const result = await response.json();
        if (result.message) {
            alert(result.message); // Show a message to user
        }
    } catch (error) {
        console.error('Error adding attendee:', error);
    }
}

// public/js/main.js

// Listen for the event form submission
document.getElementById('event-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent page refresh on form submission

    // Gather form data
    const eventData = {
        name: document.getElementById('event-name').value,
        description: document.getElementById('event-description').value,
        location: document.getElementById('event-location').value,
        date: document.getElementById('event-date').value,
    };

    // Call the function to send data to the backend API to add the event
    await addEvent(eventData);
});

// Function to handle adding event
async function addEvent(eventData) {
    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        const result = await response.json();
        
        if (response.ok) {
            alert('Event added successfully!');
            // Optionally redirect to another page after adding the event
            window.location.href = '/event-management.html';  // Redirect to the event management page
        } else {
            alert(`Error: ${result.message || 'Something went wrong!'}`);
        }
    } catch (error) {
        console.error('Error adding event:', error);
        alert('Error adding event');
    }
}

