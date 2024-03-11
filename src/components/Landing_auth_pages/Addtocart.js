import React, { useState, useEffect } from 'react';
import Navbar from '../Landing_auth_pages/Homenavbar';
import { useNavigate } from 'react-router-dom';
function AddToCart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    const handleCheckout = () => {
      navigate('/checkout');
    };
    useEffect(() => {
        async function fetchCart() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/getcart', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch cart');
                }
                const cartData = await response.json();
                setCartItems(cartData);
                // Calculate total price based on cart items
                const total = cartData.reduce((acc, item) => acc + parseFloat(item.total), 0);
                setTotalPrice(total);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        }

        fetchCart();
    }, []);

    const increaseQuantity = (itemId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                const newQuantity = item.quantity + 1;
                const newTotal = newQuantity * item.productPrice;
                return {
                    ...item,
                    quantity: newQuantity,
                    total: newTotal.toFixed(2)
                };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        const newTotalPrice = updatedCartItems.reduce((acc, item) => acc + parseFloat(item.total), 0);
        setTotalPrice(newTotalPrice);
    };

    const decreaseQuantity = (itemId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId && item.quantity > 1) {
                const newQuantity = item.quantity - 1;
                const newTotal = newQuantity * item.productPrice;
                return {
                    ...item,
                    quantity: newQuantity,
                    total: newTotal.toFixed(2)
                };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        const newTotalPrice = updatedCartItems.reduce((acc, item) => acc + parseFloat(item.total), 0);
        setTotalPrice(newTotalPrice);
    };

    const removeFromCart = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }
            // Remove the item from the cartItems state
            const updatedCartItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCartItems);
            // Recalculate total price
            const newTotalPrice = updatedCartItems.reduce((acc, item) => acc + parseFloat(item.total), 0);
            setTotalPrice(newTotalPrice);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <section className="h-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Cart - {cartItems.length} items</h5>
                                </div>
                                {cartItems.map(item => (
                                    <div key={item.id} className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                    {item.imageUrl && (
                                                        <img src={`http://localhost:5000/${item.imageUrl}`} alt={item.productName} className="card-img-top" style={{ maxHeight: '200px' }} />
                                                    )}
                                                    <a href="#!">
                                                        <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                <p><strong>{item.productName}</strong></p>
                                                <button type="button" className="btn btn-danger btn-sm me-1 mb-2" onClick={() => removeFromCart(item.id)}>
                                                    <i className="fas fa-trash"></i> Remove Cart
                                                </button>
                                            </div>
                                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
                                                    <button className="btn btn-primary px-3 me-2" onClick={() => decreaseQuantity(item.id)}>
                                                        <i className="fas fa-minus"></i>
                                                    </button>
                                                    <div className="form-outline">
                                                        <input id={`quantity-${item.id}`} min="0" name="quantity" value={item.quantity} type="number" className="form-control" />
                                                        <label className="form-label" htmlFor={`quantity-${item.id}`}>Quantity</label>
                                                    </div>
                                                    <button className="btn btn-primary px-3 ms-2" onClick={() => increaseQuantity(item.id)}>
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                </div>
                                                <p className="text-start text-md-center">
                                                    <strong>Price: $ {item.productPrice}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <p><strong>Expected shipping delivery</strong></p>
                                    <p className="mb-0">12.10.2020 - 14.10.2020</p>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body">
                                    <p><strong>We accept</strong></p>
                                    <img className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                        alt="Visa" />
                                    <img className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                        alt="American Express" />
                                    <img className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                        alt="Mastercard" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Total amount</strong>
                                                <strong>
                                                    <p className="mb-0">(including VAT)</p>
                                                </strong>
                                            </div>
                                            <span><strong>Total Price: $ {totalPrice.toFixed(2)}</strong></span>
                                        </li>
                                    </ul>
                                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={handleCheckout}>
                                        Go to checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddToCart;
