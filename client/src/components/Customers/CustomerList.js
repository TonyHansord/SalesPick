import Customer from './Customer';
import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { Container, Card } from 'react-bootstrap';

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

  return (
    <div className="main-view">
      <ViewTitleBar title="Customer List" />
      <div className="main-container">
        <div className="top-container">
          <SearchBar type="customer" searchOptions={searchOptions} />
          <div className="action-container">
            <Card className="card">
              <Card.Title>New Customer</Card.Title>
            </Card>
          </div>
        </div>
        <Container id="customer-list" className="list-container"></Container>
      </div>
    </div>
  );
}

export default CustomerList;
