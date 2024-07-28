import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../navigations/Routes';
import Header from '../../components/Header';

function OrderManagement() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = () => {
    axios.get('http://localhost:8763/allorders')
      .then((response) => {
        setOrders(response.data.orderHeaders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderOrders = () => {
    if (loading) {
      return <p>Loading orders...</p>;
    }

    if (orders.length === 0) {
      return <p>No orders found.</p>;
    }

    return orders.map((order) => (
      <div className='card mb-3' key={order._id}>
        <div className="card-body">
          <h5 className="card-title">{order.name}</h5>
          <p className="card-text">Address: {order.streetAddress}</p>
          <p className='card-text'>City: {order.city}</p>
          <p className='card-text'>State: {order.state}</p>
          <p className='card-text'>Postal Code: {order.postalCode}</p>
          <p className="card-text">Phone: {order.phoneNumber}</p>
          <button 
            className='btn btn-primary' 
            onClick={() => navigate(`${ROUTES.orderDetails}?orderId=${order._id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <Header />
      <div className='container'>
        <h2>Orders</h2>
        <div>{renderOrders()}</div>
      </div>
    </div>
  );
}

export default OrderManagement;
