import { Card, ListGroup, Container } from 'react-bootstrap';
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
    <Container id="customer-card" className='styled-card' onClick={renderCustomerView}>
      <ListGroup horizontal>
        <ListGroup.Item>
          <Card.Title>{customer.name}</Card.Title>
        </ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Street:</Card.Text>
          <Card.Text>{customer.address?.street}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Suburb:</Card.Text>
          <Card.Text>{customer.address?.suburb}</Card.Text>
        </ListGroup.Item>

        <ListGroup.Item>
          <Card.Text className="bold-detail">State:</Card.Text>
          <Card.Text>{customer.address?.state}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Postcode:</Card.Text>
          <Card.Text>{customer.address?.postcode}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Email:</Card.Text>
          <Card.Text>{customer.email}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Phone:</Card.Text>
          <Card.Text>{customer.phone_number}</Card.Text>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}

export default Customer;
