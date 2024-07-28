import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import ROUTES from '../../../navigations/Routes';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ProductDetail() {
  const querypa = useQuery();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetProductDetail();
  }, []);

  const GetProductDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8763/productDetails?id=${querypa.get("id")}`);
      setProduct(response.data.ProData);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError(error.message || "Fail To Find Data");
    }
  };

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate(ROUTES.home.name); 
  };

  const renderImages = () => {
    return product?.images?.map((item, index) => (
      <img key={index} className='card-img-top' src={`http://localhost:8763/${item}`}
        height="150px"
        width="150px"
        alt={`Product Image ${index + 1}`} />
    ));
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className='row p-2 m-2'>
        <div className="card mx-auto">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {renderImages()}
          </div>
          <div className="card-body">
            <h5 className="card-title">Product Name: {product?.name}</h5>
            <h5 className="card-title">Product Description: {product?.description}</h5>
            <h5 className="card-title">Product Price: {product?.price}</h5>
            <h5 className="card-title">Product Quantity: {product?.quantity}</h5>
            <button className="btn btn-primary" onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
