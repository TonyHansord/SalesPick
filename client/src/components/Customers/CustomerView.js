import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Order from '../Orders/Order';
import DetailsContainer from '../Utilities/DetailsContainer';
import ActionContainer from '../Utilities/ActionContainer';
import CustomerModal from './CustomerModal';

function CustomerView({ user, customerID }) {
  const navigate = useNavigate();
  const params = useParams();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: {
      street: '',
      suburb: '',
      state: '',
      postcode: '',
    },
  });
  const [customerOrders, setCustomerOrders] = useState([]);

  console.log(params);
  let id = params.customer_id ? params.customer_id : customerID;

  const getCustomer = useCallback(() => {
    fetch(`/api/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomer(data);
        setCustomerOrders(data.orders);
      });
  }, [id]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  console.log(customer);
  const { street, state, suburb, postcode } = customer?.address;
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleClickNewOrder = () => {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: customer.id,
        // user_id: user.id,
        status: 0,
        priority: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate(`/orders/${data.id}`);
      });
  };

  const details = [
    {
      title: 'Name',
      value: customer?.name,
    },
    {
      title: 'Email',
      value: customer?.email,
    },
    {
      title: 'Phone',
      value: customer?.phone_number,
    },
    {
      title: 'Address',
      value: `${street} ${suburb} ${state} ${postcode}`,
    },
  ];

  const actions = [
    {
      title: 'Edit Customer',
      method: () => {
        console.log('Edit Customer');
        handleShowModal();
      },
    },
    {
      title: 'New Order',
      method: () => {
        console.log('New Order');
        handleClickNewOrder();
      },
    },
  ];

  // for each order in customer.orders, render a row in the table
  const renderOrders = (orders) => {
    console.log(orders);

    if (!orders) {
      return null;
    } else {
      return orders.map((order) => {
        return (
          <Order
            key={order.id}
            order={order}
            action={'sales'}
            selectable={false}
          />
        );
      });
    }
  };

  return (
    <>
      <ViewTitleBar title={customer?.name} hasBackButton />
      <div className="main-container">
        <div className="top-container">
          <DetailsContainer data={details} />
          <ActionContainer actions={actions} cardSize={'med'} />
        </div>
        <div className="bottom-container">
          <div className="orders-container">
            <h3>Orders</h3>
            {renderOrders(customerOrders)}
          </div>
        </div>
      </div>
      <CustomerModal
        show={showModal}
        customerData={customer}
        getCustomer={getCustomer}
        handleClose={handleCloseModal}
      />
    </>
  );
}

export default CustomerView;
