import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import ROUTES from '../../../navigations/Routes';


function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Checkout() {
  const [form, setForm] = useState({
    userId: '',
    name: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: ''
  });
  
  const [formError, setFormError] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [orderHeaders, setOrderHeaders] = useState([]);
  const navigate = useNavigate();
  const querypa = useQuery(); // Query params are not used in the current implementation

  // Handler for form field changes
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Fetch user ID and role from local storage
    const userId = localStorage.getItem('id');
    const role = localStorage.getItem('role');
    
    if (userId) {
      setForm(prevForm => ({ ...prevForm, userId }));
      fetchOrderHeaders(userId); // Fetch order headers on component mount
    }
  }, []);

  // Fetch order headers
  const fetchOrderHeaders = async (userId) => {
    try {
      const response = await axios.get('http://localhost:8763/order', {
        params: { userId }
      });
      setOrderHeaders(response.data.orderHeaders);
    } catch (error) {
      console.error('Failed to fetch order headers:', error);
    }
  };

  // Save order header
  const saveOrderHeader = async () => {
    try {
      const userId = localStorage.getItem('id'); // Correctly retrieve userId
      
      if (!userId) {
        alert('User ID is not available.');
        return;
      }

      const data = { ...form, userId };
      const response = await axios.post('http://localhost:8763/order', data);

      setConfirmationMessage('Congratulations, Your Order is confirmed');
      setTimeout(() => setConfirmationMessage(''), 5000);

      localStorage.removeItem('cart'); // Clear cart from local storage
      fetchOrderHeaders(userId); // Optionally refresh order headers
    } catch (error) {
      alert('Failed to submit data');
    }
  };

  // Handle form submission
  const onSubmit = async () => {
    await saveOrderHeader();
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      navigate(ROUTES.universityAdmin.name);
    } else {
      navigate(ROUTES.home.name);
    }
  };

  return (
    <div>
      <Header />
      <div className='row p-2 m-2'>
        <div className='card text-center mx-auto'>
          <div className='card-header'>
            Check-Out
          </div>
          <div className='card-body'>
            <div className='form-group row'>
              <label className='col-4'>Name</label>
              <div className='col-8'>
                <input 
                  type='text' 
                  name='name' 
                  className='form-control' 
                  placeholder='Name' 
                  onChange={changeHandler} 
                />
                <p className='text-danger'>{formError.name}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Street Address</label>
              <div className='col-8'>
                <input 
                  type='text' 
                  name='streetAddress' 
                  className='form-control' 
                  placeholder='Street Address' 
                  onChange={changeHandler} 
                />
                <p className='text-danger'>{formError.streetAddress}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>City</label>
              <div className='col-8'>
                <input 
                  type='text' 
                  name='city' 
                  className='form-control' 
                  placeholder='City' 
                  onChange={changeHandler} 
                />
                <p className='text-danger'>{formError.city}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>State</label>
              <div className='col-8'>
                <input 
                  type='text' 
                  name='state' 
                  className='form-control' 
                  placeholder='State' 
                  onChange={changeHandler} 
                />
                <p className='text-danger'>{formError.state}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Postal Code</label>
              <div className='col-8'>
                <input 
                  type='text' 
                  name='postalCode' 
                  className='form-control' 
                  placeholder='Postal Code' 
                  onChange={changeHandler} 
                />
                <p className='text-danger'>{formError.postalCode}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Phone Number</label>
              <div className='col-8'>
                <input 
                  type='text' 
                  name='phoneNumber' 
                  className='form-control' 
                  placeholder='Phone Number' 
                  onChange={changeHandler} 
                />
                <p className='text-danger'>{formError.phoneNumber}</p>
              </div>
            </div>
          </div>
          <div className='card-footer text-muted'>
            <button className='btn btn-primary' onClick={onSubmit}>Pay And Check-Out</button>
          </div>
        </div>
        {confirmationMessage && (
          <div className='alert alert-success mt-3'>
            {confirmationMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
