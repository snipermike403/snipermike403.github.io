// Resource Management Module

// Initialize the Resource Management page
function initializeResourceManagementPage() {
    // Add event listeners for buttons
    const addResourceBtn = document.querySelector('#resourceManagement-content .add-btn');
    if (addResourceBtn) {
        addResourceBtn.addEventListener('click', showAddResourceForm);
    }
    
    // Add event listeners for resource items
    const resourceItems = document.querySelectorAll('#resourceManagement-content .resource-item');
    resourceItems.forEach(item => {
        item.addEventListener('click', function() {
            const resourceLabel = this.querySelector('.resource-label').textContent;
            showEditResourceForm(resourceLabel);
        });
    });
    
    // Add event listeners for alert items
    const alertItems = document.querySelectorAll('#resourceManagement-content .alert-item');
    alertItems.forEach(item => {
        item.addEventListener('click', function() {
            const alertTitle = this.querySelector('h5').textContent;
            showAlertDetails(alertTitle);
        });
    });
}

// Show form to add a new resource
function showAddResourceForm() {
    // Create modal for adding a new resource
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add Resource</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <form id="add-resource-form">
                    <div class="form-group">
                        <label for="resource-type">Resource Type:</label>
                        <select id="resource-type" required>
                            <option value="">Select Resource Type</option>
                            <option value="fuel">Fuel</option>
                            <option value="robots">Robots</option>
                            <option value="ammunition">Ammunition</option>
                            <option value="energy">Energy</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="resource-amount">Amount:</label>
                        <input type="number" id="resource-amount" min="1" required>
                    </div>
                    <div class="form-group">
                        <label for="resource-notes">Notes:</label>
                        <textarea id="resource-notes" placeholder="Optional notes about this resource addition"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="submit-btn">Add Resource</button>
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
    
    const form = modal.querySelector('#add-resource-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, this would send data to the server
        // For now, we'll just close the modal
        document.body.removeChild(modal);
        // Show success message
        showNotification('Resource added successfully!', 'success');
        // Refresh the resource display
        refreshResourceDisplay();
    });
}

// Show form to edit an existing resource
function showEditResourceForm(resourceName) {
    // This would typically fetch the resource data from the server
    // For now, we'll use mock data
    const resourceData = {
        name: resourceName,
        currentLevel: resourceName === 'Fuel' ? 75 : 
                     resourceName === 'Robots' ? 45 : 
                     resourceName === 'Ammunition' ? 90 : 15,
        threshold: resourceName === 'Fuel' ? 20 : 
                  resourceName === 'Robots' ? 30 : 
                  resourceName === 'Ammunition' ? 50 : 20,
        notes: `Current ${resourceName.toLowerCase()} levels and thresholds.`
    };
    
    // Create modal for editing the resource
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Resource: ${resourceName}</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <form id="edit-resource-form">
                    <div class="form-group">
                        <label for="resource-name">Resource Name:</label>
                        <input type="text" id="resource-name" value="${resourceData.name}" readonly>
                    </div>
                    <div class="form-group">
                        <label for="current-level">Current Level (%):</label>
                        <input type="number" id="current-level" value="${resourceData.currentLevel}" min="0" max="100" required>
                    </div>
                    <div class="form-group">
                        <label for="threshold-level">Threshold Level (%):</label>
                        <input type="number" id="threshold-level" value="${resourceData.threshold}" min="0" max="100" required>
                    </div>
                    <div class="form-group">
                        <label for="resource-notes">Notes:</label>
                        <textarea id="resource-notes">${resourceData.notes}</textarea>
                    </div>
                    <div class="form-actions">
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
    
    const form = modal.querySelector('#edit-resource-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, this would send data to the server
        // For now, we'll just close the modal
        document.body.removeChild(modal);
        // Show success message
        showNotification(`Resource "${resourceName}" updated successfully!`, 'success');
        // Refresh the resource display
        refreshResourceDisplay();
    });
}

// Show details for an alert
function showAlertDetails(alertTitle) {
    // This would typically fetch the alert data from the server
    // For now, we'll use mock data
    const alertData = {
        title: alertTitle,
        timestamp: new Date().toISOString(),
        description: alertTitle === 'Energy reserves critically low' ? 
                    'Energy levels have fallen below the critical threshold of 20%. Current level: 15%.' : 
                    'Scheduled maintenance is required for 5 robot units.',
        severity: alertTitle.includes('critically') ? 'critical' : 'warning',
        recommendations: alertTitle === 'Energy reserves critically low' ? 
                        'Reduce non-essential operations. Redirect power from secondary systems.' : 
                        'Schedule maintenance within the next 48 hours to prevent operational degradation.'
    };
    
    // Create modal for viewing alert details
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Alert Details</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <div class="alert-details ${alertData.severity}">
                    <div class="alert-header">
                        <span class="alert-icon">${alertData.severity === 'critical' ? '⚠️' : '⚠️'}</span>
                        <h4>${alertData.title}</h4>
                    </div>
                    <div class="alert-info">
                        <div class="detail-row">
                            <span class="detail-label">Timestamp:</span>
                            <span class="detail-value">${new Date(alertData.timestamp).toLocaleString()}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Severity:</span>
                            <span class="detail-value ${alertData.severity}">${alertData.severity.charAt(0).toUpperCase() + alertData.severity.slice(1)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Description:</span>
                            <span class="detail-value">${alertData.description}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Recommendations:</span>
                            <span class="detail-value">${alertData.recommendations}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="acknowledge-btn">Acknowledge Alert</button>
                    <button class="close-modal-btn">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners for the modal
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const closeModalBtn = modal.querySelector('.close-modal-btn');
    closeModalBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const acknowledgeBtn = modal.querySelector('.acknowledge-btn');
    acknowledgeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        // Show success message
        showNotification(`Alert "${alertTitle}" acknowledged!`, 'success');
    });
}

// Refresh the resource display
function refreshResourceDisplay() {
    // In a real application, this would fetch updated resource data from the server
    // For now, we'll just log a message
    console.log('Resource display refreshed');
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
