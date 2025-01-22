// Function to fetch and populate projects
async function populateProjects() {
    try {
      // Fetch the projects.json file
      const response = await fetch('projects.json');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const projects = await response.json();
  
      // Group projects by category
      const categories = {};
      projects.forEach(project => {
        project.category.forEach(cat => {
          if (!categories[cat]) {
            categories[cat] = [];
          }
          categories[cat].push(project);
        });
      });
  
      // Get the main container
      const pageContainer = document.getElementById('page');
  
      // Create a row for each category
      for (const [category, projectsInCategory] of Object.entries(categories)) {
        // Create a row container
        const rowContainer = document.createElement('div');
        rowContainer.id = 'row-container';
  
        // Create a row header
        const rowHeader = document.createElement('div');
        rowHeader.className = 'row-header';
        rowHeader.innerHTML = `
          <div class="row-title">${category}</div>
          <div class="show-more">
            <button onclick="window.location.href='#'">Show More</button>
          </div>
        `;
  
        // Create a row for the projects
        const row = document.createElement('div');
        row.className = 'row';
  
        // Add projects to the row
        projectsInCategory.forEach(project => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" loading="lazy" />
            <div class="card-content">
              <div class="card-title">${project.title}</div>
              <div class="card-description">${project.description}</div>
              <div class="card-footer">
                <div class="card-tags">
                  ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="source-button" onclick="window.open('${project.source}', '_blank')"> source
                  <i class="fab fa-github"></i>
                </button>
              </div>
            </div>
          `;
  
          // Make the card clickable to open the project URL
          card.addEventListener('click', () => {
            window.open(project.url, '_blank');
          });
  
          row.appendChild(card);
        });
  
        // Append the row header and row to the row container
        rowContainer.appendChild(rowHeader);
        rowContainer.appendChild(row);
  
        // Append the row container to the main page container
        pageContainer.appendChild(rowContainer);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }
  
  // Call the function to populate projects
  populateProjects();