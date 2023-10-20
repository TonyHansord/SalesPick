import Product from './Product';
import SearchBar from '../Utilities/SearchBar';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import { useState, useEffect, useCallback } from 'react';
import { Card, Container } from 'react-bootstrap';
import './Product.css';
import ProductModal from './ProductModal';

function ProductList({ role }) {
  const [productList, setProductList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState(productList);
  const [productCategories, setProductCategories] = useState([]);

  const searchOptions = [
    {
      title: 'Product Code',
      key: 'code',
      type: 'text',
      controlType: 'input',
    },
    {
      title: 'Product Name',
      key: 'name',
      type: 'text',
      controlType: 'input',
    },
    {
      title: 'Product Category',
      key: 'category',
      type: 'text',
      controlType: 'select',
      options: productCategories,
    },
  ];

  const fetchProducts = useCallback(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductList(data);
        setSearchResults(data);

        const categories = data.map((product) => product.category);
        const uniqueCategories = [...new Set(categories)];
        setProductCategories(uniqueCategories);
      });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderProducts = () => {
    return searchResults.map((product, index) => {
      return <Product key={index} product={product} />;
    });
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <ViewTitleBar title="Products List" />
      <div className="main-container">
        <div className="top-container">
          <SearchBar
            type="products"
            searchOptions={searchOptions}
            setSearchResults={setSearchResults}
            data={productList}
          />
          <div className="action-container">
            {role !== 'warehouse' && (
              <Card className="med" onClick={handleShowModal}>
                <Card.Title>New Product</Card.Title>
              </Card>
            )}
          </div>
        </div>
        <Container id="product-list" className="list-container">
          {renderProducts()}
        </Container>
      </div>

      <ProductModal
        show={showModal}
        handleCloseModal={handleCloseModal}
        setProductList={setProductList}
        fetchProducts={fetchProducts}
      />
    </>
  );
}

export default ProductList;
