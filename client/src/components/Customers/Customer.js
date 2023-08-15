import CustomerView from './CustomerView';
import { useNavigate } from 'react-router-dom';

function Customer({ customer, setSelectedCustomer }) {
  const navigate = useNavigate();

  const renderCustomerView = () => {
    setSelectedCustomer(customer);
    navigate(`/customers/${customer.id}`);
  };

  return (
    <tr onClick={renderCustomerView}>
      <td>{customer.name}</td>
      <td>{customer.address}</td>
      <td>{customer.suburb}</td>
      <td>{customer.state}</td>
      <td>{customer.postcode}</td>
      <td>{customer.phone}</td>
      <td>{customer.email}</td>
    </tr>
  );
}

export default Customer;
