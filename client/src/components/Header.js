import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../navigations/Routes';

function Header() {
  const [user, setUser] = useState({ id: null, role: null });
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let id = localStorage.getItem("id");
    let role = localStorage.getItem("role");
    if (id) setUser({ id, role });

    // Update cart count
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, []);

  const renderMenu = () => {
    if (user?.role === "admin") {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to={ROUTES.universityAdmin.name} className='nav-link'>University Management</Link>
          </li>
          <li className="nav-item active">
            <Link to={ROUTES.home.name} className='nav-link'>Home</Link>
          </li>
          <li className="nav-item">
            <Link to={ROUTES.usermanagement.name} className='nav-link'> User Management</Link>
          </li>
          <Link to={ROUTES.ordermanagement.name} className='nav-link'>Order Management</Link>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to={ROUTES.home.name} className='nav-link'>Home</Link>
          </li>
          <li className="nav-item">
            <Link to={ROUTES.about.name} className='nav-link'>About</Link>
          </li>
          <Link to={ROUTES.contact.name} className='nav-link'>Contact</Link>
        </ul>
      );
    }
  };

  const RenderButtons = () => {
    if (user?.id) {
      return (
        <div className="d-flex align-items-center">
          <Link to={ROUTES.cart.name} className='btn btn-outline-primary mr-2'>
            Cart ({cartCount})
          </Link>
          <button className='btn btn-outline-success' onClick={() => {
            localStorage.clear();
            navigate(ROUTES.Login.name);
          }}>
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <>
          <Link to={ROUTES.register.name} className='btn btn-outline-success my-2 my-sm-0 m-2 '>Register</Link>
          <Link to={ROUTES.Login.name} className='btn btn-outline-success my-2 my-sm-0'>Login</Link>
        </>
      );
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {renderMenu()}
          <div className="ml-auto">
            {RenderButtons()}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
