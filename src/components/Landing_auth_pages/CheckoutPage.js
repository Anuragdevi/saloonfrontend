import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaAddressCard, FaCcVisa, FaShoppingCart } from 'react-icons/fa';
import Navbar from '../Landing_auth_pages/Homenavbar';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    sameAddress: false,
  });
  const navigate=useNavigate()
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
    fetchProfileDetails();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/getcart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const cartData = await response.json();
        setCartItems(cartData);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const fetchProfileDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:5000/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prevData => ({
          ...prevData,
          fullName: `${data.firstName} ${data.lastName}`,
          email: data.email
        }));
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.error('Failed to fetch profile details:', errorMessage);
      }
    } catch (error) {
      setError('Error fetching profile details. Please try again later.');
      console.error('Error fetching profile details:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.productPrice, 0);
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = token.split('.')[1]; // Get the payload part of the JWT token
      const decodedPayload = atob(tokenPayload); // Decode the base64-encoded payload
      const parsedPayload = JSON.parse(decodedPayload); // Parse the JSON payload
      return parsedPayload.sub; // Access the 'sub' field, which typically contains the user ID
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get userId from localStorage
    const userId = getUserIdFromToken();
  
    try {
      const response = await fetch('http://127.0.0.1:5000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId: userId, // Include userId in the request body
          cartId: cartItems.map(item => item.id),
          card_name: formData.cardName,
          card_number: formData.cardNumber,
          exp_month: formData.expMonth,
          exp_year: formData.expYear,
          Delivery_address: formData.address,
          State: formData.state,
          City: formData.city,
          Total: calculateTotal(),
          Pincode: parseInt(formData.zip) // Ensure Pincode is parsed as an integer
        })
      });
  
      if (response.ok) {
        setFormData({
          fullName: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          cardName: '',
          cardNumber: '',
          expMonth: '',
          expYear: '',
          cvv: '',
          sameAddress: false,
        });
        alert('Checkout successful!');
        navigate('/myorders')
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.error('Failed to complete checkout:', errorMessage);
      }
    } catch (error) {
      setError('Error completing checkout. Please try again later.');
      console.error('Error completing checkout:', error);
    }
  };

  return (
    <>
    <Navbar />
    <Container>
      <Row>
        <Col md={8}>
          <div className="container">
            <Form onSubmit={handleSubmit}>
              <h3>Billing Address</h3>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your full name" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter your email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label><FaAddressCard /> Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="542 W. 15th Street"
                  required
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="city">
                    <Form.Label><FaAddressCard /> City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="state">
                    <Form.Label><FaAddressCard /> State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="New York"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="zip">
                    <Form.Label><FaAddressCard /> Zip</Form.Label>
                    <Form.Control
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="10001"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <h3>Payment</h3>
              <Form.Group controlId="cardName">
                <Form.Label><FaAddressCard /> Name on Card</Form.Label>
                <Form.Control
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  placeholder="John More Doe"
                  required
                />
              </Form.Group>
              <Form.Group controlId="cardNumber">
                <Form.Label><FaCcVisa /> Credit Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1111-2222-3333-4444"
                  required
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="expMonth">
                    <Form.Label>Exp Month</Form.Label>
                    <Form.Control
                      type="text"
                      name="expMonth"
                      value={formData.expMonth}
                      onChange={handleChange}
                      placeholder="September"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="expYear">
                    <Form.Label>Exp Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="expYear"
                      value={formData.expYear}
                      onChange={handleChange}
                      placeholder="2018"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="352"
                  required
                />
              </Form.Group>
              
              <Button variant="primary" type="submit">Continue to checkout</Button>
            </Form>
          </div>
        </Col>
        <Col md={4}>
          <div className="container">
            <h4>Cart <span className="price"><FaShoppingCart /> <b>{cartItems.length}</b></span></h4>
            {cartItems.map((item, index) => (
              <div key={index}>
                <p><strong>{item.productName}</strong> <span className="price">${item.productPrice}</span></p>
              </div>
            ))}
            <hr />
            <p>Total <span className="price"><b>${calculateTotal()}</b></span></p>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default CheckoutPage;
