// Reporting Module

// Initialize the Reporting page
function initializeReportingPage() {
    // Add event listeners for buttons
    const generateReportBtn = document.querySelector('#reporting-content .generate-btn');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', showGenerateReportForm);
    }
    
    const exportBtn = document.querySelector('#reporting-content .export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportReports);
    }
    
    const searchBtn = document.querySelector('#reporting-content .search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', applyReportFilters);
    }
    
    // Add event listeners for view buttons in the reports table
    const viewButtons = document.querySelectorAll('#reporting-content .view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const missionName = row.cells[1].textContent;
            showReportDetails(missionName);
        });
    });
    
    // Add event listeners for export buttons in the reports table
    const rowExportButtons = document.querySelectorAll('#reporting-content .reports-table .export-btn');
    rowExportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const missionName = row.cells[1].textContent;
            exportSingleReport(missionName);
        });
    });
}

// Show form to generate a new report
function showGenerateReportForm() {
    // Create modal for generating a new report
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Generate New Report</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <form id="generate-report-form">
                    <div class="form-group">
                        <label for="report-type">Report Type:</label>
                        <select id="report-type" required>
                            <option value="">Select Report Type</option>
                            <option value="mission">Mission Report</option>
                            <option value="resource">Resource Usage Report</option>
                            <option value="communication">Communication Log</option>
                            <option value="summary">Summary Report</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="date-range">Date Range:</label>
                        <div class="date-range-inputs">
                            <input type="date" id="start-date" required>
                            <span>to</span>
                            <input type="date" id="end-date" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="include-missions">Include Missions:</label>
                        <select id="include-missions" multiple>
                            <option value="mission1">Target Empire Ads</option>
                            <option value="mission2">Patrol X Zone</option>
                            <option value="mission3">Reconnaissance Mission</option>
                        </select>
                        <small>Hold Ctrl/Cmd to select multiple missions</small>
                    </div>
                    <div class="form-group">
                        <label for="include-resources">Include Resources:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-option">
                                <input type="checkbox" id="include-fuel" name="resources" value="fuel" checked>
                                <label for="include-fuel">Fuel</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="include-robots" name="resources" value="robots" checked>
                                <label for="include-robots">Robots</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="include-ammunition" name="resources" value="ammunition" checked>
                                <label for="include-ammunition">Ammunition</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="include-energy" name="resources" value="energy" checked>
                                <label for="include-energy">Energy</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="report-format">Output Format:</label>
                        <select id="report-format">
                            <option value="html">HTML</option>
                            <option value="pdf">PDF</option>
                            <option value="csv">CSV</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="submit-btn">Generate Report</button>
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
    
    const form = modal.querySelector('#generate-report-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, this would send data to the server
        // For now, we'll just close the modal
        document.body.removeChild(modal);
        // Show success message
        showNotification('Report generated successfully!', 'success');
        // Refresh the reports table
        refreshReportsTable();
    });
}

// Show details for a specific report
function showReportDetails(missionName) {
    // This would typically fetch the report data from the server
    // For now, we'll use mock data
    const reportData = {
        missionName: missionName,
        date: '2023-05-15',
        result: 'Completed',
        resourcesUsed: {
            fuel: '25%',
            robots: 3,
            ammunition: '0%',
            energy: '10%'
        },
        missionReport: 'Mission completed successfully. All objectives were met within the allocated time frame. No resistance encountered.',
        resourceUsage: 'Fuel consumption was within expected parameters. Three robot units were deployed and returned without damage. Energy usage was minimal.',
        communicationLog: '09:00 - Mission initiated\n09:15 - Units deployed to target area\n10:15 - Primary objective completed\n10:25 - Units returning to base\n10:30 - Mission completed'
    };
    
    // Create modal for viewing report details
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h3>Report Details: ${missionName}</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <div class="report-summary">
                    <div class="summary-row">
                        <span class="summary-label">Mission:</span>
                        <span class="summary-value">${reportData.missionName}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Date:</span>
                        <span class="summary-value">${reportData.date}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Result:</span>
                        <span class="summary-value">${reportData.result}</span>
                    </div>
                </div>
                
                <div class="report-sections">
                    <div class="report-section">
                        <h4>Mission Report</h4>
                        <p>${reportData.missionReport}</p>
                    </div>
                    
                    <div class="report-section">
                        <h4>Resource Usage</h4>
                        <p>${reportData.resourceUsage}</p>
                        <div class="resource-usage-details">
                            <div class="resource-usage-item">
                                <span class="resource-label">Fuel:</span>
                                <span class="resource-value">${reportData.resourcesUsed.fuel}</span>
                            </div>
                            <div class="resource-usage-item">
                                <span class="resource-label">Robots:</span>
                                <span class="resource-value">${reportData.resourcesUsed.robots} units</span>
                            </div>
                            <div class="resource-usage-item">
                                <span class="resource-label">Ammunition:</span>
                                <span class="resource-value">${reportData.resourcesUsed.ammunition}</span>
                            </div>
                            <div class="resource-usage-item">
                                <span class="resource-label">Energy:</span>
                                <span class="resource-value">${reportData.resourcesUsed.energy}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-section">
                        <h4>Communication Log</h4>
                        <pre class="communication-log">${reportData.communicationLog}</pre>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="export-report-btn">Export Report</button>
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
    
    const exportReportBtn = modal.querySelector('.export-report-btn');
    exportReportBtn.addEventListener('click', () => {
        exportSingleReport(missionName);
    });
}

// Export all filtered reports
function exportReports() {
    // Create modal for export options
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Export Reports</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <form id="export-form">
                    <div class="form-group">
                        <label for="export-format">Export Format:</label>
                        <select id="export-format">
                            <option value="pdf">PDF</option>
                            <option value="csv">CSV</option>
                            <option value="excel">Excel</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Include Sections:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-option">
                                <input type="checkbox" id="include-mission-report" name="sections" value="mission-report" checked>
                                <label for="include-mission-report">Mission Report</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="include-resource-usage" name="sections" value="resource-usage" checked>
                                <label for="include-resource-usage">Resource Usage</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="include-communication-log" name="sections" value="communication-log" checked>
                                <label for="include-communication-log">Communication Log</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="submit-btn">Export</button>
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
    
    const form = modal.querySelector('#export-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, this would export the reports
        // For now, we'll just close the modal
        document.body.removeChild(modal);
        // Show success message
        showNotification('Reports exported successfully!', 'success');
    });
}

// Export a single report
function exportSingleReport(missionName) {
    // Create modal for export options
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Export Report: ${missionName}</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <form id="export-single-form">
                    <div class="form-group">
                        <label for="export-format">Export Format:</label>
                        <select id="export-format">
                            <option value="pdf">PDF</option>
                            <option value="csv">CSV</option>
                            <option value="excel">Excel</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Include Sections:</label>
                        <div class="checkbox-group">
                            <div class="checkbox-option">
                                <input type="checkbox" id="include-mission-report" name="sections" value="mission-report" checked>
                                <label for="include-mission-report">Mission Report</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="include-resource-usage" name="sections" value="resource-usage" checked>
                                <label for="include-resource-usage">Resource Usage</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="include-communication-log" name="sections" value="communication-log" checked>
                                <label for="include-communication-log">Communication Log</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="submit-btn">Export</button>
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
    
    const form = modal.querySelector('#export-single-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, this would export the report
        // For now, we'll just close the modal
        document.body.removeChild(modal);
        // Show success message
        showNotification(`Report "${missionName}" exported successfully!`, 'success');
    });
}

// Apply filters to the reports table
function applyReportFilters() {
    // In a real application, this would filter the reports based on the selected criteria
    // For now, we'll just show a notification
    showNotification('Filters applied!', 'success');
    // Refresh the reports table
    refreshReportsTable();
}

// Refresh the reports table
function refreshReportsTable() {
    // In a real application, this would fetch updated report data from the server
    // For now, we'll just log a message
    console.log('Reports table refreshed');
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
