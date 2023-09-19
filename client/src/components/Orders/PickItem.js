import { Card, ListGroup, Container, Button } from 'react-bootstrap';

function PickItem({ item, addItem }) {
  return (
    <Container id='pick-item' className="pick-item">
      <ListGroup horizontal>
        <ListGroup.Item>
          <Card.Img src={item.product.product_image?.url} />
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Code</Card.Text>
          <Card.Text>{item.product.code}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text>{item.product.name}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Assigned: </Card.Text>
          <Card.Text>{item.assigned_quantity}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Picked: </Card.Text>
          <Card.Text>{item.picked_quantity}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={() => addItem(item)} className="btn btn-primary">
            +
            </Button>
          </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}

export default PickItem;
