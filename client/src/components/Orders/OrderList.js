import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useEffect, useState } from 'react';
import './Orders.css';
import Order from './Order';
import { Container, Card, Form } from 'react-bootstrap';

function OrderList() {
  const searchOptions = [
    {
      title: 'Priority',
      type: 'text',
    },
    {
      title: 'Assigned To',
      type: 'text',
    },

    {
      title: 'Order ID',
      type: 'integer',
    },
    {
      title: 'Customer Name',
      type: 'text',
    },
    {
      title: 'Product Name',
      type: 'text',
    },
    {
      title: 'Order Date',
      type: 'date',
    },
    {
      title: 'Total',
      type: 'currency',
    },
    {
      title: 'Order Status',
      type: 'text',
    },
  ];

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    fetch('/orders')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderList(data);
      });
  }, []);

  const renderOrders = () => {
    return orderList.map((order) => {
      return <Order key={order} order={order} />;
    });
  };


  return (
    <div className="main-view">
      <ViewTitleBar title="Orders List" />
      <div className="main-container">
        <div className="top-container">
          <SearchBar type="orders" searchOptions={searchOptions} />
          <div className="action-container assign-container">
            <h3>Assign</h3>
            <div className="assign">
              <Form.Label>Priority</Form.Label>
              <Form.Select id="select-priority" className="select">
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Select>
            </div>
            <div className="assign">
              <Form.Label>User</Form.Label>
              <Form.Select id="select-assigned-to" className="select">
                <option value="all">All</option>
                <option value="john-doe">John Doe</option>
                <option value="jane-doe">Jane Doe</option>
              </Form.Select>
            </div>
            <button type="button">Assign</button>
          </div>
        </div>
        <Container id="order-list" className="list-container">
          <table className="table">
            <thead>
              <tr>
                <th className="select">
                  <input type="checkbox" />
                </th>
                <th className="order-priority">Priority</th>
                <th className="order-assigned-to">Assigned To</th>
                <th className="order-id">Order ID</th>
                <th className="order-customer">Customer Name</th>
                <th className="order-product">Product Name</th>
                <th className="order-date">Order Date</th>
                <th className="order-total">Total</th>
                <th className="order-status">Order Status</th>
              </tr>
            </thead>
            <tbody>
      
            </tbody>
          </table>
        </Container>
      </div>
    </div>
  );
}

export default OrderList;
