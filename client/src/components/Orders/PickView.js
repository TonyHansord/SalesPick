import DetailsContainer from '../Utilities/DetailsContainer';
import ActionContainer from '../Utilities/ActionContainer';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Orders.css';

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
  });

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
  ];

  const actions = [
    {
      title: 'Generate Package',
      method: () => {
        console.log('Generate Package');
        fetch(`/orders/${params.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 1,
          }),
        });
      },
    },
    {
      title: 'Photos',
      method: () => {
        console.log('Photos');
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
    </div>
  );
}

export default PickView;
