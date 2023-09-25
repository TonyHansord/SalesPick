import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import DetailsContainer from '../Utilities/DetailsContainer';
import ActionContainer from '../Utilities/ActionContainer';
import { Card, ListGroup } from 'react-bootstrap';
import ProductModal from './ProductModal';

function ProductView() {
  const params = useParams();

  const [product, setProduct] = useState({});
  const [showModal, setShowModal] = useState(false);


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => setShowModal(true);


  const details = [
    {
      title: 'Product Code',
      value: product?.code,
    },
    {
      title: 'Product Name',
      value: product?.name,
    },
    {
      title: 'Product Category',
      value: product?.category,
    },
    {
      title: 'Product Price',
      value: product?.price,
    },
  ];

  const actions = [
    {
      title: 'Edit Product',
      method: () => {
        console.log('Edit Product');
        handleShowModal();
      },
    },
  ];

  const getProductData = useCallback(() => {
    fetch(`/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      });
  }, [params.id]);

  useEffect(() => {
    getProductData();
  }, [getProductData]);

  return (
    <div id="product-view">
      <ViewTitleBar title="Product View" hasBackButton={true} />
      <div className="main-container">
        <div className="top-container">
          <DetailsContainer
            data={details}
            image={product?.product_image?.url}
          />
          <ActionContainer actions={actions} cardSize={'med'} />
        </div>
        <div className="bottom-container">
          <Card>
            <Card.Title>Stock</Card.Title>
            <div className="card-content">
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    <Card.Text className="bold-detail">Total Stock: </Card.Text>
                    <Card.Text>{product?.current_stock}</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="bold-detail">
                      Assigned Stock:{' '}
                    </Card.Text>
                    <Card.Text>{product?.assigned_stock}</Card.Text>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </div>
          </Card>
          <Card>
            <Card.Title>Dimensions</Card.Title>
            <div className="card-content">
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    <Card.Text className="bold-detail">Length(cm): </Card.Text>
                    <Card.Text>{product?.length}</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="bold-detail">Width(cm): </Card.Text>
                    <Card.Text>{product?.width}</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="bold-detail">Height(cm): </Card.Text>
                    <Card.Text>{product?.height}</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="bold-detail">Weight(kg): </Card.Text>
                    <Card.Text>{product?.weight}</Card.Text>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </div>
          </Card>
        </div>
      </div>
      <ProductModal
        show={showModal}
        handleCloseModal={handleCloseModal}
        productData={product}
        getProductData={getProductData}
      />
    </div>
  );
}

export default ProductView;
