import DetailsContainer from '../Utilities/DetailsContainer';
import ActionContainer from '../Utilities/ActionContainer';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Orders.css';
import PhotosModal from './PhotosModal';
import PickItem from './PickItem';
import { ListGroup, Card, Button } from 'react-bootstrap';

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
    packages: [],
  });

  const [currentPackageID, setCurrentPackageID] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [packagesHidden, setPackagesHidden] = useState(true);

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
            fetchOrder();
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

  const fetchOrder = useCallback(() => {
    fetch(`/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
      });
  }, [params.id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const addItemToPackage = (item) => {
    console.log(item);
    console.log(currentPackageID);

    fetch('/package_items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: item.id,
        package_id: currentPackageID,
        product_id: item.product.id,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchOrder();
      });
  };

  

  const deletePackage = (id) => {
    console.log('delete package');

    fetch(`/packages/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        order_id: order.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchOrder();
      });
  };

  const renderItems = () => {
    return order.items.map((item) => {
      return <PickItem item={item} addItem={addItemToPackage} />;
    });
  };

  const handleTogglePackages = () => {
    console.log(packagesHidden)
    setPackagesHidden(!packagesHidden);
  };

  const renderPackages = () => {
    return order.packages.map((pack) => {
      return (
        <Card className="package">
          <div className="package-id">Package ID: {pack.id}</div>
          <div className="package-items">
            <ListGroup>
              {pack.package_items.map((item) => {
                return (
                  <ListGroup.Item>
                    <Card.Text>{item.product_name}</Card.Text>
                    <Card.Text>{item.quantity}</Card.Text>
                    
                    <Button>Remove</Button>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
          <Button onClick={() => setCurrentPackageID(pack.id)}>Set as Active</Button>
          <Button onClick={() => deletePackage(pack.id)}>Delete Package</Button>
        </Card>
      );
    });
  };

  return (
    <div className="main-view">
      <ViewTitleBar title="Pick View" hasBackButton={true} />
      <div className="main-container">
        <div className="top-container">
          <DetailsContainer data={orderDetails} />
          <ActionContainer actions={actions} cardSize={'sml'} />
        </div>
        <div className="bottom-container">
          <div className="Items">
            <div className="items">{renderItems()}</div>
          </div>
          <Button className="Packages" onClick={handleTogglePackages}>
            Packages
          </Button>
          <div className={packagesHidden ? 'packages hidden' : 'packages'}>
            {order.packages.length > 0 ? renderPackages() : ''}
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
