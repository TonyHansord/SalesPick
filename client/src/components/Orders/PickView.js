import DetailsContainer from '../Utilities/DetailsContainer';
import ActionContainer from '../Utilities/ActionContainer';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useCallback, useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Orders.css';
import PhotosModal from './PhotosModal';
import PickItem from './PickItem';
import { Button } from 'react-bootstrap';
import Package from './Package';
import { MessageContext } from '../../App';

function PickView() {
  const params = useParams();

  const navigate = useNavigate();

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
  const { displayMessage } = useContext(MessageContext);

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
        fetch('/api/packages', {
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
            displayMessage('Package generated', 'success');
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
      title: 'Complete',
      method: () => {
        fetch(`/api/orders/${params.id}/complete`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 2,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setOrder(data);
            navigate('/picking');
          });
      },
    },
  ];

  const fetchOrder = useCallback(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        const lastID = data.packages[data.packages.length - 1]
          ? data.packages[data.packages.length - 1].id
          : '';
        setCurrentPackageID(lastID);
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

    fetch('/api/package_items', {
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
        if (data.error) {
          displayMessage(data.error, 'error');
        } else {
          console.log(data);
          fetchOrder();
        }
      });
  };

  const deletePackage = (id) => {
    console.log('delete package');

    fetch(`/api/packages/${id}`, {
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

  const setActivePackage = (id) => setCurrentPackageID(id);

  const renderItems = () => {
    return order.items.map((item, index) => {
      return <PickItem key={index} item={item} addItem={addItemToPackage} />;
    });
  };

  const handleTogglePackages = () => {
    console.log(packagesHidden);
    setPackagesHidden(!packagesHidden);
  };

  const renderPackages = () => {
    return order.packages.map((pack, index) => {
      console.log(pack);

      return (
        <Package
          key={index}
          orderItems={order.items}
          pack={pack}
          fetchOrder={fetchOrder}
          deletePackage={deletePackage}
          setActivePackage={setActivePackage}
        />
      );
    });
  };

  return (
    <>
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
        fetchOrder={fetchOrder}
      />
    </>
  );
}

export default PickView;
