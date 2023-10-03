import React, { useState, useEffect, useCallback } from 'react';
import { Card, ListGroup, Container, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import defaultImg from '../../defaultImg.png';

function Item({ item, order, setOrderTotal, fetchOrder }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const availableStock =
    item.product.current_stock -
    item.product.assigned_stock +
    item.assigned_quantity;

  const handleUpdateItem = useCallback(() => {
    fetch(`/api/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: order.id,
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderTotal(data.order_total);
      });
  }, [item.id, quantity, setOrderTotal, order.id]);

  useEffect(() => {
    handleUpdateItem();
  }, [handleUpdateItem, quantity]);

  const handleDeleteItem = () => {
    console.log(item);
    fetch(`/api/items/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: order.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderTotal(data.order_total);
        fetchOrder();
      });
  };

  return (
    <Container id="item" className="pick-item">
      <ListGroup horizontal>
        <ListGroup.Item>
          <Card.Img
            src={
              item.product.product_image
                ? item.product.product_image.url
                : defaultImg
            }
            alt={item.product.name}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Code:</Card.Text>
          <Card.Text>{item.product.code}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text>{item.product.name}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Available:</Card.Text>
          <Card.Text>{availableStock}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Price:</Card.Text>
          <Card.Text>${item.product.price.toFixed(2)}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Total:</Card.Text>
          <Card.Text>${(item.product.price * quantity).toFixed(2)}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <input
            type="number"
            min="0"
            max={availableStock}
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={handleDeleteItem}>
            <Icon.Trash />
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}

export default Item;
