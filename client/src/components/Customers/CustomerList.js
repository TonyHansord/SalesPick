import Customer from './Customer';
import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';

function CustomerList() {
  const searchOptions = [
    {
      title: 'Customer ID',
      type: 'integer',
    },
    {
      title: 'Customer Name',
      type: 'text',
    },
  ];

  return (
    <div className="main-view">
      <ViewTitleBar title="Customer List" />
      <div className="top-container">
        <SearchBar type="customers" searchOptions={searchOptions} />
      </div>
      <div className="customer-list">
        <Customer />
      </div>
    </div>
  );
}

export default CustomerList;
