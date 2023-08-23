import { Link } from 'react-router-dom';
import { useState } from 'react';

function Order({ order, setSelectedOrders }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.checked);
    console.log(order);

    setIsSelected(e.target.checked);
    setSelectedOrders((selectedOrders) => {
      if (e.target.checked) {
        return [...selectedOrders, order];
      } else {
        return selectedOrders.filter((selectedOrder) => {
          return selectedOrder.id !== order.id;
        });
      }
    });
  };

  return (
    <tr className="order">
      <td className="select">
        <input type="checkbox" name="assign" onChange={handleChange} />
      </td>
      <td className="order-priority">{order.priority}</td>
      <td className="order-assigned-to">{order.user.full_name}</td>
      <td className="order-id">
        <Link to={`${order.id}`}>{order.id}</Link>
      </td>
      <td className="order-customer">{order.customer.name}</td>
      <td className="order-product">{order.first_item.product.name}</td>
      <td className="order-date">{order.created_at}</td>
      <td className="order-total">${order.order_total}</td>
      <td className="order-status">{order.status}</td>
    </tr>
  );
}

export default Order;
