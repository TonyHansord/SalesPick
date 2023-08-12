function Product() {
  return (
    <div className="product">
      <img
        src="https://www.bigw.com.au/medias/sys_master/images/images/hb9/hb3/27923258376222.jpg"
        alt=""
      />
      <div className="product-info-container">
        <div className="product-info">
          <p className="product-code">
            <span>Code: </span>156548
          </p>
          <p className="product-name">Bright Starts Hug-a-bye Baby ​</p>
        </div>
        <div className="product-price-stock">
          <p className="product-price">$19.00</p>
          <p className="product-stock">
            <span>In Stock: </span>15
          </p>
          <p className="product-stock">
            <span>Assigned: </span>3
          </p>
        </div>
      </div>
      <div className="product-actions">
        <button className="btn btn-primary">Edit</button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}

export default Product;
