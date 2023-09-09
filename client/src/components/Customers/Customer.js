import { useNavigate } from 'react-router-dom';

function Customer({ customer, setSelectedCustomer }) {
  const navigate = useNavigate();

  const renderCustomerView = () => {
    console.log(customer);
    setSelectedCustomer(customer);
    navigate(`/customers/${customer.id}`);
  };

  return (
    <tr onClick={renderCustomerView}>
      <td>{customer.name}</td>
      <td>{customer.address?.street}</td>
      <td>{customer.address?.suburb}</td>
      <td>{customer.address?.state}</td>
      <td>{customer.address?.postcode}</td>
      <td>{customer.phone_number}</td>
      <td>{customer.email}</td>
    </tr>
  );
}

export default Customer;
