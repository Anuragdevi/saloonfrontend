import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Landing_auth_pages/Homenavbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getproducts');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setMessage('Token is missing');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/cart', {
                productId: selectedProduct.id,
                quantity: 1, // Hardcoded quantity to 1 for now
                price: selectedProduct.product_price,
                userId: token // Sending user ID as token for now, you might need to adjust this based on your authentication setup
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                setMessage('Item added to cart successfully');
            } else {
                setMessage('Failed to add item to cart');
            }
        } catch (error) {
            setMessage('Failed to add item to cart');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />

            <section style={{ backgroundColor: '#eee', width: '100%' }}>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        {products.map(product => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card text-black">
                                    {product.image_url && (
                                        <img src={`http://localhost:5000/${product.image_url}`} alt={product.product_name} className="card-img-top"/>
                                    )}
                                    <div className="card-body">
                                        <div className="text-center">
                                            <p className="text-muted mb-4">{product.product_details}</p>
                                        </div>
                                        <div>
                                            <div className="d-flex justify-content-between">
                                                <span>Product Name</span><span>{product.product_name}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Price</span><span>${product.product_price}</span>
                                            </div>
                                        </div>

                                        <Button variant="primary" onClick={() => openModal(product)}>View Details</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {message && <p>{message}</p>}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <div>
                            <h4>{selectedProduct.product_name}</h4>
                            <p>{selectedProduct.product_details}</p>
                            <p>Price: ${selectedProduct.product_price}</p>
                            {selectedProduct.image_url && (
                                <img src={`http://localhost:5000/${selectedProduct.image_url}`} alt={selectedProduct.product_name} style={{ maxHeight: '200px' }} />
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleAddToCart}>Add to Cart</Button>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    {message && <p>{message}</p>}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductList;
