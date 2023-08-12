import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
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
        <Container id="order-list" className="list-container"></Container>
      </div>
    </div>
  );
}

export default OrderList;
