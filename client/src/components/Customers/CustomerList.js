import Customer from './Customer';
import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { Container, Card } from 'react-bootstrap';
import CustomerModal from './CustomerModal';
import { useEffect, useState } from 'react';

function CustomerList({ setSelectedCustomer }) {
  const searchOptions = [
    {
      title: 'Customer ID',
      key: 'id',
      type: 'integer',
    },
    {
      title: 'Customer Name',
      key: 'name',
      type: 'text',
    },
  ];

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const actions = [
    {
      title: 'New Customer',
      method: handleShowModal,
    },
  ];

  const [customerList, setCustomerList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomerList(data);
      });
  }, []);

  const renderCustomers = () => {
    if (searchResults.length === 0) {
      return (
        <tr>
          <td>No results found</td>
        </tr>
      );
    } else {
      return searchResults.map((customer) => {
        return (
          <Customer
            key={customer.id}
            customer={customer}
            setSelectedCustomer={setSelectedCustomer}
          />
        );
      });
    }
  };

  return (
    <div className="main-view">
      <ViewTitleBar title="Customer List" />
      <div className="main-container">
        <div className="top-container">
          <SearchBar
            type="customer"
            searchOptions={searchOptions}
            setSearchResults={setSearchResults}
            data={customerList}
          />
          <div className="action-container">
            <Card className="card lrg" onClick={handleShowModal}>
              <Card.Title>New Customer</Card.Title>
            </Card>
          </div>
        </div>
        <Container id="customer-list" className="list-container">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Suburb</th>
                <th>State</th>
                <th>Postcode</th>
                <th>Phone Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{renderCustomers()}</tbody>
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
