import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Orders.css';
import { Card } from 'react-bootstrap';
import AddProductModal from './AddProductModal';
import Item from './Item';
import { MessageContext } from '../../App';

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

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
        setOrderTotal(data.order_total);
      });
  }, [params.id]);

  const renderItems = () => {
    return order.items.map((item) => {
      return (
        <Item
          key={item.id}
          item={item}
          order={order}
          setOrderTotal={setOrderTotal}
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

  return (
    <>
      <ViewTitleBar title="Sales View" hasBackButton={true} />
      <div className="main-container">
        <div className="top-container">
          <div className="details-container">
            <div className="details">
              <p>
                <span className="bold-detail">OrderNum: </span>
                {order.id}
              </p>
              <p>
                <span className="bold-detail">Customer: </span>
                {order.customer.name}
              </p>
              <p>
                <span className="bold-detail">Status: </span>
                {order.status}
              </p>
              <p>
                <span className="bold-detail">Total: </span>
                {`$ ${orderTotal?.toFixed(2)}`}
              </p>
            </div>
          </div>
          <div className="action-container">
            <Card className="card med" onClick={handleSaveOrder}>
              <Card.Title>Save</Card.Title>
            </Card>
            <Card className="card med" onClick={handleShowModal}>
              <Card.Title>Add Item</Card.Title>
            </Card>
          </div>
        </div>
        <div className="bottom-container">
          <div className="Items">
            <div className="items">
              {order.items.length !== 0 ? renderItems() : <p>No items</p>}
            </div>
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
