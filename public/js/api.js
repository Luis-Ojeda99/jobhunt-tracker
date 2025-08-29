// All API calls
const API = {
  async getApplications() {
    try {
      const response = await fetch("/api/applications");
      return await response.json();
    } catch (error) {
      console.error("Error fetching applications:", error);
      return [];
    }
  },

  async createApplication(data) {
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create");
    }

    return await response.json();
  },

  async deleteApplication(id) {
    const response = await fetch(`/api/applications/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete");
    }

    return await response.json();
  },
};
