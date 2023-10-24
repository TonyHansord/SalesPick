import { Card, ListGroup, Button, Form, Container } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { MessageContext } from '../../App';


function Package({
  pack,
  orderItems,
  deletePackage,
  setActivePackage,
  fetchOrder,
}) {
  const [height, setHeight] = useState(pack.height);
  const [width, setWidth] = useState(pack.width);
  const [length, setLength] = useState(pack.length);
  const [weight, setWeight] = useState(pack.weight);

  const { displayMessage } = useContext(MessageContext);

  useEffect(() => {
    setHeight(pack.height);
    setWidth(pack.width);
    setLength(pack.length);
    setWeight(pack.weight);
  }, [pack]);

  const handleUpdateDimensions = (e) => {
    e.preventDefault();

    fetch(`/api/packages/${pack.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        height: height,
        width: width,
        length: length,
        weight: weight,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        displayMessage('Package dimensions updated', 'success');
        fetchOrder();
      });
  };

  const handleRemoveItem = (orderItemID, packItemID) => {
    console.log(packItemID);
    fetch(`/api/package_items/${packItemID}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: orderItemID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        displayMessage('Item removed from package', 'success');
        fetchOrder();
      });
  };

  return (
    <Container className="package styled-card">
      <ListGroup horizontal>
        <ListGroup.Item>
          <Card.Text className="bold-detail">
            Package ID:
            {pack.id}
          </Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={() => setActivePackage(pack.id)}>
            Set as Active
          </Button>
          <Button onClick={() => deletePackage(pack.id)}>Delete Package</Button>
        </ListGroup.Item>
      </ListGroup>

      <Form onSubmit={handleUpdateDimensions}>
        <ListGroup>
          <ListGroup.Item>
            <Form.Group className="form-group" controlId="packageHeight">
              <Form.Label className='bold-detail'>Height</Form.Label>
              <Form.Control
                type="text"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="form-group" controlId="packageWidth">
              <Form.Label className='bold-detail'>Width</Form.Label>
              <Form.Control
                type="text"
                value={width}
                onChange={(e) => {
                  setWidth(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="form-group" controlId="packageLength">
              <Form.Label className='bold-detail'>Length</Form.Label>
              <Form.Control
                type="text"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="form-group" controlId="packageWeight">
              <Form.Label className='bold-detail'>Weight</Form.Label>
              <Form.Control
                type="text"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button type="submit">Update</Button>
          </ListGroup.Item>
        </ListGroup>
      </Form>

      <ListGroup>
        {pack.package_items.map((item) => {
          console.log(`orderItems:`);
          console.log(orderItems);
          console.log(item);
          const orderItem = orderItems.find(
            (orderItem) => orderItem.product.name === item.product_name
          );
          console.log(orderItem);

          return (
            <>
              <ListGroup.Item key={item.id}>
                <Card.Text>{item.product_name}</Card.Text>
                <Card.Text>Qty:{item.quantity}</Card.Text>
                <Button
                  onClick={() => {
                    console.log(item.id);
                    handleRemoveItem(orderItem.id, item.id);
                  }}
                >
                  <Icon.Trash />
                </Button>
              </ListGroup.Item>
            </>
          );
        })}
      </ListGroup>
    </Container>
  );
}

export default Package;
