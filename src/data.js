// Edit this file to update the page. All values below are dummy placeholders.

export const profile = {
  title: "Project Hub",
  subtitle: "My projects, source code and demo access.",
  githubUrl: "https://github.com/AustinJNilavoor",
};

export const project = {
  name: "Project Tracker",
  description:
    "A project management application for managing teams, projects, milestones, and tasks with role-based access control.",
  status: "live", // "live" | "development" | "offline"
  technologies: ["React", "Spring Boot", "PostgreSQL"],
  links: {
    frontend: "https://github.com/AustinJNilavoor/Project_Tracker_Frontend",
    backend: "https://github.com/AustinJNilavoor/Project_Tracker_Backend",
    live: "https://austinjnilavoor.github.io/Project_Tracker_Frontend",
  },
  // Set show to false to hide the warning. Edit the message as you like.
  slowLoadWarning: {
    show: true,
    message:
      "This app is hosted on a free service, so the first load may take 30–60 seconds while the server wakes up. Please be patient.",
  },
  credentials: [
    {
      role: "Admin",
      description: "Full access to manage the application",
      email: "admin@projecttracker.com",
      password: "admin123",
    },
    {
      role: "Manager",
      description: "Can manage projects and team members",
      email: "manager@projecttracker.com",
      password: "manager123",
    },
    {
      role: "Employee",
      description: "Can view assigned projects and update tasks",
      email: "employee@projecttracker.com",
      password: "employee123",
    },
  ],
};