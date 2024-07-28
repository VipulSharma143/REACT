import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Header from '../../../components/Header';
import ROUTES from '../../../navigations/Routes';
import axios from 'axios';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY="pk_test_51NYOktCFScgGj36O1DpVI2nOfT1APCgpqW2Ez9ULiLzhHyOX0Lhg9hpMfH5EJaVaoJLHM2NEIIrMCHO4tWw2JOST00u6tWZWZS");

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
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
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
    calculateTotalPrice(items);

    const userId = localStorage.getItem('id');
    if (userId) {
      setForm(prevForm => ({ ...prevForm, userId }));
    }
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateTotalPrice(updatedItems);
  };

  const handleCheckoutAndSubmit = async () => {
    try {
      // Save order header
      const data = { ...form };
      await axios.post('http://localhost:8763/order', data);

      setConfirmationMessage('Congratulations, Your Order will be confirmed when the payment is received');
      setTimeout(() => setConfirmationMessage(''), 5000);

      localStorage.removeItem('cart');

      //  Stripe Checkout
      const stripe = await stripePromise;
      const response = await fetch('http://localhost:8763/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: cartItems }),
      });
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('Error redirecting to checkout:', result.error.message);
      }

      const role = localStorage.getItem('role');
      if (role === 'admin') {
        navigate(ROUTES.universityAdmin.name);
      } else {
        navigate(ROUTES.home.name);
      }
    } catch (error) {
      alert('Failed to submit data');
    }
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderCartItems = () => {
    return cartItems.map((item, index) => (
      <div className="col-12 mb-4" key={index}>
        <div className="card">
          <img className="card-img-top" src={`http://localhost:8763/${item.images[0]}`} alt={item.name} />
          <div className="card-body">
            <h5 className="card-title">Product Name: {item.name}</h5>
            <p className="card-text">Description: {item.description}</p>
            <p className="card-text">Price: ${item.price}</p>
            <p className="card-text">Quantity: {item.quantity}</p>
            <button className="btn btn-danger" onClick={() => handleRemoveItem(index)}>Remove</button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <Header />
      <h2 className="my-4">Shopping Cart</h2>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              {renderCartItems()}
            </div>
          </div>
          <div className="col-lg-6">
            <div className='card'>
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
                      value={form.name} 
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
                      value={form.streetAddress} 
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
                      value={form.city} 
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
                      value={form.state} 
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
                      value={form.postalCode} 
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
                      value={form.phoneNumber} 
                      onChange={changeHandler} 
                    />
                    <p className='text-danger'>{formError.phoneNumber}</p>
                  </div>
                </div>
              </div>
              <div className='card-footer text-muted'>
                <div className="d-flex justify-content-between align-items-center">
                  <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                  <button className='btn btn-primary' onClick={handleCheckoutAndSubmit}>Pay And Check-Out</button>
                </div>
              </div>
            </div>
            {confirmationMessage && (
              <div className='alert alert-success mt-3'>
                {confirmationMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
