// Planetary Targets Module

// Initialize the Planet Targets page
function initializePlanetTargetsPage() {
    // Add event listeners for buttons
    const addPlanetBtn = document.querySelector('#planetTargets-content .add-btn');
    if (addPlanetBtn) {
        addPlanetBtn.addEventListener('click', showAddPlanetForm);
    }

    const editButtons = document.querySelectorAll('#planetTargets-content .edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planetCard = this.closest('.planet-card');
            const planetName = planetCard.querySelector('h4').textContent;
            showEditPlanetForm(planetName);
        });
    });

    const viewButtons = document.querySelectorAll('#planetTargets-content .view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planetCard = this.closest('.planet-card');
            const planetName = planetCard.querySelector('h4').textContent;
            showPlanetDetails(planetName);
        });
    });

    const searchBtn = document.querySelector('#planetTargets-content .search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', filterPlanets);
    }
}

// Show form to add a new planet
function showAddPlanetForm() {
    // Create modal for adding a new planet
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add New Planet Target</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <form id="add-planet-form">
                    <div class="form-group">
                        <label for="planet-name">Planet Name:</label>
                        <input type="text" id="planet-name" required>
                    </div>
                    <div class="form-group">
                        <label for="planet-sector">Sector:</label>
                        <select id="planet-sector">
                            <option value="outer-rim">Outer Rim</option>
                            <option value="mid-rim">Mid Rim</option>
                            <option value="inner-rim">Inner Rim</option>
                            <option value="core-worlds">Core Worlds</option>
                            <option value="unknown-regions">Unknown Regions</option>
                            <option value="wild-space">Wild Space</option>
                            <option value="expansion-region">Expansion Region</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="planet-system">Star System:</label>
                        <input type="text" id="planet-system">
                    </div>
                    <div class="form-group">
                        <label>Coordinates:</label>
                        <div class="coordinates-inputs">
                            <input type="number" id="coord-x" placeholder="X">
                            <input type="number" id="coord-y" placeholder="Y">
                            <input type="number" id="coord-z" placeholder="Z">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="defense-level">Defense Level:</label>
                        <select id="defense-level">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="threat-level">Threat Level:</label>
                        <select id="threat-level">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="population">Population Estimate:</label>
                        <input type="number" id="population">
                    </div>
                    <div class="form-group">
                        <label for="recent-activity">Recent Activity:</label>
                        <textarea id="recent-activity"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="strategic-value">Strategic Value:</label>
                        <textarea id="strategic-value"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="submit-btn">Add Planet</button>
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

    const form = modal.querySelector('#add-planet-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const planetName = document.getElementById('planet-name').value;
        const planetSector = document.getElementById('planet-sector').value;
        const threatLevel = document.getElementById('threat-level').value;
        const defenseLevel = document.getElementById('defense-level').value;
        const coordX = document.getElementById('coord-x').value || '0';
        const coordY = document.getElementById('coord-y').value || '0';
        const coordZ = document.getElementById('coord-z').value || '0';

        // Create a new planet card for the regular planet grid (if exists)
        const planetGrid = document.querySelector('.planet-grid');
        if (planetGrid) {
            const newPlanetCard = document.createElement('div');
            newPlanetCard.className = 'planet-card';
            newPlanetCard.innerHTML = `
                <div class="planet-header">
                    <h4>${planetName}</h4>
                    <span class="planet-threat ${threatLevel}">${threatLevel.charAt(0).toUpperCase() + threatLevel.slice(1)} Threat</span>
                </div>
                <div class="planet-details">
                    <div class="detail-row">
                        <span class="detail-label">Sector:</span>
                        <span class="detail-value">${planetSector.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Coordinates:</span>
                        <span class="detail-value">X: ${coordX}, Y: ${coordY}, Z: ${coordZ}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Defense Level:</span>
                        <span class="detail-value ${defenseLevel}">${defenseLevel.charAt(0).toUpperCase() + defenseLevel.slice(1)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Population:</span>
                        <span class="detail-value">${document.getElementById('population').value ? parseInt(document.getElementById('population').value).toLocaleString() : 'Unknown'}</span>
                    </div>
                </div>
                <div class="planet-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="view-btn">View Details</button>
                </div>
            `;

            // Add event listeners to the new buttons
            const editBtn = newPlanetCard.querySelector('.edit-btn');
            editBtn.addEventListener('click', function() {
                showEditPlanetForm(planetName);
            });

            const viewBtn = newPlanetCard.querySelector('.view-btn');
            viewBtn.addEventListener('click', function() {
                showPlanetDetails(planetName);
            });

            // Add the new planet card to the grid
            planetGrid.prepend(newPlanetCard);
        }

        // Also add to the dashboard planet grid
        const dashboardPlanetGrid = document.getElementById('planet-grid-dashboard');
        if (dashboardPlanetGrid) {
            const newDashboardCard = document.createElement('div');
            newDashboardCard.className = 'planet-card-mini';
            newDashboardCard.innerHTML = `
                <div class="planet-header-mini">
                    <h5>${planetName}</h5>
                    <span class="planet-threat ${threatLevel}">${threatLevel.charAt(0).toUpperCase() + threatLevel.slice(1)}</span>
                </div>
                <div class="planet-details-mini">
                    <div class="detail-mini">
                        <span class="label">Sector:</span>
                        <span class="value">${planetSector.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </div>
                    <div class="detail-mini">
                        <span class="label">Coords:</span>
                        <span class="value">${coordX}, ${coordY}, ${coordZ}</span>
                    </div>
                    <div class="detail-mini">
                        <span class="label">Defense:</span>
                        <span class="value ${defenseLevel}">${defenseLevel.charAt(0).toUpperCase() + defenseLevel.slice(1)}</span>
                    </div>
                </div>
                <div class="planet-actions-mini">
                    <button class="edit-btn-mini" data-planet="${planetName}">Edit</button>
                    <button class="view-btn-mini" data-planet="${planetName}">View</button>
                </div>
            `;

            // Add event listeners to the new dashboard buttons
            const editBtnMini = newDashboardCard.querySelector('.edit-btn-mini');
            editBtnMini.addEventListener('click', function() {
                showEditPlanetForm(planetName);
            });

            const viewBtnMini = newDashboardCard.querySelector('.view-btn-mini');
            viewBtnMini.addEventListener('click', function() {
                showPlanetDetails(planetName);
            });

            // Add the new planet card to the dashboard grid
            dashboardPlanetGrid.appendChild(newDashboardCard);

            // Update the planet count in the dashboard
            const totalPlanetsElement = document.querySelector('.planet-stat .stat-value');
            if (totalPlanetsElement) {
                const currentCount = parseInt(totalPlanetsElement.textContent);
                totalPlanetsElement.textContent = currentCount + 1;
            }
        }

        // Close the modal
        document.body.removeChild(modal);

        // Show success message
        showNotification('Planet target added successfully!', 'success');
    });
}

// Show form to edit an existing planet
function showEditPlanetForm(planetName) {
    // This would typically fetch the planet data from the server
    // For now, we'll use mock data
    const planetData = {
        name: planetName,
        sector: 'Outer Rim',
        system: 'Tatoo',
        coordinates: { x: 134, y: 89, z: 23 },
        defenseLevel: 'low',
        threatLevel: 'high',
        population: 200000,
        recentActivity: 'Increased rebel activity in the southern hemisphere.',
        strategicValue: 'Key trade route junction. Potential rebel sympathizers.'
    };

    // Create modal for editing the planet
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Planet Target: ${planetName}</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <form id="edit-planet-form">
                    <div class="form-group">
                        <label for="planet-name">Planet Name:</label>
                        <input type="text" id="planet-name" value="${planetData.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="planet-sector">Sector:</label>
                        <select id="planet-sector">
                            <option value="outer-rim" ${planetData.sector === 'Outer Rim' ? 'selected' : ''}>Outer Rim</option>
                            <option value="mid-rim" ${planetData.sector === 'Mid Rim' ? 'selected' : ''}>Mid Rim</option>
                            <option value="inner-rim" ${planetData.sector === 'Inner Rim' ? 'selected' : ''}>Inner Rim</option>
                            <option value="core-worlds" ${planetData.sector === 'Core Worlds' ? 'selected' : ''}>Core Worlds</option>
                            <option value="unknown-regions" ${planetData.sector === 'Unknown Regions' ? 'selected' : ''}>Unknown Regions</option>
                            <option value="wild-space" ${planetData.sector === 'Wild Space' ? 'selected' : ''}>Wild Space</option>
                            <option value="expansion-region" ${planetData.sector === 'Expansion Region' ? 'selected' : ''}>Expansion Region</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="planet-system">Star System:</label>
                        <input type="text" id="planet-system" value="${planetData.system}">
                    </div>
                    <div class="form-group">
                        <label>Coordinates:</label>
                        <div class="coordinates-inputs">
                            <input type="number" id="coord-x" placeholder="X" value="${planetData.coordinates.x}">
                            <input type="number" id="coord-y" placeholder="Y" value="${planetData.coordinates.y}">
                            <input type="number" id="coord-z" placeholder="Z" value="${planetData.coordinates.z}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="defense-level">Defense Level:</label>
                        <select id="defense-level">
                            <option value="high" ${planetData.defenseLevel === 'high' ? 'selected' : ''}>High</option>
                            <option value="medium" ${planetData.defenseLevel === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="low" ${planetData.defenseLevel === 'low' ? 'selected' : ''}>Low</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="threat-level">Threat Level:</label>
                        <select id="threat-level">
                            <option value="high" ${planetData.threatLevel === 'high' ? 'selected' : ''}>High</option>
                            <option value="medium" ${planetData.threatLevel === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="low" ${planetData.threatLevel === 'low' ? 'selected' : ''}>Low</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="population">Population Estimate:</label>
                        <input type="number" id="population" value="${planetData.population}">
                    </div>
                    <div class="form-group">
                        <label for="recent-activity">Recent Activity:</label>
                        <textarea id="recent-activity">${planetData.recentActivity}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="strategic-value">Strategic Value:</label>
                        <textarea id="strategic-value">${planetData.strategicValue}</textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="delete-btn">Delete Planet</button>
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
        if (confirm(`Are you sure you want to delete ${planetName}?`)) {
            document.body.removeChild(modal);
            // Show success message
            showNotification(`Planet ${planetName} deleted successfully!`, 'success');
        }
    });

    const form = modal.querySelector('#edit-planet-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, this would send data to the server
        // For now, we'll just close the modal
        document.body.removeChild(modal);
        // Show success message
        showNotification(`Planet ${planetName} updated successfully!`, 'success');
    });
}

// Show detailed view of a planet
function showPlanetDetails(planetName) {
    // This would typically fetch the planet data from the server
    // For now, we'll use mock data
    const planetData = {
        name: planetName,
        sector: 'Outer Rim',
        system: 'Tatoo',
        coordinates: { x: 134, y: 89, z: 23 },
        defenseLevel: 'low',
        threatLevel: 'high',
        population: 200000,
        recentActivity: 'Increased rebel activity in the southern hemisphere.',
        strategicValue: 'Key trade route junction. Potential rebel sympathizers.',
        status: 'Under Surveillance',
        tasks: [
            { name: 'Target Empire Ads', date: '2023-05-15', status: 'Completed' },
            { name: 'Patrol X Zone', date: '2023-05-14', status: 'Completed' }
        ]
    };

    // Create modal for viewing planet details
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h3>Planet Details: ${planetName}</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="modal-body">
                <div class="planet-detail-grid">
                    <div class="planet-info-section">
                        <h4>Basic Information</h4>
                        <div class="detail-row">
                            <span class="detail-label">Planet Name:</span>
                            <span class="detail-value">${planetData.name}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Sector:</span>
                            <span class="detail-value">${planetData.sector}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Star System:</span>
                            <span class="detail-value">${planetData.system}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Coordinates:</span>
                            <span class="detail-value">X: ${planetData.coordinates.x}, Y: ${planetData.coordinates.y}, Z: ${planetData.coordinates.z}</span>
                        </div>
                    </div>
                    <div class="planet-status-section">
                        <h4>Status & Assessment</h4>
                        <div class="detail-row">
                            <span class="detail-label">Defense Level:</span>
                            <span class="detail-value ${planetData.defenseLevel}">${planetData.defenseLevel.charAt(0).toUpperCase() + planetData.defenseLevel.slice(1)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Threat Level:</span>
                            <span class="detail-value ${planetData.threatLevel}">${planetData.threatLevel.charAt(0).toUpperCase() + planetData.threatLevel.slice(1)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Status:</span>
                            <span class="detail-value">${planetData.status}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Population:</span>
                            <span class="detail-value">${planetData.population.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="planet-additional-section">
                        <h4>Additional Information</h4>
                        <div class="detail-row">
                            <span class="detail-label">Recent Activity:</span>
                            <span class="detail-value">${planetData.recentActivity}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Strategic Value:</span>
                            <span class="detail-value">${planetData.strategicValue}</span>
                        </div>
                    </div>
                    <div class="planet-tasks-section">
                        <h4>Related Tasks</h4>
                        <table class="tasks-table">
                            <thead>
                                <tr>
                                    <th>Task Name</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${planetData.tasks.map(task => `
                                    <tr>
                                        <td>${task.name}</td>
                                        <td>${task.date}</td>
                                        <td>${task.status}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="edit-btn">Edit Planet</button>
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

    const editBtn = modal.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        showEditPlanetForm(planetName);
    });
}

// Filter planets based on selected criteria
function filterPlanets() {
    // In a real application, this would filter the planets based on the selected criteria
    // For now, we'll just show a notification
    showNotification('Filters applied!', 'success');
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
