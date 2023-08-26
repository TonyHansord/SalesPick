import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Orders.css';
import { Card } from 'react-bootstrap';
import AddProductModal from './AddProductModal';

function SalesView() {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState({
    id: '',
    customer: {
      name: '',
    },
    status: '',
    order_total: '',
    items: [],
  });
  const [searchResults, setSearchResults] = useState([]);

  const params = useParams();

  useEffect(() => {
    fetch(`/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
      });
  }, [params.id]);

  const handleShowModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

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
                {`$ ${order.order_total}`}
              </p>
            </div>
          </div>
          <div className="action-container">
            <Card className="card" onClick={handleShowModal}>
              <Card.Title>Add Product</Card.Title>
            </Card>
          </div>
        </div>
        <div className="bottom-container"></div>
      </div>
      <AddProductModal show={isOpen} handleClose={handleCloseModal} />
    </div>
  );
}

export default SalesView;
