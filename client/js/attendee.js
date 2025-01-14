// // Fetch all attendees and display them
// async function fetchAttendees() {
//     try {
//         const response = await fetch('/api/attendees');
//         const attendees = await response.json();
//         displayAttendees(attendees);
//     } catch (error) {
//         console.error('Error fetching attendees:', error);
//     }
// }

// // Display attendees on the page
// function displayAttendees(attendees) {
//     const attendeeList = document.getElementById('attendee-list');
//     attendeeList.innerHTML = ''; // Clear existing list

//     attendees.forEach(attendee => {
//         const attendeeElement = document.createElement('div');
//         attendeeElement.classList.add('attendee-item');
//         attendeeElement.innerHTML = `
//             <h3>${attendee.name}</h3>
//             <p>${attendee.email}</p>
//             <p>Event: ${attendee.eventId}</p>
//             <button onclick="deleteAttendee('${attendee._id}')">Delete</button>
//         `;
//         attendeeList.appendChild(attendeeElement);
//     });
// }

// // Add a new attendee
// async function addAttendee(attendeeData) {
//     try {
//         const response = await fetch('/api/attendees', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(attendeeData),
//         });

//         if (!response.ok) {
//             const error = await response.json();
//             alert(error.message || 'Error adding attendee');
//             return;
//         }

//         const result = await response.json();
//         alert(result.message);
//         fetchAttendees();  // Refresh the list after adding
//     } catch (error) {
//         console.error('Error adding attendee:', error);
//     }
// }

// // Delete an attendee
// async function deleteAttendee(attendeeId) {
//     try {
//         const response = await fetch(`/api/attendees/${attendeeId}`, {
//             method: 'DELETE',
//         });

//         if (!response.ok) {
//             const error = await response.json();
//             alert(error.message || 'Error deleting attendee');
//             return;
//         }

//         const result = await response.json();
//         alert(result.message);
//         fetchAttendees();  // Refresh the list after deletion
//     } catch (error) {
//         console.error('Error deleting attendee:', error);
//     }
// }

// // Event listener to handle form submission for adding attendee
// document.getElementById('attendee-form').addEventListener('submit', (e) => {
//     e.preventDefault();

//     // Gather form data
//     const attendeeData = {
//         name: document.getElementById('attendee-name').value,
//         email: document.getElementById('attendee-email').value,
//         eventId: document.getElementById('attendee-eventId').value,
//     };

//     addAttendee(attendeeData);
// });

// // Initial call to load all attendees when page loads
// document.addEventListener('DOMContentLoaded', () => {
//     fetchAttendees();
// });
// Fetch all attendees for a specific event
async function fetchAttendeesByEvent(eventId) {
    try {
        const response = await fetch(`/api/attendees/${eventId}`);
        const attendees = await response.json();
        displayAttendees(attendees);
    } catch (error) {
        console.error('Error fetching attendees by event:', error);
    }
}

// Display attendees on the page
function displayAttendees(attendees) {
    const attendeeList = document.getElementById('attendee-list');
    attendeeList.innerHTML = ''; // Clear existing list

    if (attendees.length === 0) {
        attendeeList.innerHTML = '<p>No attendees found for this event.</p>';
        return;
    }

    attendees.forEach(attendee => {
        const attendeeElement = document.createElement('div');
        attendeeElement.classList.add('attendee-item');
        attendeeElement.innerHTML = `
            <h3>${attendee.name}</h3>
            <p>${attendee.email}</p>
            <p>Event: ${attendee.eventId.name}</p>
            <button onclick="deleteAttendee('${attendee._id}')">Delete</button>
        `;
        attendeeList.appendChild(attendeeElement);
    });
}

// Fetch event names to populate dropdown for viewing attendees
async function fetchEvents() {
    try {
        const response = await fetch('/api/events');
        const events = await response.json();
        populateEventDropdown(events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Populate event dropdown menu
function populateEventDropdown(events) {
    const eventDropdown = document.getElementById('event-dropdown');
    eventDropdown.innerHTML = '<option value="">Select an Event</option>'; // Clear existing options

    events.forEach(event => {
        const option = document.createElement('option');
        option.value = event._id;
        option.textContent = event.name;
        eventDropdown.appendChild(option);
    });
}

// Handle event selection for viewing attendees
document.getElementById('event-dropdown').addEventListener('change', (e) => {
    const selectedEventId = e.target.value;
    if (selectedEventId) {
        fetchAttendeesByEvent(selectedEventId);
    }
});

// Add a new attendee
async function addAttendee(attendeeData) {
    try {
        const response = await fetch('/api/attendees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendeeData),
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.message || 'Error adding attendee');
            return;
        }

        const result = await response.json();
        alert(result.message);
        fetchAttendees();  // Refresh the list after adding
    } catch (error) {
        console.error('Error adding attendee:', error);
    }
}

// Delete an attendee
async function deleteAttendee(attendeeId) {
    try {
        const response = await fetch(`/api/attendees/${attendeeId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.message || 'Error deleting attendee');
            return;
        }

        const result = await response.json();
        alert(result.message);
        fetchAttendees();  // Refresh the list after deletion
    } catch (error) {
        console.error('Error deleting attendee:', error);
    }
}

// Event listener to handle form submission for adding attendee
document.getElementById('attendee-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather form data
    const attendeeData = {
        name: document.getElementById('attendee-name').value,
        email: document.getElementById('attendee-email').value,
        eventId: document.getElementById('attendee-eventId').value,
    };

    addAttendee(attendeeData);
});

// Initial call to load all events for dropdown when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
    fetchAttendees(); // This may need modification based on your initial page state
});
