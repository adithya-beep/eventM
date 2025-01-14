// document.addEventListener('DOMContentLoaded', () => {
//     // Make sure the form exists before adding an event listener
//     const form = document.getElementById('event-form');
//     if (form) {
//         form.addEventListener('submit', (e) => {
//             e.preventDefault();

//             // Gather form data
//             const eventData = {
//                 name: document.getElementById('event-name').value,
//                 description: document.getElementById('event-description').value,
//                 location: document.getElementById('event-location').value,
//                 date: document.getElementById('event-date').value,
//             };

//             addEvent(eventData);
//         });
//     } else {
//         console.error('Event form not found');
//     }

//     // Load all events on page load
//     fetchEvents();
// });

// // API call to fetch all events
// async function fetchEvents() {
//     try {
//         const response = await fetch('/api/events');
//         if (response.ok) {
//             const events = await response.json();
//             displayEvents(events);
//         } else {
//             console.error('Failed to fetch events:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error fetching events:', error);
//     }
// }

// // Display events on the page
// function displayEvents(events) {
//     const eventList = document.getElementById('event-list');
//     eventList.innerHTML = '';

//     events.forEach(event => {
//         const eventElement = document.createElement('div');
//         eventElement.classList.add('event-item');
//         eventElement.innerHTML = `
//             <h3>${event.name}</h3>
//             <p>${event.description}</p>
//             <p>${event.location}</p>
//             <p>${new Date(event.date).toLocaleDateString()}</p>
//             <button onclick="editEvent(${event._id})">Edit</button>
//             <button onclick="deleteEvent(${event._id})">Delete</button>
//         `;
//         eventList.appendChild(eventElement);
//     });
// }

// // Add a new event
// async function addEvent(eventData) {
//     try {
//         const response = await fetch('/api/events', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(eventData),
//         });
//         const result = await response.json();
//         if (result.message) {
//             alert(result.message);
//             fetchEvents(); // Reload the events after adding a new one
//         }
//     } catch (error) {
//         console.error('Error adding event:', error);
//     }
// }

// // Edit an existing event
// async function editEvent(eventId) {
//     const event = await fetchEventById(eventId);
//     document.getElementById('event-name').value = event.name;
//     document.getElementById('event-description').value = event.description;
//     document.getElementById('event-location').value = event.location;
//     document.getElementById('event-date').value = event.date;
// }

// // Fetch an event by ID
// async function fetchEventById(eventId) {
//     try {
//         const response = await fetch(`/api/events/${eventId}`);
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching event by ID:', error);
//     }
// }

// // Delete an event
// async function deleteEvent(eventId) {
//     try {
//         const response = await fetch(`/api/events/${eventId}`, {
//             method: 'DELETE',
//         });
//         const result = await response.json();
//         if (result.message) {
//             alert(result.message);
//             fetchEvents(); // Reload the events after deletion
//         }
//     } catch (error) {
//         console.error('Error deleting event:', error);
//     }
// }
// API call to fetch all events
// async function fetchEvents() {
//     try {
//         const response = await fetch('http://127.0.0.1:5000/api/events'); // Updated to use backend URL
//         const events = await response.json();
//         displayEvents(events);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//     }
// }

// // Display events on the page
// function displayEvents(events) {
//     const eventList = document.getElementById('event-list');
//     eventList.innerHTML = '';

//     events.forEach(event => {
//         const eventElement = document.createElement('div');
//         eventElement.classList.add('event-item');
//         eventElement.innerHTML = `
//             <h3>${event.name}</h3>
//             <p>${event.description}</p>
//             <p>${event.location}</p>
//             <p>${new Date(event.date).toLocaleDateString()}</p>
//             <button onclick="editEvent(${event._id})">Edit</button>
//             <button onclick="deleteEvent(${event._id})">Delete</button>
//         `;
//         eventList.appendChild(eventElement);
//     });
// }

// // Add a new event
// async function addEvent(eventData) {
//     try {
//         const response = await fetch('http://127.0.0.1:5000/api/events', { // Updated to use backend URL
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(eventData),
//         });

//         const result = await response.json();

//         if (result.message) {
//             alert(result.message);
//             fetchEvents(); // Refresh the events after adding
//         }
//     } catch (error) {
//         console.error('Error adding event:', error);
//     }
// }

// // Edit an existing event
// async function editEvent(eventId) {
//     // Fetch event details, fill form, and allow editing
//     const event = await fetchEventById(eventId);
//     document.getElementById('event-name').value = event.name;
//     document.getElementById('event-description').value = event.description;
//     document.getElementById('event-location').value = event.location;
//     document.getElementById('event-date').value = event.date;
// }

// // Fetch an event by ID
// async function fetchEventById(eventId) {
//     try {
//         const response = await fetch(`http://127.0.0.1:5000/api/events/${eventId}`); // Updated to use backend URL
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching event by ID:', error);
//     }
// }

// // Delete an event
// async function deleteEvent(eventId) {
//     try {
//         const response = await fetch(`http://127.0.0.1:5000/api/events/${eventId}`, {
//             method: 'DELETE',
//         });

//         const result = await response.json();

//         if (result.message) {
//             alert(result.message);
//             fetchEvents(); // Refresh the events after deletion
//         }
//     } catch (error) {
//         console.error('Error deleting event:', error);
//     }
// }

// // Initialize and load all events when the page loads
// document.addEventListener('DOMContentLoaded', () => {
//     fetchEvents();
// });

// // Handle form submission to add event
// document.getElementById('event-form').addEventListener('submit', (e) => {
//     e.preventDefault();

//     // Gather form data
//     const eventData = {
//         name: document.getElementById('event-name').value,
//         description: document.getElementById('event-description').value,
//         location: document.getElementById('event-location').value,
//         date: document.getElementById('event-date').value,
//     };

//     addEvent(eventData); // Call the function to add the event
// });
// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements
    const viewEventsButton = document.getElementById('view-events-btn');
    const addEventsButton = document.getElementById('add-events-btn');
    const eventManagementSection = document.getElementById('event-management-section');
    const viewEventsSection = document.getElementById('view-events-section');
    const addEventsSection = document.getElementById('add-events-section');
    const eventForm = document.getElementById('event-form');
    const eventList = document.getElementById('event-list');

    // Display the event management section
    const eventManagementLink = document.querySelector('a[href="event-management.html"]');
    if (eventManagementLink) {
        eventManagementLink.addEventListener('click', (e) => {
            e.preventDefault();
            eventManagementSection.style.display = 'block';
        });
    }

    // Show the "View Events" section and hide others
    viewEventsButton?.addEventListener('click', async () => {
        viewEventsSection.style.display = 'block';
        addEventsSection.style.display = 'none';
        await fetchEvents(); // Fetch and display events
    });

    // Show the "Add Events" section and hide others
    addEventsButton?.addEventListener('click', () => {
        addEventsSection.style.display = 'block';
        viewEventsSection.style.display = 'none';
    });

    // Handle the event form submission
    eventForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const eventData = {
            name: document.getElementById('event-name').value,
            description: document.getElementById('event-description').value,
            location: document.getElementById('event-location').value,
            date: document.getElementById('event-date').value,
        };

        try {
            await addEvent(eventData);
            alert('Event added successfully!');
            eventForm.reset();
            addEventsSection.style.display = 'none'; // Optionally hide form
            viewEventsSection.style.display = 'block'; // Show events list
            await fetchEvents(); // Refresh event list
        } catch (error) {
            console.error('Error adding event:', error);
            alert('Failed to add event. Please try again.');
        }
    });

    // Fetch events from the backend
    async function fetchEvents() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/events');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const events = await response.json();

            // Clear the existing event list
            eventList.innerHTML = '';

            // Display events
            if (events.length === 0) {
                eventList.innerHTML = '<p>No events found.</p>';
            } else {
                events.forEach((event) => {
                    const eventItem = document.createElement('div');
                    eventItem.classList.add('event-item');
                    eventItem.innerHTML = `
                        <h3>${event.name}</h3>
                        <p><strong>Description:</strong> ${event.description || 'N/A'}</p>
                        <p><strong>Location:</strong> ${event.location}</p>
                        <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                    `;
                    eventList.appendChild(eventItem);
                });
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            alert('Failed to fetch events. Please try again.');
        }
    }

    // Add a new event to the backend
    async function addEvent(eventData) {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        } catch (error) {
            console.error('Error adding event:', error);
            throw error;
        }
    }
});
