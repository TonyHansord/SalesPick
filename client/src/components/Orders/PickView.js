import DetailsContainer from '../Utilities/DetailsContainer';
import ActionContainer from '../Utilities/ActionContainer';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Orders.css';
import PhotosModal from './PhotosModal';

function PickView() {
  const params = useParams();

  const [order, setOrder] = useState({
    id: '',
    customer: {
      name: '',
    },
    status: '',
    order_total: 0,
    items: [],
    order_images: [],
  });

  const [currentPackageID, setCurrentPackageID] = useState('');
  const [showModal, setShowModal] = useState(false);

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
      value: order.status,
    },
    {
      title: 'Package Number',
      value: currentPackageID,
    },
  ];

  const actions = [
    {
      title: 'Generate Package',
      method: () => {
        console.log('Generate Package');
        fetch('/packages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: order.id,
            height: 0,
            width: 0,
            length: 0,
            weight: 0,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setCurrentPackageID(data.id);
          });
      },
    },
    {
      title: 'Photos',
      method: () => {
        console.log('Photos');
        handleShowModal();
      },
    },
    {
      title: 'Packages',
      method: () => {
        console.log('Packages');
      },
    },
    {
      title: 'Complete',
      method: () => {
        console.log('Complete');
      },
    },
  ];

  useEffect(() => {
    fetch(`/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
      });
  }, [params.id]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="main-view">
      <ViewTitleBar title="Pick View" />
      <div className="main-container">
        <div className="top-container">
          <DetailsContainer data={orderDetails} />
          <ActionContainer actions={actions} cardSize={'sml'} />
        </div>
        <div className="bottom-container">
          <div className="Items">
            <h3>Items</h3>
            <div className="items">
              {order.items.map((item) => {
                return (
                  <div className="item" key={item.id}>
                    <p>{item.product.name}</p>
                    <p>{item.quantity}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <PhotosModal
        order={order}
        handleClose={handleCloseModal}
        show={showModal}
        setOrder={setOrder}
      />
    </div>
  );
}

export default PickView;
