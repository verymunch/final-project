import {Button, Container, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import React from "react";

function Inventory({items}) {
    console.log(items);
    const navigate = useNavigate();
    const handleDelete = async (ItemID) => {
        console.log(`delete item id: ${ItemID}`);
        try {
            const response = await fetch(`http://localhost:2000/deleteItem/${ItemID}`, {
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

            console.log(`Item with ID ${ItemID} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting item:', error.message);
        }
    };

    const handleUpdate = async (ItemID) => {
        console.log(`the updated ID: ${ItemID}`);
        navigate(`/updateItem/${ItemID}`);
    }

    return (
        <div>
            <h1 className="mt-4"></h1>
            <Table striped hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Total Sales</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.ItemID}>
                        <td>{item.ItemName}</td>
                        <td>{item.TotalSales}</td>
                        <td>
                            <Button onClick={() => handleDelete(item.ItemID)}>Delete {item.ItemID}</Button>
                        </td>
                        <td><Button onClick={() => handleUpdate(item.ItemID)}> Update {item.ItemID}  </Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button href="/addItem">Insert New Item</Button>
        </div>
    )
}

export default Inventory;