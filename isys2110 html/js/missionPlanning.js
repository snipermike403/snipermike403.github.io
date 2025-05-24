// Mission Planning Module

// Initialize the Mission Planning page
function initializeMissionPlanningPage() {
    // Add event listeners for buttons
    const addMissionBtn = document.querySelector('#missionPlanning-content .add-btn');
    if (addMissionBtn) {
        addMissionBtn.addEventListener('click', showAddMissionForm);
    }

    // Add event listeners for mission items
    const missionItems = document.querySelectorAll('#missionPlanning-content .task-item');
    missionItems.forEach(mission => {
        mission.addEventListener('click', function() {
            const missionName = this.querySelector('h4').textContent;
            showEditMissionForm(missionName);
        });
    });
}

// Show form to add a new mission
function showAddMissionForm() {
    // Create modal for adding a new mission
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Create New Mission</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <form id="add-mission-form">
                    <div class="form-group">
                        <label for="mission-title">Mission Title:</label>
                        <input type="text" id="mission-title" required>
                    </div>
                    <div class="form-group">
                        <label for="target-planet">Target Planet:</label>
                        <select id="target-planet">
                            <option value="">Select Planet</option>
                            <option value="tatooine">Tatooine</option>
                            <option value="hoth">Hoth</option>
                            <option value="endor">Endor</option>
                            <option value="naboo">Naboo</option>
                            <option value="coruscant">Coruscant</option>
                            <option value="mustafar">Mustafar</option>
                            <option value="kashyyyk">Kashyyyk</option>
                            <option value="dagobah">Dagobah</option>
                            <option value="bespin">Bespin</option>
                            <option value="kamino">Kamino</option>
                            <option value="geonosis">Geonosis</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mission-objectives">Mission Objectives:</label>
                        <textarea id="mission-objectives" placeholder="Enter objectives, one per line"></textarea>
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
                        <p>⚠️ Unit A has been assigned to Mission 2, time 09:00 - 10:30. Please reassign or adjust mission time.</p>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="submit-btn">Create Mission</button>
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

    const form = modal.querySelector('#add-mission-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const missionTitle = document.getElementById('mission-title').value;
        const targetPlanet = document.getElementById('target-planet').value;
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;
        const selectedUnits = Array.from(document.querySelectorAll('input[name="units"]:checked')).map(cb => cb.value);

        // Add the new mission to the timeline
        addMissionToTimeline(missionTitle, targetPlanet, startTime, endTime, selectedUnits);

        // Close the modal
        document.body.removeChild(modal);

        // Show success message
        showNotification('Mission created successfully!', 'success');

        // Refresh the mission timeline
        refreshMissionTimeline();
    });
}

// Show form to edit an existing mission
function showEditMissionForm(missionName) {
    // This would typically fetch the mission data from the server
    // For now, we'll use mock data
    const missionData = {
        title: missionName,
        targetPlanet: 'tatooine',
        objectives: 'Objective 1\nObjective 2',
        startTime: '2023-05-15T09:00',
        endTime: '2023-05-15T10:30',
        assignedUnits: ['unit-a']
    };

    // Create modal for editing the mission
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Mission: ${missionName}</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <form id="edit-mission-form">
                    <div class="form-group">
                        <label for="mission-title">Mission Title:</label>
                        <input type="text" id="mission-title" value="${missionData.title}" required>
                    </div>
                    <div class="form-group">
                        <label for="target-planet">Target Planet:</label>
                        <select id="target-planet">
                            <option value="">Select Planet</option>
                            <option value="tatooine" ${missionData.targetPlanet === 'tatooine' ? 'selected' : ''}>Tatooine</option>
                            <option value="hoth" ${missionData.targetPlanet === 'hoth' ? 'selected' : ''}>Hoth</option>
                            <option value="endor" ${missionData.targetPlanet === 'endor' ? 'selected' : ''}>Endor</option>
                            <option value="naboo" ${missionData.targetPlanet === 'naboo' ? 'selected' : ''}>Naboo</option>
                            <option value="coruscant" ${missionData.targetPlanet === 'coruscant' ? 'selected' : ''}>Coruscant</option>
                            <option value="mustafar" ${missionData.targetPlanet === 'mustafar' ? 'selected' : ''}>Mustafar</option>
                            <option value="kashyyyk" ${missionData.targetPlanet === 'kashyyyk' ? 'selected' : ''}>Kashyyyk</option>
                            <option value="dagobah" ${missionData.targetPlanet === 'dagobah' ? 'selected' : ''}>Dagobah</option>
                            <option value="bespin" ${missionData.targetPlanet === 'bespin' ? 'selected' : ''}>Bespin</option>
                            <option value="kamino" ${missionData.targetPlanet === 'kamino' ? 'selected' : ''}>Kamino</option>
                            <option value="geonosis" ${missionData.targetPlanet === 'geonosis' ? 'selected' : ''}>Geonosis</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mission-objectives">Mission Objectives:</label>
                        <textarea id="mission-objectives" placeholder="Enter objectives, one per line">${missionData.objectives}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="start-time">Start Time:</label>
                        <input type="datetime-local" id="start-time" value="${missionData.startTime}" required>
                    </div>
                    <div class="form-group">
                        <label for="end-time">End Time:</label>
                        <input type="datetime-local" id="end-time" value="${missionData.endTime}" required>
                    </div>
                    <div class="form-group">
                        <label>Assigned Units:</label>
                        <div class="units-selection">
                            <div class="unit-option">
                                <input type="checkbox" id="unit-a" name="units" value="unit-a" ${missionData.assignedUnits.includes('unit-a') ? 'checked' : ''}>
                                <label for="unit-a">Unit A</label>
                            </div>
                            <div class="unit-option">
                                <input type="checkbox" id="unit-b" name="units" value="unit-b" ${missionData.assignedUnits.includes('unit-b') ? 'checked' : ''}>
                                <label for="unit-b">Unit B</label>
                            </div>
                            <div class="unit-option">
                                <input type="checkbox" id="unit-c" name="units" value="unit-c" ${missionData.assignedUnits.includes('unit-c') ? 'checked' : ''}>
                                <label for="unit-c">Unit C</label>
                            </div>
                        </div>
                    </div>
                    <div class="conflict-warning hidden">
                        <p>⚠️ Unit A has been assigned to Mission 2, time 09:00 - 10:30. Please reassign or adjust mission time.</p>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="delete-btn">Delete Mission</button>
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
        if (confirm(`Are you sure you want to delete mission "${missionName}"?`)) {
            document.body.removeChild(modal);
            // Show success message
            showNotification(`Mission "${missionName}" deleted successfully!`, 'success');
            // Refresh the mission timeline
            refreshMissionTimeline();
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

    const form = modal.querySelector('#edit-mission-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, this would send data to the server
        // For now, we'll just close the modal
        document.body.removeChild(modal);
        // Show success message
        showNotification(`Mission "${missionName}" updated successfully!`, 'success');
        // Refresh the mission timeline
        refreshMissionTimeline();
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

// Add mission to timeline
function addMissionToTimeline(missionTitle, targetPlanet, startTime, endTime, selectedUnits) {
    // Parse the start and end times
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Calculate position and width for the timeline
    const startHour = startDate.getHours() + (startDate.getMinutes() / 60);
    const endHour = endDate.getHours() + (endDate.getMinutes() / 60);
    const duration = endHour - startHour;

    // Calculate position as percentage (assuming 8:00 to 18:00 timeline = 10 hours)
    const timelineStart = 8; // 8:00 AM
    const timelineEnd = 18; // 6:00 PM
    const timelineRange = timelineEnd - timelineStart;

    // Ensure the mission is within the timeline range
    let leftPosition = Math.max(0, ((startHour - timelineStart) / timelineRange) * 100);
    let width = Math.min(100 - leftPosition, (duration / timelineRange) * 100);

    // Minimum width for visibility
    if (width < 5) {
        width = 5;
    }

    // Format time display
    const startTimeStr = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const endTimeStr = endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const dateStr = startDate.toLocaleDateString('en-US');

    // Add mission to each selected unit's timeline row
    selectedUnits.forEach(unitValue => {
        const unitLabel = unitValue.replace('unit-', 'Unit ').toUpperCase();

        // Find or create the timeline row for this unit
        let timelineRow = null;
        const unitLabels = document.querySelectorAll('.timeline-row .unit-label');
        unitLabels.forEach(label => {
            if (label.textContent.trim() === unitLabel) {
                timelineRow = label;
            }
        });

        if (!timelineRow) {
            // Create new timeline row if it doesn't exist
            const timelineContent = document.querySelector('.timeline-content');
            const newRow = document.createElement('div');
            newRow.className = 'timeline-row';
            newRow.innerHTML = `
                <div class="unit-label">${unitLabel}</div>
                <div class="timeline-tasks"></div>
            `;
            timelineContent.appendChild(newRow);
            timelineRow = newRow.querySelector('.unit-label');
        }

        // Get the timeline tasks container for this unit
        const timelineTasks = timelineRow.parentElement.querySelector('.timeline-tasks');

        // Create the new mission item
        const missionItem = document.createElement('div');
        missionItem.className = 'task-item';
        missionItem.style.position = 'absolute';
        missionItem.style.left = `${leftPosition}%`;
        missionItem.style.width = `${width}%`;
        missionItem.style.height = '100%';
        missionItem.style.backgroundColor = 'var(--hologram-blue)';
        missionItem.style.borderRadius = '4px';
        missionItem.style.cursor = 'pointer';
        missionItem.style.overflow = 'hidden';
        missionItem.style.transition = 'transform 0.2s';
        missionItem.innerHTML = `
            <div class="task-content">
                <h4>${missionTitle}</h4>
                <p>${dateStr} ${startTimeStr} - ${endTimeStr}</p>
            </div>
        `;

        // Add hover effect
        missionItem.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.zIndex = '10';
        });

        missionItem.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });

        // Add click event to edit the mission
        missionItem.addEventListener('click', function() {
            showEditMissionForm(missionTitle);
        });

        // Add the mission item to the timeline
        timelineTasks.appendChild(missionItem);
    });

    // Also update the dashboard with the new mission
    updateDashboardMissions(missionTitle, `${dateStr} ${startTimeStr} - ${endTimeStr}`);
}

// Update dashboard missions
function updateDashboardMissions(missionTitle, timeStr) {
    const upcomingTasksList = document.querySelector('.upcoming-tasks .task-list');
    if (upcomingTasksList) {
        const newMissionItem = document.createElement('li');
        newMissionItem.innerHTML = `
            <span class="task-name">${missionTitle}</span>
            <span class="task-time">${timeStr}</span>
        `;
        upcomingTasksList.appendChild(newMissionItem);

        // Update the active missions count
        const activeMissionsElement = document.querySelector('.task-stat .stat-value');
        if (activeMissionsElement) {
            const currentCount = parseInt(activeMissionsElement.textContent);
            activeMissionsElement.textContent = currentCount + 1;
        }
    }
}

// Refresh the mission timeline
function refreshMissionTimeline() {
    // In a real application, this would fetch updated mission data from the server
    // For now, we'll just log a message
    console.log('Mission timeline refreshed');
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
