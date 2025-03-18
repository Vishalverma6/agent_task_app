React + Vite – Agent Task Management App


A React-based task management application that helps organizations track and manage tasks assigned to agents. The app displays agents along with their assigned tasks, including task descriptions, contact details, and timestamps.

Features

Agent Management – View and manage agent details like name, email, and phone number.
 Task Tracking – Display tasks assigned to each agent, including task description and timestamps.
 Real-time Updates – Dynamically fetches the latest tasks and agent information.
 User-friendly Interface – Clean and structured UI with Tailwind CSS.

Installation & Setup

1️⃣ Clone the repository
git clone https://github.com/your-username/agent-task-management.git

2️⃣ Navigate to the project directory
cd agent-task-management


3️⃣ Install dependencies
npm install


4️⃣ Update Backend Configuration
Before running the application, update the CORS configuration in the backend:

Open index.js in the backend and modify the CORS settings:

app.use(
  cors({
    origin: "http://localhost:5173", // Update this with the frontend port
    credentials: true,
  })
);
 Remove "*" as the origin and replace it with http://localhost:5173 (your frontend URL).


5️⃣ Start the application
npm run dev
The app will now be running on http://localhost:5173/.


Tech Stack
Frontend: React + Vite, Tailwind CSS
State Management: React Hooks (useState, useEffect)
Backend (API Calls): Node.js & Express (assumed for API)
