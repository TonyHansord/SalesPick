import { Link } from 'react-router-dom';
import { useState } from 'react';

function Order({ order, setSelectedOrders, action }) {
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
    <tr id='order-row-status'
      className={
        order.status === 'pending'
          ? 'order pending'
          : order.status === 'in_progress'
          ? 'order in-progress'
          : 'order completed'
      }
    >
      <td className="select">
        <input type="checkbox" name="assign" onChange={handleChange} />
      </td>
      <td className="order-priority">
        {order.priority === 'high' ? (
          <i className="fas fa-exclamation-circle high">High</i>
        ) : order.priority === 'medium' ? (
          <i className="fas fa-exclamation-circle medium">Medium</i>
        ) : order.priority === 'low' ? (
          <i className="fas fa-exclamation-circle low">Low</i>
        ) : (
          ''
        )}
      </td>
      <td className="order-assigned-to">{order.user.full_name}</td>
      <td className="order-id">
        <Link to={`${order.id}`}>{order.id}</Link>
      </td>
      <td className="order-customer">{order.customer.name}</td>
      <td className="order-product">{order.first_item}</td>
      <td className="order-date">{order.created_at}</td>
      {action === 'sales' ? (
        <td className="order-total">${order.order_total}</td>
      ) : null}
    </tr>
  );
}

export default Order;
