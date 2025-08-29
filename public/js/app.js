document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const form = document.getElementById("applicationForm");
  const list = document.getElementById("list");

  // Show form when clicking "Add Application"
  addBtn.addEventListener("click", () => {
    form.style.display = "block";
    addBtn.style.display = "none";
  });

  // Hide form on cancel
  cancelBtn.addEventListener("click", () => {
    form.reset();
    form.style.display = "none";
    addBtn.style.display = "inline-block";
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const company = document.getElementById("company").value.trim();
    const position = document.getElementById("position").value.trim();
    const status = document.getElementById("status").value;

    if (!company || !position) {
      alert("Please fill out all fields.");
      return;
    }

    // Create a new entry element
    const entry = document.createElement("div");
    entry.classList.add("application-entry");
    entry.innerHTML = `
      <strong>${company}</strong> — ${position} <em class="status">(${status})</em>
    `;

    list.appendChild(entry);

    // Reset form and hide it
    form.reset();
    form.style.display = "none";
    addBtn.style.display = "inline-block";
  });
});