// Task Planning Module

// Initialize the Task Planning page
function initializeTaskPlanningPage() {
    // Add event listeners for buttons
    const addTaskBtn = document.querySelector('#taskPlanning-content .add-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', showAddTaskForm);
    }
    
    // Add event listeners for task items
    const taskItems = document.querySelectorAll('#taskPlanning-content .task-item');
    taskItems.forEach(task => {
        task.addEventListener('click', function() {
            const taskName = this.querySelector('h4').textContent;
            showEditTaskForm(taskName);
        });
    });
}

// Show form to add a new task
function showAddTaskForm() {
    // Create modal for adding a new task
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Create New Task</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <form id="add-task-form">
                    <div class="form-group">
                        <label for="task-title">Task Title:</label>
                        <input type="text" id="task-title" required>
                    </div>
                    <div class="form-group">
                        <label for="target-planet">Target Planet:</label>
                        <select id="target-planet">
                            <option value="">Select Planet</option>
                            <option value="tatooine">Tatooine</option>
                            <option value="hoth">Hoth</option>
                            <option value="endor">Endor</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="task-objectives">Task Objectives:</label>
                        <textarea id="task-objectives" placeholder="Enter objectives, one per line"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="start-time">Start Time:</label>
                        <input type="datetime-local" id="start-time" required>
                    </div>
                    <div class="form-group">
                        <label for="end-time">End Time:</label>
                        <input type="datetime-local" id="end-time" required>
                    </div>
                    <div class="form-group">
                        <label>Assigned Units:</label>
                        <div class="units-selection">
                            <div class="unit-option">
                                <input type="checkbox" id="unit-a" name="units" value="unit-a">
                                <label for="unit-a">Unit A</label>
                            </div>
                            <div class="unit-option">
                                <input type="checkbox" id="unit-b" name="units" value="unit-b">
                                <label for="unit-b">Unit B</label>
                            </div>
                            <div class="unit-option">
                                <input type="checkbox" id="unit-c" name="units" value="unit-c">
                                <label for="unit-c">Unit C</label>
                            </div>
                        </div>
                    </div>
                    <div class="conflict-warning hidden">
                        <p>⚠️ Unit A has been assigned to Task 2, time 09:00 - 10:30. Please reassign or adjust task time.</p>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="submit-btn">Create Task</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners for the modal
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const cancelBtn = modal.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Add event listeners for unit selection to check for conflicts
    const unitCheckboxes = modal.querySelectorAll('input[name="units"]');
    unitCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkForConflicts);
    });
    
    // Add event listeners for time inputs to check for conflicts
    const timeInputs = modal.querySelectorAll('input[type="datetime-local"]');
    timeInputs.forEach(input => {
        input.addEventListener('change', checkForConflicts);
    });
    
    const form = modal.querySelector('#add-task-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, this would send data to the server
        // For now, we'll just close the modal
        document.body.removeChild(modal);
        // Show success message
        showNotification('Task created successfully!', 'success');
        // Refresh the task timeline
        refreshTaskTimeline();
    });
}

// Show form to edit an existing task
function showEditTaskForm(taskName) {
    // This would typically fetch the task data from the server
    // For now, we'll use mock data
    const taskData = {
        title: taskName,
        targetPlanet: 'tatooine',
        objectives: 'Objective 1\nObjective 2',
        startTime: '2023-05-15T09:00',
        endTime: '2023-05-15T10:30',
        assignedUnits: ['unit-a']
    };
    
    // Create modal for editing the task
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Task: ${taskName}</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <form id="edit-task-form">
                    <div class="form-group">
                        <label for="task-title">Task Title:</label>
                        <input type="text" id="task-title" value="${taskData.title}" required>
                    </div>
                    <div class="form-group">
                        <label for="target-planet">Target Planet:</label>
                        <select id="target-planet">
                            <option value="">Select Planet</option>
                            <option value="tatooine" ${taskData.targetPlanet === 'tatooine' ? 'selected' : ''}>Tatooine</option>
                            <option value="hoth" ${taskData.targetPlanet === 'hoth' ? 'selected' : ''}>Hoth</option>
                            <option value="endor" ${taskData.targetPlanet === 'endor' ? 'selected' : ''}>Endor</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="task-objectives">Task Objectives:</label>
                        <textarea id="task-objectives" placeholder="Enter objectives, one per line">${taskData.objectives}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="start-time">Start Time:</label>
                        <input type="datetime-local" id="start-time" value="${taskData.startTime}" required>
                    </div>
                    <div class="form-group">
                        <label for="end-time">End Time:</label>
                        <input type="datetime-local" id="end-time" value="${taskData.endTime}" required>
                    </div>
                    <div class="form-group">
                        <label>Assigned Units:</label>
                        <div class="units-selection">
                            <div class="unit-option">
                                <input type="checkbox" id="unit-a" name="units" value="unit-a" ${taskData.assignedUnits.includes('unit-a') ? 'checked' : ''}>
                                <label for="unit-a">Unit A</label>
                            </div>
                            <div class="unit-option">
                                <input type="checkbox" id="unit-b" name="units" value="unit-b" ${taskData.assignedUnits.includes('unit-b') ? 'checked' : ''}>
                                <label for="unit-b">Unit B</label>
                            </div>
                            <div class="unit-option">
                                <input type="checkbox" id="unit-c" name="units" value="unit-c" ${taskData.assignedUnits.includes('unit-c') ? 'checked' : ''}>
                                <label for="unit-c">Unit C</label>
                            </div>
                        </div>
                    </div>
                    <div class="conflict-warning hidden">
                        <p>⚠️ Unit A has been assigned to Task 2, time 09:00 - 10:30. Please reassign or adjust task time.</p>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="delete-btn">Delete Task</button>
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="submit-btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners for the modal
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const cancelBtn = modal.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const deleteBtn = modal.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete task "${taskName}"?`)) {
            document.body.removeChild(modal);
            // Show success message
            showNotification(`Task "${taskName}" deleted successfully!`, 'success');
            // Refresh the task timeline
            refreshTaskTimeline();
        }
    });
    
    // Add event listeners for unit selection to check for conflicts
    const unitCheckboxes = modal.querySelectorAll('input[name="units"]');
    unitCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkForConflicts);
    });
    
    // Add event listeners for time inputs to check for conflicts
    const timeInputs = modal.querySelectorAll('input[type="datetime-local"]');
    timeInputs.forEach(input => {
        input.addEventListener('change', checkForConflicts);
    });
    
    const form = modal.querySelector('#edit-task-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, this would send data to the server
        // For now, we'll just close the modal
        document.body.removeChild(modal);
        // Show success message
        showNotification(`Task "${taskName}" updated successfully!`, 'success');
        // Refresh the task timeline
        refreshTaskTimeline();
    });
}

// Check for scheduling conflicts
function checkForConflicts() {
    // In a real application, this would check for conflicts with the server
    // For now, we'll just simulate a conflict for Unit A
    const unitACheckbox = document.querySelector('#unit-a');
    const startTimeInput = document.querySelector('#start-time');
    const endTimeInput = document.querySelector('#end-time');
    const conflictWarning = document.querySelector('.conflict-warning');
    
    if (unitACheckbox && unitACheckbox.checked && startTimeInput && endTimeInput) {
        const startTime = new Date(startTimeInput.value);
        const endTime = new Date(endTimeInput.value);
        
        // Simulate a conflict for Unit A between 9:00 and 10:30
        const conflictStart = new Date(startTime);
        conflictStart.setHours(9, 0, 0);
        const conflictEnd = new Date(startTime);
        conflictEnd.setHours(10, 30, 0);
        
        if ((startTime <= conflictEnd && endTime >= conflictStart)) {
            conflictWarning.classList.remove('hidden');
        } else {
            conflictWarning.classList.add('hidden');
        }
    } else if (conflictWarning) {
        conflictWarning.classList.add('hidden');
    }
}

// Refresh the task timeline
function refreshTaskTimeline() {
    // In a real application, this would fetch updated task data from the server
    // For now, we'll just log a message
    console.log('Task timeline refreshed');
}

// Show a notification message
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}
