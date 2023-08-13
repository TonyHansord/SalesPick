import Customer from './Customer';
import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { Container, Card } from 'react-bootstrap';
import CustomerModal from './CustomerModal';
import { useState } from 'react';

function CustomerList() {
  const searchOptions = [
    {
      title: 'Customer ID',
      type: 'integer',
    },
    {
      title: 'Customer Name',
      type: 'text',
    },
  ];

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="main-view">
      <ViewTitleBar title="Customer List" />
      <div className="main-container">
        <div className="top-container">
          <SearchBar type="customer" searchOptions={searchOptions} />
          <div className="action-container">
            <Card className="card" onClick={() => setShowModal(true)}>
              <Card.Title>New Customer</Card.Title>
            </Card>
          </div>
        </div>
        <Container id="customer-list" className="list-container"></Container>
      </div>
      <CustomerModal show={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default CustomerList;
