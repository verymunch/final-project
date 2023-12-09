import {Button, Container, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import React from "react";

function ClientList({customers}) {
    console.log(customers);
    const navigate = useNavigate();
    const handleDelete = async (CustomerID) => {
        console.log(`delete customer id: ${CustomerID}`);
        try {
            const response = await fetch(`http://localhost:2000/deleteCustomer/${CustomerID}`, {
                method: 'GET',
            }).then(() => {
                navigate('/');
            }).catch(e => {
                console.log(`--Delete Error`);
                console.log(e); // should have a catch block for server errors
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log(`Customer with ID ${CustomerID} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting customer:', error.message);
        }
    };

    const handleUpdate = async (CustomerID) => {
        console.log(`the updated ID: ${CustomerID}`);
        navigate(`/updateCustomer/${CustomerID}`);
    }

    return (
        <div>
            <h1 className="mt-4"></h1>
            <Table striped hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Total Sales</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.CustomerID}>
                        <td>{customer.CustomerName}</td>
                        <td>{customer.CustomerEmail}</td>
                        <td>{customer.TotalSales}</td>
                        <td>
                            <Button
                                onClick={() => handleDelete(customer.CustomerID)}>Delete {customer.CustomerID}</Button>
                        </td>
                        <td><Button
                            onClick={() => handleUpdate(customer.CustomerID)}> Update {customer.CustomerID}  </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button href="/addCustomer">Insert New Customer</Button>
        </div>
    )
}

export default ClientList;