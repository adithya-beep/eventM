// API call to fetch tasks for a specific event
async function fetchTasks(eventId) {
    try {
        const response = await fetch(`/api/tasks/event/${eventId}`);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Display tasks on the page
function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        taskElement.innerHTML = `
            <h4>${task.name}</h4>
            <p>Deadline: ${new Date(task.deadline).toLocaleDateString()}</p>
            <p>Status: ${task.status}</p>
            <button onclick="updateTaskStatus(${task._id})">Update Status</button>
        `;
        taskList.appendChild(taskElement);
    });
}

// Add a new task to an event
async function addTask(taskData) {
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        const result = await response.json();
        if (result.message) {
            alert(result.message);
            fetchTasks(taskData.eventId);
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Update the status of a task
async function updateTaskStatus(taskId) {
    const status = prompt('Enter the new status (Pending/Completed):');
    if (status) {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        const result = await response.json();
        alert(result.message);
        fetchTasks(result.eventId); // Refresh task list
    }
}

// Initialize and load tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const eventId = new URLSearchParams(window.location.search).get('eventId');
    if (eventId) {
        fetchTasks(eventId);
    }
});
