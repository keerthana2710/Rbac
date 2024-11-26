# RBAC User Management System

This project is a Role-Based Access Control (RBAC) system for managing users, roles, and their permissions. It provides functionality for administrators to add, edit, delete, and manage user roles and permissions, while also restricting certain operations based on the role of the logged-in user.

## Features

- User Management: 
  - Add, edit, delete users.
  - Toggle user status between Active and Inactive.
  
- Role Management:
  - Assign roles (Admin, Editor, Viewer, etc.) to users.
  - Restrict actions based on user roles.

- Search and Filter:
  - Search users by name.
  - Sort users by name in ascending or descending order.

- Local and API Data Synchronization:
  - Merge users from a mock API and local storage.

- Authentication:
  - Basic logout functionality and user credential storage.

## Tech Stack

- Frontend:
  - React.js
  - CSS for styling

- Backend:
  - Mock API (Simulated data operations: fetchUsers, createUser, updateUser, deleteUser, `fetchRoles`)

- State Management:
  - React's useState and useEffect hooks for state and lifecycle management.

- Routing:
  - React Router for navigation between pages.

    
-Install Dependencies:


  -npm install
-Run the Application:
  -npm run dev
  
  -The app will be available at http://localhost:3000.

-Admin Credentials
  -To log in as an admin, use the following credentials:

  -Username: admin
  - Password: admin
  - 
-API Simulations
  -The project uses a mock API (mockapi.js) to simulate user and role management operations. The functions available are:

  -fetchUsers(): Fetches all users.
  -createUser(user): Creates a new user.
  -updateUser(id, updatedData): Updates an existing user's data.
  -deleteUser(id): Deletes a user by ID.
  -fetchRoles(): Fetches available roles.
