import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function Item({ item, order, setOrderTotal }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const availableStock =
    item.product.current_stock - item.product.assigned_stock;

  useEffect(() => {
    fetch(`/items/${item.id}`, {
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
        fetch(`/orders/${order.id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setOrderTotal(data.order_total);
          });
      });
  }, [quantity]);

  return (
    <div className="item-container">
      <div className="item-details">
        <p>
          <span className="item-heading">Code: </span>
          {item.product.code}
        </p>
        <p>
          <span className="item-heading">Product: </span>
          {item.product.name}
        </p>
      </div>
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
    </div>
  );
}

export default Item;
