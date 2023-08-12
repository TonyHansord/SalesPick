import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import './Orders.css';
import Order from './Order';
import { Row, Container, Col, Table } from 'react-bootstrap';

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

  const renderHeadings = () => {
    return searchOptions.map((option) => {
      return (
        <th className={option.title.toLowerCase().replace(' ', '-')}>
          {option.title}
        </th>
      );
    });
  };

  return (
    <div className="main-view">
      <ViewTitleBar title="Orders List" />
      <div className="main-container">
        <div className="top-container">
          <SearchBar type="orders" searchOptions={searchOptions} />
        </div>
        <Container id="order-list" className="list-container"></Container>
      </div>
    </div>
  );
}

export default OrderList;
