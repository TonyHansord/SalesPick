import React, { useState, useEffect, useCallback } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function Item({ item, order, setOrderTotal }) {
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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderTotal(data.order_total);
      });
  };

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
        <Card onClick={handleDeleteItem}>Delete</Card>
      </div>
    </Card>
  );
}

export default Item;
