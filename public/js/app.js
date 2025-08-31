let applications = [];

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
  } catch (error) {
    alert("Error saving application");
  }
}

function displayApplications() {
  if (applications.length === 0) {
    listEl.innerHTML = "<p>No applications yet</p>";
    return;
  }

  let html = "";
  applications.forEach((app) => {
    const date = new Date(app.date_applied).toLocaleDateString();
    html += `
      <div class="application-entry">
        <div>
          <strong>${app.company}</strong> — ${app.position}
          <br>
          <small>Applied: ${date}</small>
          ${app.notes ? `<div class="notes">${app.notes}</div>` : ""}
        </div>
        <div>
          <span class="status">${app.status}</span>
          <button class="delete-btn" onclick="deleteApplication(${
            app.id
          })">×</button>
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

  if (!company || !position) {
    alert("Please fill in company and position");
    return;
  }

  try {
    await API.createApplication({ company, position, status });
    hideForm();
    loadApplications();
  } catch (error) {
    alert("Error saving application");
  }
}

async function deleteApplication(id) {
  if (!confirm("Delete this application?")) return;

  try {
    await API.deleteApplication(id);
    loadApplications();
  } catch (error) {
    alert("Error deleting application");
  }
}

// Make deleteApplication available globally
window.deleteApplication = deleteApplication;

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  loadApplications();

  addBtn.addEventListener("click", showForm);
  cancelBtn.addEventListener("click", hideForm);
  formEl.addEventListener("submit", saveApplication);
});
