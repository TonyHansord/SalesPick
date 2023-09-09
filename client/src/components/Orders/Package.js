import { Card, ListGroup, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

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
        fetchOrder();
      });
  };

  return (
    <Card className="package">
      <ListGroup>
        <ListGroup.Item>
          <div className="package-id">Package ID: {pack.id}</div>
          <Button onClick={() => setActivePackage(pack.id)}>
            Set as Active
          </Button>
          <Button onClick={() => deletePackage(pack.id)}>Delete Package</Button>
        </ListGroup.Item>
      </ListGroup>
      <ListGroup>
        <ListGroup.Item>
          <Form onSubmit={handleUpdateDimensions}>
            <Form.Group className="form-group" controlId="packageHeight">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="text"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="form-group" controlId="packageWidth">
              <Form.Label>Width</Form.Label>
              <Form.Control
                type="text"
                value={width}
                onChange={(e) => {
                  setWidth(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="form-group" controlId="packageLength">
              <Form.Label>Length</Form.Label>
              <Form.Control
                type="text"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="form-group" controlId="packageWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Button type="submit">Update</Button>
          </Form>
        </ListGroup.Item>
      </ListGroup>
      <div className="package-items">
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
              <ListGroup.Item key={item.id}>
                <Card.Text>{item.product_name}</Card.Text>
                <Card.Text>{item.quantity}</Card.Text>
                <Button
                  onClick={() => {
                    console.log(item.id);
                    handleRemoveItem(orderItem.id, item.id);
                  }}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </Card>
  );
}

export default Package;
