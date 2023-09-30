import './SideNav.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Button, Image } from 'react-bootstrap';
import logo from '../logo.png';

function SideNav({ sections, setIsLoggedIn, user, setUser }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  console.log('nav rendered');
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setUser({});
        setIsLoggedIn(false);
        navigate('/login');
      });
  };

  const renderNavLinks = () => {
    return sections.map((section) => {
      return (
        <Link
          key={section.title}
          to={section.url}
          onClick={handleNavCollapse}
          className="nav-link"
        >
          <div className="nav-item">
            {section.icon}
            <h4>{section.title}</h4>
          </div>
        </Link>
      );
    });
  };

  return (
    <nav id="side-nav" className="navbar navbar-expand-md navbar-dark bg-dark">
      <button
        className="toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="app-name navbar-brand font-weight-bolder" href="/">
        <span className="brand">SalesPick</span>
      </a>

      <div
        className={`${
          isNavCollapsed ? 'collapse' : ''
        } bg-dark navbar-collapse`}
        id="navbarNav"
      >
        <div className="nav-links">{renderNavLinks()}</div>

        <Link to="/" className="login nav-link" onClick={handleLogout}>
          <div className="nav-item">
            <Icon.BoxArrowLeft className="nav-icon" />
            <h4>Logout</h4>
          </div>
        </Link>
      </div>

      <div id="user">
        <Icon.PersonCircle className="user-icon" />
        <h4 className="user-name">{user.username}</h4>
      </div>
    </nav>
  );
}

export default SideNav;
