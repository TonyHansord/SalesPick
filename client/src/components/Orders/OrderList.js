import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';

function OrderList() {
  const searchOptions = [
    'Order ID',
    'Customer Name',
    'Product Name',
    'Order Date',
    'Order Status',
  ];

  return (
    <div className="main-view">
      <ViewTitleBar title="Orderlist" />
      <SearchBar type="orders" searchOptions={searchOptions} />
    </div>
  );
}

export default OrderList;
