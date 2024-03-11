import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Landing_auth_pages/Homenavbar';
import Table from 'react-bootstrap/Table';

const UserAppointments = () => {
  const [userAppointments, setUserAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user-appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user appointments:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUserAppointments(); 
  }, []);

  return (
    <div>
      <Navbar />
      <h2>User Appointments</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Appointment For</th>
              <th>Date</th>
              <th>Time</th>
              <th>Specialist</th>
              <th>Store Name</th>
              <th>City</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {userAppointments.map(appointment => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.appointmentFor}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.employeeName}</td>
                <td>{appointment.storeName}</td>
                <td>{appointment.storeCity}</td>
                <td>{appointment.storeAddress}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserAppointments;
