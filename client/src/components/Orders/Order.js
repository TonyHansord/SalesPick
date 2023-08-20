import { Link } from 'react-router-dom';

function Order({ order }) {
  return (
    <tr className="order">
      <td className="select">
        <input type="checkbox" />
      </td>
      <td className="order-priority">{order.priority}</td>
      <td className="order-assigned-to">{order.user}</td>
      <td className="order-id">
        <Link to="/orders/15423452">{order.id}</Link>
      </td>
      <td className="order-customer">{order.customer}</td>
      <td className="order-product">iPhone 12</td>
      <td className="order-date">2021-01-01</td>
      <td className="order-total">$123</td>
      <td className="order-status">Pending</td>
    </tr>
  );
}

export default Order;
