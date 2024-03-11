import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Landing_auth_pages/Homenavbar';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar />

    <div className="container">

      <h2 className="my-4">My Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Products</th>
              <th>Total</th>
              <th>Delivery Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.checkoutId}>
                <td>
                  {order.productName ? (
                    <div>
                      <div>Name: {order.productName}</div>
                      <div>
                      {order.image_url && (
                                <img src={`http://localhost:5000/${order.image_url}`} alt={order.productName} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            )}
                      </div>
                    </div>
                  ) : (
                    <div>No products found for this order.</div>
                  )}
                </td>
                <td>${order.Total}</td>
                <td>{order.Delivery_address}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default MyOrders;
