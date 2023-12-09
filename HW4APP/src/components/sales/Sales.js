import {Container} from "react-bootstrap";
import useFetch from "../useFetch";
import SalesAudit from "./SalesAudit";

function Sales() {
    let url = "http://localhost:2000/sales";
    const {data: sales, status, error} = useFetch(url);
    return (
        <Container>
            {error && <div>Error Message: {error}</div>}
            {status && <div>Loading...</div>}
            {sales && <SalesAudit sales={sales}/>}
        </Container>
    );
}

export default Sales;