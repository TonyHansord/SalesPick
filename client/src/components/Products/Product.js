import { useNavigate } from 'react-router-dom';
import { Container, ListGroup, Card } from 'react-bootstrap';

function Product({ product }) {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`${product.id}`)} className="product">
      <ListGroup horizontal className="product-info-container">
        <ListGroup.Item>
          <img src={product.product_image?.url} alt={product.name} />
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text>
            <span className='bold-detail'>Code: </span>
            {product.code}
          </Card.Text>
          </ListGroup.Item>
          <ListGroup.Item>
          <Card.Text>{product.name}​</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="product-price">${product.price}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text>
            <span className='bold-detail'>In Stock: </span>
            {product.current_stock}
          </Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text>
            <span className='bold-detail'>Assigned: </span>
            {product.assigned_stock}
          </Card.Text>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}

export default Product;
