// Main application logic
let applications = [];

async function loadApplications() {
  applications = await API.getApplications();
  displayApplications();
}

function displayApplications() {
  const list = document.getElementById("list");

  if (applications.length === 0) {
    list.innerHTML = "<p>No applications yet</p>";
    return;
  }

  let html = "";
  applications.forEach((app) => {
    html += `
      <div class="application">
        <strong>${app.company}</strong> - ${app.position}
        <span class="status">${app.status}</span>
      </div>
    `;
  });

  list.innerHTML = html;
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadApplications();
});
