import React, { useEffect , useState } from 'react'
import UserList from '../UserList/UserList'
import RoleList from '../RoleList/RoleList'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'

function Dashboard() {
  const navigate = useNavigate()
  const [userData,setUserData]=useState({
    email:'',
    password:'',
    role:''
  })
  useEffect(() => {
    const storedData = localStorage.getItem('Credentials');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);

        if (!parsedData || parsedData.role === null) {
          console.warn('Invalid or missing role. Redirecting to login.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error parsing stored data:', error);
        navigate('/login'); // Redirect if data is not valid JSON
      }
    } else {
      console.warn('No credentials found. Redirecting to login.');
      navigate('/login');
    }
  }, []);
  return (
    <div>
        <div className="App">
         
          <UserList role={userData.role || 'viewer'}/>
          <RoleList/>
          <Footer/>
        </div>
    </div>
  )
}

export default Dashboard