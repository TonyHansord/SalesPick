import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ViewTitleBar from '../Utilities/ViewTitleBar';
import DetailsContainer from '../Utilities/DetailsContainer';
import ActionContainer from '../Utilities/ActionContainer';
import { Card, Button, ListGroup } from 'react-bootstrap';
import ProductModal from './ProductModal';
import MessageModal from '../Utilities/MessageModal';

function ProductView() {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageModalTitle, setMessageModalTitle] = useState('');
  const [messageModalMessage, setMessageModalMessage] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => setShowModal(true);

  const handleShowMessageModal = () => setShowMessageModal(true);
  const handleCloseMessageModal = () => setShowMessageModal(false);

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
    {
      title: 'Delete Product',
      method: () => {
        console.log('Delete Product');
        setMessageModalTitle('Delete Product');
        setMessageModalMessage('Are you sure you want to delete this product?');
        handleShowMessageModal();
      },
    },
  ];

  const handleDeleteProduct = () => {
    fetch(`/api/products/${params.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessageModalTitle('');
        setMessageModalMessage(data.message);
        handleShowMessageModal();
      });
  };

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
    <div id="product-view" className="main-view">
      <ViewTitleBar title="Product View" hasBackButton={true} />
      <div className="main-container">
        <div className="top-container">
          <DetailsContainer
            data={details}
            image={product?.product_image?.url}
          />
          <ActionContainer actions={actions} cardSize={'sml'} />
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
      <MessageModal 
        show={showMessageModal}
        handleClose={handleCloseMessageModal}
        title={messageModalTitle}
        message={messageModalMessage}
        handlePrimary={handleDeleteProduct}
      />

    </div>
  );
}

export default ProductView;
