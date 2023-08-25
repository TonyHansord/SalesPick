import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Orders.css';

function SalesView() {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState({});

  const params = useParams();

  useEffect(() => {
    fetch(`/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
      });
  }, [params.id]);

  const searchOptions = [
    {
      title: 'Product Code',
      type: 'text',
    },
    {
      title: 'Product Name',
      type: 'text',
    },
    {
      title: 'Product Category',
      type: 'text',
    },
  ];

  return (
    <div className="main-view">
      <ViewTitleBar title="Sales View" />
      <div className="main-container">
        <div className="top-container"></div>
        <div className="bottom-container">
          <SearchBar
            id="productSearch"
            hasNoTitle={true}
            type="products"
            searchOptions={searchOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default SalesView;
