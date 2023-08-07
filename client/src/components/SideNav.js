import './SideNav.css';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

function SideNav({ sections }) {
  const renderNavLinks = () => {
    return sections.map((section) => {
      return (
        <Link to={section.url}>
          <li className="nav-item">
            <span className="ms-1 d-none d-sm-inline">{section.title}</span>
          </li>
        </Link>
      );
    });
  };

  return (
    <div id="side-nav" className="container-fluid overflow-hidden ">
      <div className="row overflow-auto">
        <div
          id="side-nav-col"
          className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top"
        >
          <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
            <a
              href="/"
              className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5">
                <span className="d-none d-sm-inline">Brand</span>
              </span>
            </a>
            <ul
              className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
              id="menu"
            >
              {renderNavLinks()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
