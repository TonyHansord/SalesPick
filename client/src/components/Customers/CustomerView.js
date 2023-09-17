import ViewTitleBar from '../Utilities/ViewTitleBar';
import { Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Order from '../Orders/Order';

function CustomerView({ user, customerID }) {
  const navigate = useNavigate();
  const params = useParams();
  const [customer, setCustomer] = useState({});
  const [customerOrders, setCustomerOrders] = useState([]);

  console.log(params);
  let id = params.customer_id ? params.customer_id : customerID;

  useEffect(() => {
    fetch(`/api/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomer(data);
        setCustomerOrders(data.orders);
      });
  }, [id]);

  // for each order in customer.orders, render a row in the table
  const renderOrders = (orders) => {
    console.log(orders);

    if (!orders) {
      return (
        <tr>
          <td>No orders found</td>
        </tr>
      );
    } else {
      return orders.map((order) => {
        return (
          <Order
            key={order.id}
            order={order}
            action={'sales'}
            selectable={false}
          />
        );
      });
    }
  };

  const handleClickNewOrder = () => {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: customer.id,
        user_id: user.id,
        status: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate(`/orders/${data.id}`);
      });
  };

  return (
    <>
      <ViewTitleBar title={customer?.name} hasBackButton />
      <div className="main-container">
        <div className="top-container">
          <div className="details-container">
            <h3>{customer.name}</h3>
            <div className="details">
              <p>
                <span className="bold-detail">ID: </span>
                {customer.id}
              </p>
              <p>
                <span className="bold-detail">Address: </span>
                {`${customer.address?.street} ${customer.address?.suburb} ${customer.address?.state} ${customer.address?.postcode}`}
              </p>
              <p>
                <span className="bold-detail">Phone: </span>
                {customer.phone_number}
              </p>
              <p>
                <span className="bold-detail">Email: </span>
                {customer.email}
              </p>
            </div>
          </div>
          <div className="action-container">
            <Card className="card med" onClick={handleClickNewOrder}>
              <Card.Title>New Order</Card.Title>
            </Card>
          </div>
        </div>
        <div className="bottom-container">
          <div className="orders-container">
            <h3>Orders</h3>

            {renderOrders(customerOrders)}
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerView;
