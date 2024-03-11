// CreateStoreForm.js
import React, { useState } from 'react';

function CreateStoreForm() {
  const [storeName, setStoreName] = useState('');
  const [storeState, setStoreState] = useState('');
  const [storeCity, setStoreCity] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storePhoneNumber, setStorePhoneNumber] = useState('');
  const [storeTiming, setStoreTiming] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateStore = async () => {
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
        setMessage('Store created successfully');
      } else {
        setMessage('Failed to create store');
      }
    } catch (error) {
      setMessage('Failed to create store');
    }
  };

  return (
    <div>
      <h2>Create Store</h2>
      <input type="text" placeholder="Store Name" value={storeName} onChange={(e) => setStoreName(e.target.value)} /><br />
      <input type="text" placeholder="State" value={storeState} onChange={(e) => setStoreState(e.target.value)} /><br />
      <input type="text" placeholder="City" value={storeCity} onChange={(e) => setStoreCity(e.target.value)} /><br />
      <input type="text" placeholder="Address" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} /><br />
      <input type="text" placeholder="Phone Number" value={storePhoneNumber} onChange={(e) => setStorePhoneNumber(e.target.value)} /><br />
      <input type="text" placeholder="Timing" value={storeTiming} onChange={(e) => setStoreTiming(e.target.value)} /><br />
      <button onClick={handleCreateStore}>Create Store</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateStoreForm;
