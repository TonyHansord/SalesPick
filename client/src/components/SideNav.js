import './SideNav.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';

function SideNav({ sections }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const renderNavLinks = () => {
    return sections.map((section) => {
      return (
        <Link key={section.title} to={section.url} className="nav-link">
          <span className="d-sm-inline">
            <h4 className="nav-section">{section.title}</h4>
          </span>
        </Link>
      );
    });
  };

  return (
    <nav id="side-nav" className="navbar navbar-expand-sm navbar-dark bg-dark">
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
        {renderNavLinks()}
      </div>

      <div id="user">
        <Icon.PersonCircle className="user-icon" />
        <span className="user-name">John Doe</span>
        <Link to="/login" className="login">
          <span className="d-sm-inline">
            <Button className="btn btn-outline-secondary btn-sm nav-section">
              Logout
            </Button>
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default SideNav;
