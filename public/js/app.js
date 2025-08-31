let applications = [];
let currentFilter = '';

const listEl = document.getElementById("list");
const formEl = document.getElementById("applicationForm");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");

async function loadApplications() {
  try {
    applications = await API.getApplications();
    displayApplications();
  } catch (err) {
    listEl.innerHTML = "<p>Error loading applications</p>";
  }
}

async function loadStats() {
  const stats = await API.getStats();
  document.getElementById('totalCount').textContent = stats.total;
  document.getElementById('interviewCount').textContent = stats.interviews;
}

function displayApplications() {
  // filter if needed
  let toShow = applications;
  if (currentFilter) {
    toShow = applications.filter(app => app.status === currentFilter);
  }

  if (toShow.length === 0) {
    listEl.innerHTML = "<p>No applications</p>";
    return;
  }

  let html = "";
  toShow.forEach((app) => {
    const date = new Date(app.date_applied).toLocaleDateString();
    html += `
      <div class="application-entry">
        <div>
          <strong>${app.company}</strong> — ${app.position}
          <br>
          <small>Applied: ${date}</small>
          ${app.notes ? `<div class="notes">${app.notes}</div>` : ''}
        </div>
        <div>
          <span class="status ${app.status}">${app.status}</span>
          <button class="delete-btn" onclick="deleteApplication(${app.id})">×</button>
        </div>
      </div>
    `;
  });

  listEl.innerHTML = html;
}

function showForm() {
  formEl.style.display = "block";
  addBtn.style.display = "none";
  document.getElementById("company").focus();
}

function hideForm() {
  formEl.style.display = "none";
  addBtn.style.display = "inline-block";
  formEl.reset();
}

async function saveApplication(e) {
  e.preventDefault();

  const company = document.getElementById("company").value.trim();
  const position = document.getElementById("position").value.trim();
  const status = document.getElementById("status").value;
  const notes = document.getElementById("notes").value.trim();

  if (!company || !position) {
    alert("Please fill in company and position");
    return;
  }

  try {
    await API.createApplication({ company, position, status, notes });
    hideForm();
    loadApplications();
    loadStats();
  } catch (error) {
    alert("Error saving application");
  }
}

async function deleteApplication(id) {
  if (!confirm("Delete this application?")) return;

  try {
    await API.deleteApplication(id);
    loadApplications();
    loadStats();
  } catch (error) {
    alert("Error deleting application");
  }
}

function filterApplications() {
  currentFilter = document.getElementById('filterStatus').value;
  displayApplications();
}

// Make deleteApplication available globally
window.deleteApplication = deleteApplication;

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  loadApplications();
  loadStats();

  addBtn.addEventListener("click", showForm);
  cancelBtn.addEventListener("click", hideForm);
  formEl.addEventListener("submit", saveApplication);
  
  // filter change
  document.getElementById('filterStatus').addEventListener('change', filterApplications);
});