import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";

function UpdateCustomer(props) {
    const {id} = useParams();
    let url = `http://localhost:2000/customers/${id}`;
    console.log(`Link ID:${id}`);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    const [values, setValues] = useState({
        id: id,
        CustomerName: 'name',
        CustomerEmail: 'email',
    })

    useEffect(() => {
        console.log("--URL Address ->" + url);
        const abortContr = new AbortController();
        let customer = '';
        fetch(url, {signal: abortContr.signal})
            .then(resp => {
                console.log(`fetch Done->`);
                if (!resp.ok) {
                    throw Error("Cannot fetch URL data for resource")
                }
                return resp.json()
            }).then(data => {
            setIsPending(false);
            setValues({
                ...values,
                CustomerName: data.CustomerName,
                CustomerEmail: data.CustomerEmail
            })
            setError(null);
        }).catch((err) => {
            if (err.name == 'AbortError') {
                console.log("Udata Fetch Aborted->")
                console.log(err.message);
            } else {
                console.log("Update Error:");
                console.log(err.message);
                setIsPending(false);
                setError(err.message);
            }
        })
    }, [])

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let URL = `http://localhost:2000/customers/${values.id}`;
        console.log(`Value ID: ${id}`);
        fetch(URL, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        }).then(() => {
            console.log("Added new blog");
            setIsPending(false);
            navigate('/');
        })
    }

    return (
        <div>
            <h1 className="mt-4"></h1>
            <h2> Update Customer [ID: {values.id}] Information</h2>
            <p>Modify customer entry below.</p>
            {isPending && <div> Loading </div>}
            {error && <div> {error} </div>}
            {values && (
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control type="text" placeholder="Title"
                                          required
                                          value={values.CustomerName || ''}
                                          onChange={(e) => setValues({...values, CustomerName: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAuthor">
                            <Form.Label>Customer Email</Form.Label>
                            <Form.Control type="text" placeholder="Author" required
                                          value={values.CustomerEmail || ''}
                                          onChange={(e) => setValues({...values, CustomerEmail: e.target.value})}
                            />
                        </Form.Group>
                        {!isPending && <Button variant="warning" type="submit">Update Record</Button>}
                        {<Button variant="secondary" href="/customers">Back</Button>}
                        {/*{isPending && <Button disabled variant="primary" type="submit">Adding Content </Button>}*/}

                    </Form>
                </div>
            )}
        </div>
    );
}

export default UpdateCustomer;