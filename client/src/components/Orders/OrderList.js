import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import './Orders.css';
import Order from './Order';

function OrderList() {
  const searchOptions = [
    {
      title: 'Order ID',
      type: 'integer',
    },
    {
      title: 'Customer Name',
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

  return (
    <div className="main-view">
      <ViewTitleBar title="Orderlist" />
      <div className="top-container">
        <SearchBar type="orders" searchOptions={searchOptions} />
      </div>
      <div className="order-list">
        <Order />
      </div>
    </div>
  );
}

export default OrderList;
