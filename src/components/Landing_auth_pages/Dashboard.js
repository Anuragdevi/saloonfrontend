import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { RiStore2Line, RiShoppingBag2Line, RiUserAddLine } from 'react-icons/ri';

const Dashboard = () => {
  // State variables and functions for adding a store
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeState, setStoreState] = useState('');
  const [storeCity, setStoreCity] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storePhoneNumber, setStorePhoneNumber] = useState('');
  const [storeTiming, setStoreTiming] = useState('');
  const [storeMessage, setStoreMessage] = useState('');

  const handleCloseStoreModal = () => setShowStoreModal(false);
  const handleShowStoreModal = () => setShowStoreModal(true);
  // State variables and functions for adding a product
  const [showProductModal, setShowProductModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productMessage, setProductMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleCloseProductModal = () => setShowProductModal(false);
  const handleShowProductModal = () => setShowProductModal(true);
  // State variables and functions for adding an employee
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeePosition, setEmployeePosition] = useState('');
  const [employeeMessage, setEmployeeMessage] = useState('');

  const handleCloseEmployeeModal = () => setShowEmployeeModal(false);
  const handleShowEmployeeModal = () => setShowEmployeeModal(true);

  // State variables for storing data fetched from the server
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editedStore, setEditedStore] = useState({
    storeName: '',
    storeState: '',
    storeCity: '',
    storeAddress: '',
    storePhoneNumber: '',
    storeTiming: ''
  });

  // State variables for storing product data fetched from the server
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch store and product data on component mount
  useEffect(() => {
    fetchStores();
    fetchProducts();
  }, []);

  // Fetch store data from the server
  const fetchStores = async () => {
    try {
      const response = await fetch('http://localhost:5000/getstore');
      if (response.ok) {
        const data = await response.json();
        setStores(data);
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/getproducts');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched products:', data); // Log the fetched data
        setProducts(data);
      } else {
        console.error('Error fetching products:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle view store action
  const handleViewStore = (store) => {
    setSelectedStore(store);
    setShowViewModal(true);
  };
  const handleOpenStoreModal = () => {
    setShowStoreModal(true);
  };


  // Function to handle opening the product modal
  const handleOpenProductModal = () => {
    setShowProductModal(true);
  };

  // Handle edit store action
  const handleEditStore = (store) => {
    setSelectedStore(store);
    setEditedStore({
      storeName: store.storeName,
      storeState: store.storeState,
      storeCity: store.storeCity,
      storeAddress: store.storeAddress,
      storePhoneNumber: store.storePhoneNumber,
      storeTiming: store.storeTiming
    });
    setShowEditModal(true);
  };

  // Handle save edited store action
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/store/${selectedStore.storeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedStore)
      });

      if (response.ok) {
        // Update local store data
        setStores(stores.map(store => store.storeId === selectedStore.storeId ? editedStore : store));
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error updating store:', error);
    }
  };

  // Handle create store action
  const handleCreateStore = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          storeName,
          storeState,
          storeCity,
          storeAddress,
          storePhoneNumber,
          storeTiming
        })
      });

      if (response.ok) {
        setStoreMessage('Store created successfully');
      } else {
        setStoreMessage('Failed to create store');
      }
    } catch (error) {
      console.error('Error creating store:', error);
      setStoreMessage('Failed to create store');
    }
  };

// Adjust handleAddProduct function in the frontend code
const handleAddProduct = async (e) => {
  e.preventDefault();

  if (!imageFile) {
    setProductMessage('Image file is required.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('productPrice', productPrice);
    formData.append('imageFile', imageFile); // Use 'imageFile' as the key to match backend expectation

    const response = await fetch('http://localhost:5000/products', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      setProductMessage('Product added successfully');
    } else {
      setProductMessage('Failed to add product');
    }
  } catch (error) {
    console.error('Error adding product:', error);
    setProductMessage('Failed to add product');
  }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImageFile(file);
      setProductMessage(''); // Clear any previous error messages
    } else {
      setImageFile(null);
      setProductMessage('Please select a JPEG or PNG image file.');
    }
  };


  const [employees, setEmployees] = useState([]);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [employeeSpecialist, setEmployeeSpecialist] = useState('');
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [editEmployeeName, setEditEmployeeName] = useState('');
  const [editEmployeeSpecialist, setEditEmployeeSpecialist] = useState('');
  const [editEmployeeMessage, setEditEmployeeMessage] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/getEmployees');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error('Error fetching employees:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: employeeName,
          specialist: employeeSpecialist
        })
      });

      if (response.ok) {
        setEmployeeMessage('Employee added successfully');
        fetchEmployees(); // Refresh employee list after adding
        setEmployeeName('');
        setEmployeeSpecialist('');
        setShowEmployeeModal(false);
      } else {
        setEmployeeMessage('Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      setEmployeeMessage('Failed to add employee');
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:5000/employees/${editEmployeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editEmployeeName,
          specialist: editEmployeeSpecialist
        })
      });

      if (response.ok) {
        setEditEmployeeMessage('Employee updated successfully');
        fetchEmployees(); // Refresh employee list after updating
        setShowEditEmployeeModal(false);
      } else {
        setEditEmployeeMessage('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      setEditEmployeeMessage('Failed to update employee');
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:5000/employees/${employeeId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setEmployees(employees.filter(employee => employee.EmployeeID !== employeeId));
      } else {
        console.error('Failed to delete employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditEmployeeId(employee.EmployeeID);
    setEditEmployeeName(employee.Name);
    setEditEmployeeSpecialist(employee.Specialist);
    setShowEditEmployeeModal(true);
  };
  // Define handleViewProduct function
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewProductModal(true);
  };
  const [editProductName, setEditProductName] = useState('');
  const [editProductDetails, setEditProductDetails] = useState('');
  const [editProductPrice, setEditProductPrice] = useState('');

  // State variable to track the currently selected product for editing
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Function to handle opening the edit modal and setting initial form values
  const handleOpenEditModal = (product) => {
    setSelectedProductId(product.id);
    setEditProductName(product.product_name);
    setEditProductDetails(product.product_details);
    setEditProductPrice(product.product_price);
    setShowEditModal(true);
  };



  // Function to update product details
  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/${selectedProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_name: editProductName,
          product_details: editProductDetails,
          product_price: editProductPrice
        })
      });

      if (response.ok) {
        // If the update is successful, fetch the updated product data
        await fetchProducts();
        // Close the edit modal
        handleCloseEditModal();
      } else {
        console.error('Failed to update product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  const [showEditModal, setShowEditModal] = useState(false); // State for product edit modal

  const [showViewProductModal, setShowViewProductModal] = useState(false); // State for product view modal

  const handleCloseEditModal = () => setShowEditModal(false); // Event handler for closing product edit modal
  // Inside the Dashboard component
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Filter out the deleted product from the products state
        setProducts(products.filter(product => product.id !== productId));
      } else {
        console.error('Failed to delete product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  // Inside the Dashboard component
  const handleDeleteStore = async (storeId) => {
    try {
      const response = await fetch(`http://localhost:5000/store/${storeId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // If deletion is successful, update the stores state to remove the deleted store
        setStores(stores.filter(store => store.storeId !== storeId));
      } else {
        console.error('Failed to delete store:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1>Dashboard</h1>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          {/* Buttons for adding store, product, and employee */}
          <Button variant="primary" onClick={handleShowStoreModal} className="me-md-2 mb-2">
            <RiStore2Line className="me-2" />
            Create Store
          </Button>
          <Button variant="primary" onClick={handleShowProductModal} className="me-md-2 mb-2">
            <RiShoppingBag2Line className="me-2" />
            Add Product
          </Button>
          <Button variant="primary" onClick={() => setShowEmployeeModal(true)} className="mb-2">
            <RiUserAddLine className="me-2" />
            Add Employee
          </Button>
        </div>

        {/* Store Creation Modal */}
        <Modal show={showStoreModal} onHide={handleCloseStoreModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Store</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateStore}>
              <Form.Group controlId="storeName">
                <Form.Label>Store Name</Form.Label>
                <Form.Control type="text" placeholder="Enter store name" value={storeName} onChange={(e) => setStoreName(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="storeState">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="Enter state" value={storeState} onChange={(e) => setStoreState(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="storeCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter city" value={storeCity} onChange={(e) => setStoreCity(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="storeAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter address" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="storePhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" value={storePhoneNumber} onChange={(e) => setStorePhoneNumber(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="storeTiming">
                <Form.Label>Timing</Form.Label>
                <Form.Control type="text" placeholder="Enter timing" value={storeTiming} onChange={(e) => setStoreTiming(e.target.value)} required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Create Store
              </Button>
            </Form>
            {storeMessage && <p>{storeMessage}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseStoreModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Product Addition Modal */}
        <Modal show={showProductModal} onHide={handleCloseProductModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddProduct}>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="productDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control type="text" placeholder="Enter product description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="productPrice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control type="number" placeholder="Enter product price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="imageFile">
                <Form.Label>Image File (JPEG or PNG)</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} accept="image/jpeg,image/png" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Product
              </Button>
            </Form>
            {productMessage && <p>{productMessage}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProductModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Employee Addition Modal */}
        <Modal show={showEmployeeModal} onHide={handleCloseEmployeeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddEmployee}>
              <Form.Group controlId="employeeName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter employee name" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="employeePosition">
                <Form.Label>Position</Form.Label>
                <Form.Control type="text" placeholder="Enter employee position" value={employeePosition} onChange={(e) => setEmployeePosition(e.target.value)} required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Employee
              </Button>
            </Form>
            {employeeMessage && <p>{employeeMessage}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEmployeeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Store View Modal */}
        <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>View Store</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedStore && (
              <div>
                <p><strong>Store Name:</strong> {selectedStore.storeName}</p>
                <p><strong>State:</strong> {selectedStore.storeState}</p>
                <p><strong>City:</strong> {selectedStore.storeCity}</p>
                <p><strong>Address:</strong> {selectedStore.storeAddress}</p>
                <p><strong>Phone Number:</strong> {selectedStore.storePhoneNumber}</p>
                <p><strong>Timing:</strong> {selectedStore.storeTiming}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowViewModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Store Edit Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Store</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="editStoreName">
                <Form.Label>Store Name</Form.Label>
                <Form.Control type="text" placeholder="Enter store name" value={editedStore.storeName} onChange={(e) => setEditedStore({ ...editedStore, storeName: e.target.value })} required />
              </Form.Group>
              <Form.Group controlId="editStoreState">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="Enter state" value={editedStore.storeState} onChange={(e) => setEditedStore({ ...editedStore, storeState: e.target.value })} required />
              </Form.Group>
              <Form.Group controlId="editStoreCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter city" value={editedStore.storeCity} onChange={(e) => setEditedStore({ ...editedStore, storeCity: e.target.value })} required />
              </Form.Group>
              <Form.Group controlId="editStoreAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter address" value={editedStore.storeAddress} onChange={(e) => setEditedStore({ ...editedStore, storeAddress: e.target.value })} required />
              </Form.Group>
              <Form.Group controlId="editStorePhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" value={editedStore.storePhoneNumber} onChange={(e) => setEditedStore({ ...editedStore, storePhoneNumber: e.target.value })} required />
              </Form.Group>
              <Form.Group controlId="editStoreTiming">
                <Form.Label>Timing</Form.Label>
                <Form.Control type="text" placeholder="Enter timing" value={editedStore.storeTiming} onChange={(e) => setEditedStore({ ...editedStore, storeTiming: e.target.value })} required />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Product View Modal */}
        <Modal show={showViewProductModal} onHide={() => setShowViewProductModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>View Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <div>
                <p><strong>Product Name:</strong> {selectedProduct.productName}</p>
                <p><strong>Description:</strong> {selectedProduct.productDescription}</p>
                <p><strong>Price:</strong> {selectedProduct.productPrice}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowViewProductModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Table of stores */}
        <h2 className="mt-5">Stores</h2>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>State</th>
              <th>City</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Timing</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => (
              <tr key={store.storeId}>
                <td>{index + 1}</td>
                <td>{store.storeName}</td>
                <td>{store.storeState}</td>
                <td>{store.storeCity}</td>
                <td>{store.storeAddress}</td>
                <td>{store.storePhoneNumber}</td>
                <td>{store.storeTiming}</td>
                <td>
                  <Button variant="info" onClick={() => handleViewStore(store)} className="me-2">
                    View
                  </Button>
                  <Button variant="warning" onClick={() => handleEditStore(store)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteStore(store.storeId)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Table of products */}
        <h2 className="mt-5">Products</h2>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{product.product_details}</td>
                <td>{product.product_price}</td>
                <td>
                  <Button variant="info" onClick={() => handleViewProduct(product)}>
                    View
                  </Button>
                  <Button variant="warning" onClick={() => handleOpenEditModal(product)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showViewProductModal} onHide={() => setShowViewProductModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>View Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <div>
                <p><strong>Product Name:</strong> {selectedProduct.product_name}</p>
                <p><strong>Description:</strong> {selectedProduct.product_details}</p>
                <p><strong>Price:</strong> {selectedProduct.product_price}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowViewProductModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" value={editProductName} onChange={(e) => setEditProductName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="editProductDetails">
              <Form.Label>Product Details</Form.Label>
              <Form.Control type="text" value={editProductDetails} onChange={(e) => setEditProductDetails(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="editProductPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control type="number" value={editProductPrice} onChange={(e) => setEditProductPrice(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateProduct}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEmployeeModal} onHide={() => setShowEmployeeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddEmployee}>
            <Form.Group controlId="employeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter employee name" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="employeeSpecialist">
              <Form.Label>Specialist</Form.Label>
              <Form.Control type="text" placeholder="Enter employee specialist" value={employeeSpecialist} onChange={(e) => setEmployeeSpecialist(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Employee
            </Button>
          </Form>
          {employeeMessage && <p>{employeeMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmployeeModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Employee Edit Modal */}
      <Modal show={showEditEmployeeModal} onHide={() => setShowEditEmployeeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editEmployeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={editEmployeeName} onChange={(e) => setEditEmployeeName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="editEmployeeSpecialist">
              <Form.Label>Specialist</Form.Label>
              <Form.Control type="text" value={editEmployeeSpecialist} onChange={(e) => setEditEmployeeSpecialist(e.target.value)} required />
            </Form.Group>
          </Form>
          {editEmployeeMessage && <p>{editEmployeeMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditEmployeeModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateEmployee}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Table of Employees */}
      <h2 className="mt-5" style={{width:'50%'}}>Employees</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Specialist</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.EmployeeID}>
              <td>{index + 1}</td>
              <td>{employee.Name}</td>
              <td>{employee.Specialist}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditEmployee(employee)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteEmployee(employee.EmployeeID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Dashboard;
