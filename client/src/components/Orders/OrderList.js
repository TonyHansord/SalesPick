import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useCallback, useEffect, useState, createContext } from 'react';
import './Orders.css';
import Order from './Order';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

export const OrderContext = createContext();

function OrderList({ action }) {
  const searchOptions = [
    {
      title: 'Priority',
      key: 'priority',
      type: 'text',
    },

    {
      title: 'Order ID',
      key: 'id',
      type: 'integer',
    },
    {
      title: 'Customer Name',
      key: 'customer_name',
      type: 'text',
    },
    {
      title: 'Product Name',
      type: 'text',
    },
    {
      title: 'Order Date',
      type: 'date',
    },
    {
      title: 'Order Status',
      type: 'text',
    },
  ];

  const [orderList, setOrderList] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState(0);
  const [selectIsActive, setSelectIsActive] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const fetchOrders = useCallback(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderList(data);
      });
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, selectIsActive]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  const renderUsers = () => {
    return users.map((user) => {
      return (
        <option key={user.id} value={user.full_name}>
          {user.full_name}
        </option>
      );
    });
  };

  const renderOrders = () => {
    return orderList.map((order) => {
      return (
        <Order
          key={order.id}
          order={order}
          action={action}
          setSelectedOrders={setSelectedOrders}
          selectIsActive={selectIsActive}
        />
      );
    });
  };

  const assignPriority = (priority) => {
    console.log(priority);
    console.log(selectedOrders);

    selectedOrders.forEach((order) => {
      fetch(`/api/orders/${order.id}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priority: priority,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOrderList(data);
        });
    });
  };

  const assignUser = (user_name) => {
    let user = users.find((user) => {
      return user.full_name === user_name;
    });

    console.log(user);
    console.log(selectedOrders);

    selectedOrders.forEach((order) => {
      fetch(`/api/orders/${order.id}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setOrderList(data);
        });
    });
  };

  return (
    <>
      <OrderContext.Provider value={{ selectIsActive, setSelectIsActive }}>
        <ViewTitleBar title="Orders List" />
        <div className="main-container">
          <div className="top-container">
            <SearchBar type="orders" searchOptions={searchOptions} />
            <div className="action-container assign-container">
              <h3>Assign</h3>
              <div className="assign">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  id="select-priority"
                  className="select"
                  onChange={(e) => setSelectedPriority(e.target.selectedIndex)}
                >
                  <option value=""></option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Select>
                <button
                  type="button"
                  onClick={() => assignPriority(selectedPriority)}
                >
                  Assign
                </button>
              </div>
              <div className="assign">
                <Form.Label>User</Form.Label>
                <Form.Select
                  id="select-assigned-to"
                  className="select"
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value=""></option>
                  {renderUsers()}
                </Form.Select>
                <button type="button" onClick={() => assignUser(selectedUser)}>
                  Assign
                </button>
              </div>
            </div>
          </div>
          <Container className="button-container">
            <ListGroup horizontal>
              <ListGroup.Item>
                <Button
                  variant="secondary"
                  className={selectIsActive ? 'active' : ''}
                  onClick={() => {
                    setSelectIsActive(!selectIsActive);
                    if (selectIsActive) {
                      setSelectedOrders([]);
                    }
                    fetchOrders();
                    console.log(selectIsActive);
                  }}
                >
                  Select
                </Button>
                <Button
                  variant="secondary"
                  className={showCompleted ? 'active' : ''}
                  onClick={() => setShowCompleted(!showCompleted)}
                >
                  Show Completed
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Container>
          <Container id="order-list" className="list-container">
            {renderOrders()}
          </Container>
        </div>
      </OrderContext.Provider>
    </>
  );
}

export default OrderList;
