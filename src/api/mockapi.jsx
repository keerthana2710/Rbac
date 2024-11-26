// src/api/mockApi.js

const mockRoles = [
    { id: 1, name: 'Admin', permissions: ['READ', 'WRITE', 'DELETE'] },
    { id: 2, name: 'Editor', permissions: ['READ', 'WRITE'] },
    { id: 3, name: 'Viewer', permissions: ['READ'] },
  ];
  
  // Mock API functions
  export const fetchUsers = async () => {
    return [
      { id: 1, name: 'Ram', email: 'alice@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Aathi', email: 'aathi@example.com', role: 'Editor', status: 'Inactive' },
      { id: 3, name: 'keerthi', email: 'keerthi@example.com', role: 'Editor', status: 'Inactive' },
    ];
  };
  
  export const fetchRoles = async () => {
    return mockRoles;
  };
  
  export const createUser = async (userData) => {
    return { ...userData, id: Date.now() }; // Simulate creating a new user
  };
  
  export const updateUser = async (id, userData) => {
    return { ...userData, id }; // Simulate updating a user
  };
  
  export const deleteUser = async (id) => {
    return { message: 'User deleted successfully' }; // Simulate deleting a user
  };
  