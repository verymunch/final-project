import {Container} from "react-bootstrap";
import useFetch from "../useFetch";
import ClientList from "./ClientList";

function Customers() {
    let url = "http://localhost:2000/customers";
    const {data: customers, status, error} = useFetch(url);
    return (
        <Container>
            {error && <div>Error Message: {error}</div>}
            {status && <div>Loading...</div>}
            {customers && <ClientList customers={customers}/>}
        </Container>
    );
}

export default Customers;