function Product({ product }) {
  return (
    <div className="product">
      <img src={product.productImageURL} alt={product.productName} />
      <div className="product-info-container">
        <div className="product-info">
          <p className="product-code">
            <span>Code: </span>
            {product.productCode}
          </p>
          <p className="product-name">{product.productName}​</p>
        </div>
        <div className="product-price-stock">
          <p className="product-price">{product.productPrice}</p>
          <p className="product-stock">
            <span>In Stock: </span>
            {product.productQuantity}
          </p>
          <p className="product-stock">
            <span>Assigned: </span>
            {product.productAssigned}
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
