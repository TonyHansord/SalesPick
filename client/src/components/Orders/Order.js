import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Card, Container } from 'react-bootstrap';

function Order({
  order,
  setSelectedOrders,
  action,
  selectable,
  selectIsActive,
}) {
  const formattedDate = new Date(order.created_at).toLocaleDateString();
  const [statusClass, setStatusClass] = useState('');
  const [priorityClass, setPriorityClass] = useState('');
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
    if (selectable) {
      if (!selectIsActive) {
        setSelectedClass('');
        setSelectedOrders([]);
      }
    }
  }, [selectable, selectIsActive, setSelectedClass, setSelectedOrders]);

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
    if (selectable) {
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
    } else {
      navigate(`/orders/${order.id}`);
    }
  };

  return (
    <Container
      className={`order-container ${selectedClass} styled-card`}
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
          <Card.Text>{order.user?.full_name}</Card.Text>
        </ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item>
          <Container className={statusClass}>
            <Card.Text>
              {order.status === 'in_progress'
                ? 'in progress'.toUpperCase()
                : order.status.toUpperCase()}
            </Card.Text>
          </Container>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}

export default Order;
