import ViewTitleBar from '../Utilities/ViewTitleBar';
import { Card } from 'react-bootstrap';

function CustomerView({
  customer: { id, name, address, phone_number, email, orders },
}) {
  const renderOrders = () => {
    console.log(orders);

    if (orders.length === 0) {
      return (
        <tr>
          <td>No orders found</td>
        </tr>
      );
    } else {
      return orders.map((order) => {
        return (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.created_at}</td>
            <td>{order.first_product.name}</td>
            <td>{order.order_total}</td>
            <td>{order.status}</td>
          </tr>
        );
      });
    }
  };

  return (
    <div className="main-view">
      <ViewTitleBar title={name} hasBackButton />
      <div className="main-container">
        <div className="top-container">
          <div className="details-container">
            <h3>{name}</h3>
            <div className="details">
              <p>
                <span className="bold-detail">ID: </span>
                {id}
              </p>
              <p>
                <span className="bold-detail">Address: </span>
                {`${address?.street} ${address?.suburb} ${address?.state} ${address?.postcode}`}
              </p>
              <p>
                <span className="bold-detail">Phone: </span>
                {phone_number}
              </p>
              <p>
                <span className="bold-detail">Email: </span>
                {email}
              </p>
            </div>
          </div>
          <div className="action-container">
            <Card className="card">
              <Card.Title>New Order</Card.Title>
            </Card>
          </div>
        </div>
        <div className="bottom-container">
          <div className="orders-container">
            <h3>Orders</h3>
            <div className="orders">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Product Name</th>
                    <th>Order Total</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>{renderOrders()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerView;
