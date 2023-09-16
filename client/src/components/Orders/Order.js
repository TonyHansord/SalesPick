import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Card, Container } from 'react-bootstrap';
import { OrderContext } from './OrderList';

function Order({ order, setSelectedOrders, action }) {
  const formattedDate = new Date(order.created_at).toLocaleDateString();
  const [statusClass, setStatusClass] = useState('');
  const [priorityClass, setPriorityClass] = useState('');
  const { selectIsActive } = useContext(OrderContext);
  const [selectedClass, setSelectedClass] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (order.status === 'pending') {
      setStatusClass('order pending');
    } else if (order.status === 'in_progress') {
      setStatusClass('order in-progress');
    } else if (order.status === 'complete') {
      setStatusClass('order completed');
    }
  }, [order.status]);

  useEffect(() => {
    if (!selectIsActive) {
      setSelectedClass('');
      setSelectedOrders([]);
    }
  }, [selectIsActive, setSelectedClass, setSelectedOrders]);

  useEffect(() => {
    if (order.priority === 'high') {
      setPriorityClass('high');
    } else if (order.priority === 'medium') {
      setPriorityClass('medium');
    } else if (order.priority === 'low') {
      setPriorityClass('low');
    } else {
      setPriorityClass('');
    }
  }, [order.priority]);

  const handleOrderWasClicked = () => {
    console.log('Order was clicked');

    if (selectIsActive) {
      setSelectedOrders((selectedOrders) => {
        if (selectedOrders.includes(order)) {
          setSelectedClass('');
          return selectedOrders.filter((selectedOrder) => {
            return selectedOrder.id !== order.id;
          });
        } else {
          setSelectedClass('selected');
          return [...selectedOrders, order];
        }
      });
    } else {
      navigate(`${order.id}`);
    }
  };

  return (
    <Container
      className={`order-container ${selectedClass}`}
      onClick={handleOrderWasClicked}
    >
      <ListGroup horizontal>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Order No:</Card.Text>
          <Card.Text>{order.id}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Customer:</Card.Text>
          <Card.Text>{order.customer.name}</Card.Text>
        </ListGroup.Item>

        {action === 'sales' ? (
          <ListGroup.Item>
            <Card.Text className="order-total">{`$ ${order.order_total}`}</Card.Text>
          </ListGroup.Item>
        ) : null}
      </ListGroup>

      <ListGroup horizontal>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Date:</Card.Text>
          <Card.Text>{formattedDate}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Product:</Card.Text>
          <Card.Text>{order.items[0]?.product.name}</Card.Text>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup horizontal>
        <ListGroup.Item>
          <Container className={`priority ${priorityClass}`}></Container>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Text className="bold-detail">Assigned To:</Card.Text>
          <Card.Text>{order.user.full_name}</Card.Text>
        </ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item>
          <Container className={statusClass}>
            <Card.Text>{order.status}</Card.Text>
          </Container>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}

export default Order;
