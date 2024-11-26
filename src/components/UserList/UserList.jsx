import React, { useState, useEffect } from "react";
import { fetchUsers, createUser, updateUser, deleteUser, fetchRoles } from "../../api/mockapi";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const UserList = (props) => {
  const navigate = useNavigate();
  const { role } = props;
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sortOrder, setSortOrder] = useState("asc"); // State for sort order

  useEffect(() => {
    const getUsersAndRoles = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await fetchUsers();
        const fetchedRoles = await fetchRoles();
        const localUsers = JSON.parse(localStorage.getItem("Users")) || [];
        const mergedUsers = mergeUsers(fetchedUsers, localUsers);
        setUsers(mergedUsers);
        setRoles(fetchedRoles);
        localStorage.setItem("Users", JSON.stringify(mergedUsers));
      } catch (error) {
        console.error("Error fetching users and roles:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsersAndRoles();
  }, []);

  const mergeUsers = (apiUsers, localUsers) => {
    const localUserMap = Object.fromEntries(localUsers.map((user) => [user.id, user]));
    const merged = apiUsers.map((user) => {
      if (localUserMap[user.id]) {
        return { ...user, ...localUserMap[user.id] };
      }
      return user;
    });
    const localOnlyUsers = localUsers.filter((user) => !apiUsers.some((apiUser) => apiUser.id === user.id));
    return [...merged, ...localOnlyUsers];
  };

  const handleCreateUser = async () => {
    const userId = Date.now();
    const newUserWithId = { ...newUser, id: userId };
    const createdUser = await createUser(newUserWithId);
    const updatedUsers = [...users, createdUser];
    setUsers(updatedUsers);
    localStorage.setItem("Users", JSON.stringify(updatedUsers));
    setNewUser({ name: "", email: "", role: "" });
  };

  const handleRoleChange = (userId, newRole) => {
    if (role === "Admin" || role === "Editor") {
      setSelectedRole((prev) => ({ ...prev, [userId]: newRole }));
      handleUpdateUser(userId, { role: newRole });
    } else {
      alert("You are not authorized to change user roles.");
    }
  };

  const handleUpdateUser = async (id, updatedData) => {
    const updatedUser = await updateUser(id, updatedData);
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("Users", JSON.stringify(updatedUsers));
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("Users", JSON.stringify(updatedUsers));
  };

  const handleLogout = () => {
    localStorage.removeItem("Credentials");
    navigate("/login");
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedUsers = [...users]
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) && user.name !== "Administrator")
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-list-container">
      {/* Navbar */}
      <nav className="navbar">
  <div className="navbar-left">
    <span className="project-title">User Management</span>
  </div>
  <div className="navbar-right">
    <button onClick={() => navigate("/")}>Dashboard</button>
    <button onClick={handleLogout}>Logout</button>
  </div>
</nav>
      <center><h1>RBAC Dashboard</h1></center>
      <h2>User List</h2>

      {role === "admin" ? (
        <div className="user-form">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <button onClick={handleCreateUser}>Add User</button>
        </div>
      ) : (
        ""
      )}

      {/* Search Bar */}
        <div className="search-container">
          <input
          type="text"
          className="search-bar"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <select className="sort-select" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.length === 0 ? (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          ) : (
            sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={selectedRole[user.id] || user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{user.status}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateUser(user.id, {
                        status: user.status === "Active" ? "Inactive" : "Active",
                      })
                    }
                  >
                    Toggle Status
                  </button>
                  {role === "Admin" && (
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
