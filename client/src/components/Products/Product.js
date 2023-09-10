import { useNavigate } from 'react-router-dom';

function Product({ product }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`${product.id}`)} className="product">
      <img src={product.product_image?.url} alt={product.name} />
      <div className="product-info-container">
        <div className="product-info">
          <p className="product-code">
            <span>Code: </span>
            {product.code}
          </p>
          <p className="product-name">{product.name}​</p>
        </div>
        <div className="product-price-stock">
          <p className="product-price">{product.price}</p>
          <p className="product-stock">
            <span>In Stock: </span>
            {product.current_stock}
          </p>
          <p className="product-stock">
            <span>Assigned: </span>
            {product.assigned_stock}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product;
