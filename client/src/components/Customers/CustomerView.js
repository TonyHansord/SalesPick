import ViewTitleBar from '../Utilities/ViewTitleBar';
import { Card } from 'react-bootstrap';

function CustomerView({ customer }) {
  return (
    <div className="main-view">
      <ViewTitleBar title="Customer List" />
      <div className="main-container">
        <div className="top-container">
          <div className="details-container">
            <h3>Customer Details</h3>
            <div className="details">
              <div className="detail">
                <h4>Customer Name</h4>
                <p>{customer.name}</p>
              </div>
              <div className="detail">
                <h4>Customer ID</h4>
                <p>{customer.id}</p>
              </div>
              <div className="detail">
                <h4>Address</h4>
                <p>{customer.address}</p>
              </div>
              <div className="detail">
                <h4>Suburb</h4>
                <p>{customer.suburb}</p>
              </div>
              <div className="detail">
                <h4>State</h4>
                <p>{customer.state}</p>
              </div>
              <div className="detail">
                <h4>Postcode</h4>
                <p>{customer.postcode}</p>
              </div>
              <div className="detail">
                <h4>Phone</h4>
                <p>{customer.phone}</p>
              </div>
              <div className="detail">
                <h4>Email</h4>
                <p>{customer.email}</p>
              </div>
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
