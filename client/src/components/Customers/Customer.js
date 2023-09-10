import { Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Customer.css';

function Customer({ customer, setSelectedCustomer }) {
  const navigate = useNavigate();

  const renderCustomerView = () => {
    console.log(customer);
    setSelectedCustomer(customer);
    navigate(`/customers/${customer.id}`);
  };

  return (
    <Card id="customer-card" onClick={renderCustomerView}>
      <Card.Body>
        <Card.Title>{customer.name}</Card.Title>
        <ListGroup>
          <ListGroup.Item>
            <Card.Text className="bold-detail">
              Street: {customer.address?.street}
            </Card.Text>
            <Card.Text className="bold-detail">
              Suburb: {customer.address?.suburb}
            </Card.Text>
            <Card.Text className="bold-detail">
              State: {customer.address?.state}
            </Card.Text>
            <Card.Text className="bold-detail">
              Postcode: {customer.address?.postcode}
            </Card.Text>
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Text className="bold-detail">
              Email: {customer.email}
            </Card.Text>
            <Card.Text className="bold-detail">
              Phone: {customer.phone_number}
            </Card.Text>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Customer;
