import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './Orders.css';
import AddProductModal from './AddProductModal';
import Item from './Item';
import { MessageContext } from '../../App';
import DetailsContainer from '../Utilities/DetailsContainer';
import ActionContainer from '../Utilities/ActionContainer';

function SalesView() {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState({
    id: '',
    customer: {
      name: '',
    },
    status: '',
    order_total: 0,
    items: [],
  });
  const [orderTotal, setOrderTotal] = useState(0);
  const { displayMessage } = useContext(MessageContext);

  const params = useParams();

  const orderDetails = [
    {
      title: 'Order ID',
      value: order.id,
    },
    {
      title: 'Customer',
      value: order.customer.name,
    },
    {
      title: 'Status',
      value:
        order.status === 'in_progress'
          ? 'in progress'.toUpperCase()
          : order.status.toUpperCase(),
    },
    {
      title: 'Total',
      value: `$ ${orderTotal?.toFixed(2)}`,
    },
  ];

  const actions = [
    {
      title: 'Save Order',
      method: () => {
        console.log('Save Order');
        handleSaveOrder();
      },
    },
    {
      title: 'Add Item',
      method: () => {
        console.log('Add Item');
        handleShowModal();
      },
    },
    {
      title: 'Delete Order',
      method: () => {
        handleDeleteOrder();
      },
    },
  ];

  const fetchOrder = useCallback(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
        setOrderTotal(data.order_total);
      });
  }, [params.id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const renderItems = () => {
    return order.items.map((item) => {
      return (
        <Item
          key={item.id}
          item={item}
          order={order}
          setOrderTotal={setOrderTotal}
          fetchOrder={fetchOrder}
        />
      );
    });
  };

  const handleShowModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleSaveOrder = () => {
    fetch(`/api/orders/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        displayMessage('Order saved', 'success');
      });
  };

  const handleDeleteOrder = () => {
    fetch(`/api/orders/${params.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          displayMessage(data.error, 'error');
        } else {
          displayMessage(data.message, 'success');
          window.history.back();
        }
      });
  };

  return (
    <>
      <ViewTitleBar title="Sales View" hasBackButton={true} />
      <div className="main-container">
        <div className="top-container">
          <DetailsContainer data={orderDetails} />
          <ActionContainer actions={actions} />
        </div>
        <div className="bottom-container">
          <div className="items">
            {order.items.length !== 0 ? renderItems() : <p>No items</p>}
          </div>
        </div>
      </div>
      <AddProductModal
        show={isOpen}
        handleClose={handleCloseModal}
        orderID={params.id}
        order={order}
      />
    </>
  );
}

export default SalesView;
