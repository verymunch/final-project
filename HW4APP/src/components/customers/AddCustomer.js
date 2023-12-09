import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

function AddCustomer(props) {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");

    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent page refresh
        const customer = {customerName, customerEmail}
        setStatus(true);
        let URL = "http://localhost:2000/customers";
        fetch(URL, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(customer)
        }).then(() => {
            console.log("Added new blog");
            setStatus(false);
            navigate('/');
        })
    }
    return (
        <div>
            <h1 className="mt-4"></h1>
            <h2> Add New Customer </h2>
            <p>Please fill out form below.</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control type="text" placeholder=""
                                  required
                                  value={customerName}
                                  onChange={(e) => setCustomerName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Customer Email</Form.Label>
                    <Form.Control type="text" placeholder=""
                                  required
                                  value={customerEmail}
                                  onChange={(e) => setCustomerEmail(e.target.value)}/>
                </Form.Group>
                {!status && <Button variant="primary" type="submit">Add Record</Button>}
                {<Button variant="secondary" href="/customers">Back</Button>}
                {/*{status && <Button disabled variant="primary" type="submit">Adding Content </Button>}*/}

            </Form>
        </div>
    );
}

export default AddCustomer;