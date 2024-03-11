import React, { useState, useEffect } from 'react';
import Navbar from '../Landing_auth_pages/Homenavbar'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch profile details when the component mounts
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await fetch('http://127.0.0.1:5000/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}` // Pass token in the Authorization header
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data); // Set profile data in state
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

  return (
    <div>
      <Navbar/>
      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
            {error ? (
        <p>Error: {error}</p>
      ) : profileData ? (
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5" style={{color:'black'}}>{profileData.firstName}</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{profileData.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">{profileData.phoneNumber}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
              ) : (
                <p>Loading profile...</p>
              )}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    {/* <h2>Profile</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : profileData ? (
        <div>
          <p>UserID: {profileData.userId}</p>
          <p>First Name: {profileData.firstName}</p>
          <p>Last Name: {profileData.lastName}</p>
          <p>Email: {profileData.email}</p>
          <p>Phone Number: {profileData.phoneNumber}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div> */}
    </div>
  );
}

export default Profile;
