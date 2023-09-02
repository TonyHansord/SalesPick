import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Order({ order, setSelectedOrders, action }) {
  const formattedDate = new Date(order.created_at).toLocaleDateString();
  const [statusClass, setStatusClass] = useState('');

  useEffect(() => {
    if (order.status === 'pending') {
      setStatusClass('order pending');
    } else if (order.status === 'in_progress') {
      setStatusClass('order in-progress');
    } else if (order.status === 'completed') {
      setStatusClass('order completed');
    }
  }, [order.status]);

  const handleChange = (e) => {
    console.log(e.target.checked);
    console.log(order);
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
    <tbody>
      <tr id="order-row-details" className={statusClass}>
        <td rowSpan={2} className="select">
          <input type="checkbox" name="assign" onChange={handleChange} />
        </td>
        <td className="order-id">
          <p>
            Order ID:
            <span>
              <Link to={`${order.id}`}>{order.id}</Link>
            </span>
          </p>
        </td>
        <td className="order-date">{formattedDate}</td>
        {action === 'sales' ? (
          <td rowSpan={3} className="order-total">
            ${order.order_total}
          </td>
        ) : null}
      </tr>
      <tr id="order-row-product" className={statusClass}>
        <td colSpan={2} className="order-product">
          {order.items[0].product.name}
        </td>
      </tr>

      <tr id="order-row-priority" className={statusClass}>
        <td className="order-priority">
          <svg height="20" width="20">
            <circle
              cx="10"
              cy="10"
              r="10"
              fill={
                order.priority === 'high'
                  ? '#ff0000'
                  : order.priority === 'medium'
                  ? '#ffa500'
                  : order.priority === 'low'
                  ? '#008000'
                  : 'transparent'
              }
            />
          </svg>
        </td>

        <td className="order-customer">
          Customer:
          {order.customer.name}
        </td>
        <td className="order-assigned-to">
          {`Assigned To: ${order.user.full_name}`}
        </td>
      </tr>
    </tbody>
  );
}

export default Order;
