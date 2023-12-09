import {Container} from "react-bootstrap";
import useFetch from "../useFetch";
import Inventory from "./Inventory";

function Items() {
    let url = "http://localhost:2000/items";
    const {data: items, status, error} = useFetch(url);
    return (
        <Container>
            {error && <div>Error Message: {error}</div>}
            {status && <div>Loading...</div>}
            {items && <Inventory items={items}/>}
        </Container>
    );
}

export default Items;