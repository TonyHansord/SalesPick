import Customer from './Customer';
import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { Container, Card } from 'react-bootstrap';
import CustomerModal from './CustomerModal';
import { useState } from 'react';

function CustomerList({ setSelectedCustomer }) {
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

  let customers = [
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main St',
      suburb: 'San Diego',
      state: 'CA',
      postcode: '92101',
      phone: '555-555-5555',
      email: '',
    },
  ];

  const [customerList, setCustomerList] = useState(customers);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const renderCustomers = () => {
    return customerList.map((customer) => {
      return (
        <Customer
          key={customer}
          customer={customer}
          setSelectedCustomer={setSelectedCustomer}
        />
      );
    });
  };

  return (
    <div className="main-view">
      <ViewTitleBar title="Customer List" />
      <div className="main-container">
        <div className="top-container">
          <SearchBar type="customer" searchOptions={searchOptions} />
          <div className="action-container">
            <Card className="card" onClick={handleShowModal}>
              <Card.Title>New Customer</Card.Title>
            </Card>
          </div>
        </div>
        <Container id="customer-list" className="list-container">
          <table>
            <tr>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Suburb</th>
              <th>State</th>
              <th>Postcode Code</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
            {renderCustomers()}
          </table>
        </Container>
      </div>
      <CustomerModal
        show={showModal}
        handleClose={handleCloseModal}
        setCustomerList={setCustomerList}
      />
    </div>
  );
}

export default CustomerList;
