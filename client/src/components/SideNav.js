import './SideNav.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';

function SideNav({ sections }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const renderNavLinks = () => {
    return sections.map((section) => {
      return (
        <Link to={section.url} className="nav-link">
          <span className="d-sm-inline">
            <h4 className="nav-section">{section.title}</h4>
          </span>
        </Link>
      );
    });
  };

  return (
    <nav id="side-nav" class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="app-name navbar-brand font-weight-bolder" href="/">
        <span className="brand">SalesPick</span>
      </a>
      <button
        class="toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class={`${isNavCollapsed ? 'collapse' : ''} bg-dark navbar-collapse`}
        id="navbarNav"
      >
        {renderNavLinks()}
      </div>
    </nav>
  );
}

export default SideNav;
