import React, { useState, useEffect } from 'react';
import { fetchRoles } from '../../api/mockapi';
import './RoleList.css';  
import { useNavigate } from 'react-router-dom';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const getRoles = async () => {
      const fetchedRoles = await fetchRoles();
      setRoles(fetchedRoles);
      setLoading(false);
    };
    getRoles();
  }, []);

  if (loading) return <div>Loading roles...</div>;

  
  return (
    <div className="role-list-container">
      <h2>Roles</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            <strong>{role.name}</strong>
            <span>{role.permissions.join(', ')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;
