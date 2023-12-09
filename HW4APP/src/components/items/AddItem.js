import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

function AddItem(props) {
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState();

    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent page refresh
        const item = {itemName, itemPrice}
        setStatus(true);
        let URL = "http://localhost:2000/items";
        fetch(URL, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(item)
        }).then(() => {
            console.log("Added new blog");
            setStatus(false);
            navigate('/');
        })
    }

    return (
        <div>
            <h1 className="mt-4"></h1>
            <h2> Add New Item </h2>
            <p>Please fill out form below.</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control type="text" placeholder=""
                                  required
                                  value={itemName}
                                  onChange={(e) => setItemName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Item Price</Form.Label>
                    <Form.Control type="number" min="1" step="any" placeholder=""
                                  required
                                  value={itemPrice}
                                  onChange={(e) => setItemPrice(e.target.value)}/>
                </Form.Group>
                {!status && <Button variant="primary" type="submit">Add Record</Button>}
                {<Button variant="secondary" href="/items">Back</Button>}
                {/*{status && <Button disabled variant="primary" type="submit">Adding Content </Button>}*/}

            </Form>
        </div>
    );
}

export default AddItem;