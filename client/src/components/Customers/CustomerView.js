import ViewTitleBar from '../Utilities/ViewTitleBar';
import { Card } from 'react-bootstrap';

function CustomerView({ customer }) {
  return (
    <div className="main-view">
      <ViewTitleBar title="Customer List" />
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
                {`${customer.address} ${customer.suburb} ${customer.state} ${customer.postcode}`}
              </p>
              <p>
                <span className="bold-detail">Phone: </span>
                {customer.phone}
              </p>
              <p>
                <span className="bold-detail">Email: </span>
                {customer.email}
              </p>
            </div>
          </div>
          <div className="action-container">
            <Card className="card">
              <Card.Title>New Order</Card.Title>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerView;
