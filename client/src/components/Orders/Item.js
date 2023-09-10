import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function Item({ item, order, setOrderTotal }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const availableStock =
    item.product.current_stock -
    item.product.assigned_stock +
    item.assigned_quantity;

  useEffect(() => {
    fetch(`/api/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch(`/api/orders/${order.id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setOrderTotal(data.order_total);
          });
      });
  }, [quantity]);

  return (
    <Card className="pick-item">
      <Card.Img src={item.product.product_image.url} alt={item.product.name} />
      <Card.Body>
        <Card.Title>{item.product.name}</Card.Title>
        <ListGroup horizontal>
          <p>
            <span className="item-heading">Code: </span>
            {item.product.code}
          </p>
        </ListGroup>
      </Card.Body>
      <div className="item-details"></div>
      <div className="item-stock">
        <span className="item-heading">Available: </span>
        <p>{availableStock}</p>
        <input
          type="number"
          min="0"
          max={availableStock}
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
      </div>
      <div className="item-price">
        <p>
          <span className="item-heading">Price: </span>
          {item.product.price.toFixed(2)}
        </p>
        <p>
          <span className="item-heading">Total: </span>
          {(item.product.price * quantity).toFixed(2)}
        </p>
      </div>
      <div className="item-actions">
        <Card>Delete</Card>
      </div>
    </Card>
  );
}

export default Item;
