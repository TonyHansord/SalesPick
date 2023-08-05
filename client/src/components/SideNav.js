function SideNav() {
  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100 overflow-auto">
        <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top">
          <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
            <a
              href="/"
              className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5">
                B<span className="d-none d-sm-inline">rand</span>
              </span>
            </a>
            <ul
              className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <a href="/" className="nav-link px-sm-0 px-2">
                  <i className="fs-5 bi-house"></i>
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </a>
              </li>
              <li>
                <a href="/orders" className="nav-link px-sm-0 px-2">
                  <i className="fs-5 bi-table"></i>
                  <span className="ms-1 d-none d-sm-inline">Orders</span>
                </a>
              </li>
              <li>
                <a href="/products" className="nav-link px-sm-0 px-2">
                  <i className="fs-5 bi-grid"></i>
                  <span className="ms-1 d-none d-sm-inline">Products</span>
                </a>
              </li>
              <li>
                <a href="/customers" className="nav-link px-sm-0 px-2">
                  <i className="fs-5 bi-people"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    Customers
                  </span>{' '}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
