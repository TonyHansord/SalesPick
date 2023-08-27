import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Orders.css';
import { Card } from 'react-bootstrap';
import AddProductModal from './AddProductModal';
import Item from './Item';

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

  const params = useParams();

  useEffect(() => {
    fetch(`/orders/${params.id}`)
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
    fetch(`/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        data.items.forEach((item) => {
          fetch(`/products/${item.product.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              assigned_stock: item.product.assigned_stock + item.quantity,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
        });
      });
  };

  return (
    <div className="main-view">
      <ViewTitleBar title="Sales View" />
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
                {`$ ${orderTotal.toFixed(2)}`}
              </p>
            </div>
          </div>
          <div className="action-container">
            <Card className="card" onClick={handleSaveOrder}>
              <Card.Title>Save</Card.Title>
            </Card>
            <Card className="card" onClick={handleShowModal}>
              <Card.Title>Add Item</Card.Title>
            </Card>
          </div>
        </div>
        <div className="bottom-container">
          <div className="items-container">
            <h3>Items</h3>
            {order.items.length !== 0 ? renderItems() : <p>No items</p>}
          </div>
        </div>
      </div>
      <AddProductModal
        show={isOpen}
        handleClose={handleCloseModal}
        orderID={params.id}
      />
    </div>
  );
}

export default SalesView;
