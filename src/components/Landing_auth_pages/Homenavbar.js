import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Homenavbar() {
    const navigate = useNavigate();
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState('');
    const [storeData, setStoreData] = useState([]);
    const [selectedStoreId, setSelectedStoreId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        storeState: '',
        storeCity: '',
        appointmentDate: '',
        appointmentTime: '',
        appointmentFor: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        setUserId(token);
        fetchStoreDetails();
        fetchEmployees();
    }, []);

    const fetchStoreDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getstore', {
                headers: {
                    'Authorization': `Bearer ${userId}`
                }
            });

            if (response.status === 200) {
                setStoreData(response.data);
            } else {
                console.error('Failed to fetch store details');
            }
        } catch (error) {
            console.error('Error fetching store details:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getEmployees');
            if (response.status === 200) {
                setEmployees(response.data);
            } else {
                console.error('Failed to fetch employees');
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    
        if (name === 'selectedEmployeeId') {
            setSelectedEmployeeId(value);
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const appointmentData = {
            userId: userId,
            storeId: selectedStoreId,
            ...formData,
            appointmentTime: formData.appointmentTime.split(' ')[0], // Remove AM/PM designation
            employeeId: selectedEmployeeId,  // Include employee ID
        };
    
        try {
            const response = await axios.post('http://localhost:5000/appointment', appointmentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userId}`
                }
            });
    
            if (response.status === 200) {
                setMessage('Appointment created successfully');
                navigate('/uappointments')
            } else {
                setMessage('Failed to create appointment');
            }
        } catch (error) {
            setMessage('Failed to create appointment');
        }
    
        console.log("Form submitted with data:", appointmentData);
        handleClose();
    };
    
    const startTime = 8;
    const endTime = 19;
    const timeOptions = [];
    for (let i = startTime; i <= endTime; i++) {
        const hour = i.toString().padStart(2, '0');
        timeOptions.push(`${hour}:00`);
    }

    const filterStoreData = (key, value) => {
        return storeData.filter(store => store[key] === value);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/homepage"></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-md-auto gap-2">
                            <li className="nav-item rounded">
                                <a className="nav-link active" aria-current="page" href="/homepage"><i className="bi bi-house-fill me-2"></i>Home</a>
                            </li>
                            <li className="nav-item rounded">
                                <a className="nav-link" href="/productlist"><i className="bi bi-people-fill me-2"></i>Products</a>
                            </li>
                            <li className="nav-item rounded">
                                <a className="nav-link" href="#"><i className="bi bi-telephone-fill me-2"></i>Contact</a>
                            </li>
                            <li className="nav-item dropdown rounded">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person-fill me-2"></i>Profile</a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/profile">Account</a></li>
                                    <li><a className="dropdown-item" href="/uappointments">Appointments</a></li>
                                    <li><a className="dropdown-item" href="/addtocart">Add to cart</a></li>
                                    <li><a className="dropdown-item" href="/myorders">Myorders</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li>
                            <li className="nav-item rounded">
                                <Button variant="primary" onClick={handleShow}>
                                    Create Appointment
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="appointmentStoreState">
                            <Form.Label>Store State</Form.Label>
                            <Form.Control as="select" onChange={handleInputChange} name="storeState" required>
                                <option value="">Select State</option>
                                {Array.from(new Set(storeData.map(store => store.storeState))).map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="employee">
    <Form.Label>Select Employee</Form.Label>
    <Form.Control 
        as="select" 
        name="employee" 
        value={selectedEmployeeId} 
        onChange={(e) => setSelectedEmployeeId(e.target.value)} // Update selectedEmployeeId state
        required
    >
        <option value="">Select Employee</option>
        {employees.map(employee => (
            <option key={employee.EmployeeID} value={employee.EmployeeID}>
                {employee.Name} - {employee.Specialist}
            </option>
        ))}
    </Form.Control>
</Form.Group>


                        <Form.Group controlId="appointmentStoreCity">
                            <Form.Label>Store City</Form.Label>
                            <Form.Control as="select" onChange={handleInputChange} name="storeCity" required>
                                <option value="">Select City</option>
                                {filterStoreData('storeState', formData.storeState).map(store => (
                                    <option key={store.storeId} value={store.storeCity}>{store.storeCity}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="appointmentStoreAddress">
                            <Form.Label>Store Address</Form.Label>
                            <Form.Control as="select" onChange={(e) => setSelectedStoreId(e.target.value)} required>
                                <option value="">Select Store Address</option>
                                {filterStoreData('storeCity', formData.storeCity).map(store => (
                                    <option key={store.storeId} value={store.storeId}>{store.storeAddress}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="appointmentDate">
                            <Form.Label>Appointment Date</Form.Label>
                            <Form.Control type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="appointmentTime">
                            <Form.Label>Appointment Time</Form.Label>
                            <Form.Control
                                as="select"
                                name="appointmentTime"
                                value={formData.appointmentTime}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Appointment Time</option>
                                {timeOptions.map((time, index) => (
                                    <option key={index} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="appointmentFor">
                            <Form.Label>Appointment For</Form.Label>
                            <Form.Control type="text" name="appointmentFor" value={formData.appointmentFor} onChange={handleInputChange} placeholder="Reason for appointment" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Homenavbar;
