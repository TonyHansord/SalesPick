import { Card, ListGroup } from 'react-bootstrap';

function PickItem({ item, addItem }) {
  return (
    <Card className="pick-item">
      <Card.Img src={item.product.product_image?.url} />
      <Card.Body>
        <Card.Title>{item.product.name}</Card.Title>
        <ListGroup horizontal>
          <ListGroup.Item>
            <p className="item-heading">Code</p>
            <p>{item.product.code}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p className="item-heading">Assigned</p>
            <p>{item.assigned_quantity}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p className="item-heading">Picked</p>
            <p>{item.picked_quantity}</p>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <button className="btn btn-primary" onClick={() => addItem(item)}>
          +
        </button>
      </Card.Footer>
    </Card>
  );
}

export default PickItem;
