import Customer from './Customer';
import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { Container, Card } from 'react-bootstrap';
import CustomerModal from './CustomerModal';
import { useCallback, useEffect, useState } from 'react';

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

  const [customerList, setCustomerList] = useState([]);
  const [searchResults, setSearchResults] = useState(customerList);
  const [showModal, setShowModal] = useState(false);

  const fetchCustomers = useCallback(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomerList(data);
        setSearchResults(data);
      });
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const renderCustomers = () => {
    return searchResults.map((customer) => {
      return (
        <Customer
          key={customer.id}
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
          <SearchBar
            type="customer"
            searchOptions={searchOptions}
            setSearchResults={setSearchResults}
            data={customerList}
          />
          <div className="action-container">
            <Card className="card med" onClick={handleShowModal}>
              <Card.Title>New Customer</Card.Title>
            </Card>
          </div>
        </div>
        <Container id="customer-list" className="list-container">
          {renderCustomers()}
        </Container>
      </div>
      <CustomerModal
        show={showModal}
        handleClose={handleCloseModal}
        setCustomerList={setCustomerList}
        fetchCustomers={fetchCustomers}
      />
    </div>
  );
}

export default CustomerList;
