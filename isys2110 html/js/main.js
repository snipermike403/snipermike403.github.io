// Main JavaScript for Death Star Dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    setupNavigation();

    // Initialize modules
    initializeDashboard();

    // Fix date picker format
    fixDatePickerFormat();
});

// Setup navigation between pages
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li');
    const viewAllLinks = document.querySelectorAll('.view-all');

    // Handle sidebar navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });

    // Handle "View All" links in dashboard cards
    viewAllLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

// Navigate to a specific page
function navigateToPage(page) {
    // Update active navigation link
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update page title
    const pageTitle = document.querySelector('.page-title h2');
    pageTitle.textContent = formatPageTitle(page);

    // Hide all content areas
    const contentAreas = document.querySelectorAll('.content-area');
    contentAreas.forEach(area => {
        area.classList.add('hidden');
    });

    // Show selected content area
    const selectedContent = document.getElementById(`${page}-content`);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');

        // Load content if it's empty
        if (selectedContent.innerHTML.trim() === '') {
            loadPageContent(page);
        }
    }
}

// Format page title from camelCase or dash-case
function formatPageTitle(page) {
    // Convert camelCase or dash-case to Title Case with spaces
    return page
        .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
        .replace(/-/g, ' ') // Replace dashes with spaces
        .replace(/^\w/, c => c.toUpperCase()) // Capitalize first letter
        .trim();
}

// Load content for a specific page
function loadPageContent(page) {
    const contentArea = document.getElementById(`${page}-content`);

    switch(page) {
        case 'dashboard':
            // For dashboard, we'll load both dashboard content and planet targets
            // The dashboard content is already loaded in the HTML
            break;
        case 'missionPlanning':
            loadMissionPlanningContent(contentArea);
            break;
        case 'resourceManagement':
            loadResourceManagementContent(contentArea);
            break;
        case 'reporting':
            loadReportingContent(contentArea);
            break;
        default:
            contentArea.innerHTML = `<h3>Content for ${formatPageTitle(page)} is not available.</h3>`;
    }
}

// Initialize dashboard with data
function initializeDashboard() {
    // This would typically fetch data from an API
    // For now, we're using static data defined in the HTML
    console.log('Dashboard initialized');

    // Load planet data directly into the dashboard
    loadPlanetData();

    // Add event listener for the "Add Planet" button in the dashboard
    const addPlanetBtn = document.getElementById('add-planet-btn');
    if (addPlanetBtn) {
        addPlanetBtn.addEventListener('click', function() {
            // Call the showAddPlanetForm function from planetaryTargets.js
            showAddPlanetForm();
        });
    }
}

// Load planet data into the dashboard
function loadPlanetData() {
    // Get the planet data from the planetaryTargets.js file
    // This function will be called when the dashboard is initialized
    console.log('Loading planet data into dashboard');

    // Add event listeners for the mini planet cards in the dashboard
    const editButtonsMini = document.querySelectorAll('.edit-btn-mini');
    if (editButtonsMini && editButtonsMini.length > 0) {
        editButtonsMini.forEach(button => {
            button.addEventListener('click', function() {
                const planetName = this.getAttribute('data-planet');
                showEditPlanetForm(planetName);
            });
        });
    }

    const viewButtonsMini = document.querySelectorAll('.view-btn-mini');
    if (viewButtonsMini && viewButtonsMini.length > 0) {
        viewButtonsMini.forEach(button => {
            button.addEventListener('click', function() {
                const planetName = this.getAttribute('data-planet');
                showPlanetDetails(planetName);
            });
        });
    }
}

// Fix date picker format to remove Chinese characters or use English format
function fixDatePickerFormat() {
    // Create a MutationObserver to watch for dynamically added date inputs
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // Check for any date inputs in the added nodes
                mutation.addedNodes.forEach(function(node) {
                    if (node.querySelectorAll) {
                        const dateInputs = node.querySelectorAll('input[type="date"], input[type="datetime-local"]');
                        dateInputs.forEach(setupDateInput);
                    }
                });
            }
        });
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Also handle any existing date inputs
    const dateInputs = document.querySelectorAll('input[type="date"], input[type="datetime-local"]');
    dateInputs.forEach(setupDateInput);
}

// Setup individual date input
function setupDateInput(input) {
    // Add an event listener to handle the input's appearance
    input.addEventListener('focus', function() {
        // When focused, add a class that we can use to style the input
        this.classList.add('date-focused');
    });

    input.addEventListener('blur', function() {
        // When blurred, remove the class
        this.classList.remove('date-focused');
    });

    // For datetime-local inputs, we can try to set the locale to English
    if (input.type === 'datetime-local') {
        // Set lang attribute to English
        input.setAttribute('lang', 'en');

        // Add a custom data attribute that we can use for styling
        input.setAttribute('data-formatted', 'true');
    }
}

// Load Planet Targets content
function loadPlanetTargetsContent(container) {
    container.innerHTML = `
        <div class="module-header">
            <h3>Planet Targets Management</h3>
            <button class="add-btn">+ Add Planet Target</button>
        </div>
        <div class="filter-bar">
            <div class="filter-group">
                <label>Status:</label>
                <select>
                    <option value="all">All</option>
                    <option value="high">High Threat</option>
                    <option value="medium">Medium Threat</option>
                    <option value="low">Low Threat</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Sector:</label>
                <select>
                    <option value="all">All Sectors</option>
                    <option value="outer-rim">Outer Rim</option>
                    <option value="mid-rim">Mid Rim</option>
                    <option value="inner-rim">Inner Rim</option>
                    <option value="core-worlds">Core Worlds</option>
                    <option value="unknown-regions">Unknown Regions</option>
                    <option value="wild-space">Wild Space</option>
                    <option value="expansion-region">Expansion Region</option>
                </select>
            </div>
            <button class="search-btn">Search</button>
        </div>
        <div class="planet-grid">
            <div class="planet-card">
                <div class="planet-header">
                    <h4>Tatooine</h4>
                    <span class="planet-threat high">High Threat</span>
                </div>
                <div class="planet-details">
                    <div class="detail-row">
                        <span class="detail-label">Sector:</span>
                        <span class="detail-value">Outer Rim</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Coordinates:</span>
                        <span class="detail-value">X: 134, Y: 89, Z: 23</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Defense Level:</span>
                        <span class="detail-value low">Low</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Population:</span>
                        <span class="detail-value">200,000</span>
                    </div>
                </div>
                <div class="planet-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="view-btn">View Details</button>
                </div>
            </div>

            <div class="planet-card">
                <div class="planet-header">
                    <h4>Hoth</h4>
                    <span class="planet-threat medium">Medium Threat</span>
                </div>
                <div class="planet-details">
                    <div class="detail-row">
                        <span class="detail-label">Sector:</span>
                        <span class="detail-value">Outer Rim</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Coordinates:</span>
                        <span class="detail-value">X: 98, Y: 156, Z: 42</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Defense Level:</span>
                        <span class="detail-value medium">Medium</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Population:</span>
                        <span class="detail-value">5,000</span>
                    </div>
                </div>
                <div class="planet-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="view-btn">View Details</button>
                </div>
            </div>

            <div class="planet-card">
                <div class="planet-header">
                    <h4>Endor</h4>
                    <span class="planet-threat low">Low Threat</span>
                </div>
                <div class="planet-details">
                    <div class="detail-row">
                        <span class="detail-label">Sector:</span>
                        <span class="detail-value">Outer Rim</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Coordinates:</span>
                        <span class="detail-value">X: 212, Y: 67, Z: 89</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Defense Level:</span>
                        <span class="detail-value high">High</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Population:</span>
                        <span class="detail-value">30,000,000</span>
                    </div>
                </div>
                <div class="planet-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="view-btn">View Details</button>
                </div>
            </div>

            <div class="planet-card">
                <div class="planet-header">
                    <h4>Naboo</h4>
                    <span class="planet-threat medium">Medium Threat</span>
                </div>
                <div class="planet-details">
                    <div class="detail-row">
                        <span class="detail-label">Sector:</span>
                        <span class="detail-value">Mid Rim</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Coordinates:</span>
                        <span class="detail-value">X: 178, Y: 132, Z: 56</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Defense Level:</span>
                        <span class="detail-value high">High</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Population:</span>
                        <span class="detail-value">4,500,000,000</span>
                    </div>
                </div>
                <div class="planet-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="view-btn">View Details</button>
                </div>
            </div>

            <div class="planet-card">
                <div class="planet-header">
                    <h4>Coruscant</h4>
                    <span class="planet-threat high">High Threat</span>
                </div>
                <div class="planet-details">
                    <div class="detail-row">
                        <span class="detail-label">Sector:</span>
                        <span class="detail-value">Core Worlds</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Coordinates:</span>
                        <span class="detail-value">X: 0, Y: 0, Z: 0</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Defense Level:</span>
                        <span class="detail-value high">High</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Population:</span>
                        <span class="detail-value">1,000,000,000,000</span>
                    </div>
                </div>
                <div class="planet-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="view-btn">View Details</button>
                </div>
            </div>

            <div class="planet-card">
                <div class="planet-header">
                    <h4>Mustafar</h4>
                    <span class="planet-threat high">High Threat</span>
                </div>
                <div class="planet-details">
                    <div class="detail-row">
                        <span class="detail-label">Sector:</span>
                        <span class="detail-value">Outer Rim</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Coordinates:</span>
                        <span class="detail-value">X: 245, Y: 89, Z: 192</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Defense Level:</span>
                        <span class="detail-value medium">Medium</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Population:</span>
                        <span class="detail-value">10,000</span>
                    </div>
                </div>
                <div class="planet-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="view-btn">View Details</button>
                </div>
            </div>

            <div class="planet-card">
                <div class="planet-header">
                    <h4>Kashyyyk</h4>
                    <span class="planet-threat medium">Medium Threat</span>
                </div>
                <div class="planet-details">
                    <div class="detail-row">
                        <span class="detail-label">Sector:</span>
                        <span class="detail-value">Mid Rim</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Coordinates:</span>
                        <span class="detail-value">X: 156, Y: 78, Z: 112</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Defense Level:</span>
                        <span class="detail-value medium">Medium</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Population:</span>
                        <span class="detail-value">45,000,000</span>
                    </div>
                </div>
                <div class="planet-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="view-btn">View Details</button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for the planet targets page
    initializePlanetTargetsPage();
}

// Load Mission Planning content
function loadMissionPlanningContent(container) {
    container.innerHTML = `
        <div class="module-header">
            <h3>Mission Planning</h3>
            <button class="add-btn">+ Create New Mission</button>
        </div>
        <div class="task-timeline">
            <div class="timeline-header">
                <div class="time-labels">
                    <span>08:00</span>
                    <span>10:00</span>
                    <span>12:00</span>
                    <span>14:00</span>
                    <span>16:00</span>
                    <span>18:00</span>
                </div>
            </div>
            <div class="timeline-content">
                <div class="timeline-row">
                    <div class="unit-label">Unit A</div>
                    <div class="timeline-tasks">
                        <div class="task-item" style="left: 10%; width: 15%;">
                            <div class="task-content">
                                <h4>Target Empire Ads</h4>
                                <p>2023-05-15 09:00 - 10:30</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="timeline-row">
                    <div class="unit-label">Unit B</div>
                    <div class="timeline-tasks">
                        <div class="task-item" style="left: 30%; width: 20%;">
                            <div class="task-content">
                                <h4>Patrol X Zone</h4>
                                <p>2023-05-15 11:00 - 13:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for the mission planning page
    initializeMissionPlanningPage();
}

// Load Resource Management content
function loadResourceManagementContent(container) {
    container.innerHTML = `
        <div class="module-header">
            <h3>Resource Management</h3>
            <button class="add-btn">+ Add Resource</button>
        </div>
        <div class="resource-overview">
            <h4>Resource Overview</h4>
            <div class="resource-list">
                <div class="resource-item">
                    <span class="resource-label">Fuel</span>
                    <div class="progress-bar">
                        <div class="progress" style="width: 75%;"></div>
                    </div>
                    <span class="resource-value">75%</span>
                </div>
                <div class="resource-item">
                    <span class="resource-label">Robots</span>
                    <div class="progress-bar">
                        <div class="progress" style="width: 45%;"></div>
                    </div>
                    <span class="resource-value">45%</span>
                </div>
                <div class="resource-item">
                    <span class="resource-label">Ammunition</span>
                    <div class="progress-bar">
                        <div class="progress" style="width: 90%;"></div>
                    </div>
                    <span class="resource-value">90%</span>
                </div>
                <div class="resource-item">
                    <span class="resource-label">Energy</span>
                    <div class="progress-bar">
                        <div class="progress" style="width: 15%;"></div>
                    </div>
                    <span class="resource-value">15%</span>
                </div>
            </div>
        </div>
        <div class="system-alerts-section">
            <h4>System Alerts</h4>
            <div class="alerts-container">
                <div class="alert-item alert-critical">
                    <span class="alert-icon">⚠️</span>
                    <div class="alert-content">
                        <h5>Energy reserves critically low</h5>
                        <p>Current level: 15%. Threshold: 20%</p>
                    </div>
                </div>
                <div class="alert-item alert-warning">
                    <span class="alert-icon">⚠️</span>
                    <div class="alert-content">
                        <h5>Robot maintenance required</h5>
                        <p>5 units need maintenance</p>
                    </div>
                </div>
                <div class="alert-item alert-stable">
                    <span class="alert-icon">✓</span>
                    <div class="alert-content">
                        <h5>Ammunition levels stable</h5>
                        <p>Current level: 90%. Threshold: 50%</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for the resource management page
    initializeResourceManagementPage();
}

// Load Reporting content
function loadReportingContent(container) {
    container.innerHTML = `
        <div class="module-header">
            <h3>Reporting</h3>
            <div class="report-actions">
                <button class="generate-btn">Generate Report</button>
                <button class="export-btn">Export</button>
            </div>
        </div>
        <div class="filter-bar">
            <div class="filter-group">
                <label>Report Type:</label>
                <select>
                    <option value="all">All Reports</option>
                    <option value="mission">Mission Reports</option>
                    <option value="resource">Resource Reports</option>
                    <option value="communication">Communication Logs</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Date Range:</label>
                <input type="date" placeholder="Start Date">
                <input type="date" placeholder="End Date">
            </div>
            <button class="search-btn">Apply Filters</button>
        </div>
        <div class="reports-table">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Mission Name</th>
                        <th>Result</th>
                        <th>Resources Used</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2023-05-15</td>
                        <td>Target Empire Ads</td>
                        <td>Completed</td>
                        <td>Fuel: 25%, Robots: 3</td>
                        <td>
                            <button class="view-btn">View</button>
                            <button class="export-btn">Export</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2023-05-14</td>
                        <td>Patrol X Zone</td>
                        <td>Completed</td>
                        <td>Fuel: 15%, Ammunition: 5%</td>
                        <td>
                            <button class="view-btn">View</button>
                            <button class="export-btn">Export</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // Add event listeners for the reporting page
    initializeReportingPage();
}
