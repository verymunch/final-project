import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";

function Home(props) {
    const [topCustomers, setTopCustomers] = useState([]);
    const [topItems, setTopItems] = useState([]);
    const [topSales, setTopSales] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the top 5 customers
                const customersResponse = await fetch('http://localhost:2000/customers/top');
                const customersData = await customersResponse.json();
                setTopCustomers(customersData.slice(0, 5));

                // Fetch the top 5 items
                const itemsResponse = await fetch('http://localhost:2000/items/top');
                const itemsData = await itemsResponse.json();
                setTopItems(itemsData.slice(0, 5));

                // Fetch the top 5 sales
                const salesResponse = await fetch('http://localhost:2000/sales/top');
                const salesData = await salesResponse.json();
                setTopSales(salesData.slice(0, 5));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <h1 className="mt-4"></h1>
            <Row>
                <Col>
                    <h3>Top Customers</h3>
                    <Table striped hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Total Sales</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topCustomers.map((customer) => (
                            <tr key={customer.CustomerID}>
                                <td>{customer.CustomerName}</td>
                                <td>{customer.TotalSales}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Button variant="secondary" href="/customers">Show All</Button>
                </Col>

                <Col>
                    <h3>Top Products</h3>
                    <Table striped hover>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Total Sales</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topItems.map((item) => (
                            <tr key={item.ItemID}>
                                <td>{item.ItemName}</td>
                                <td>{item.TotalSales}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Button variant="secondary" href="/items">Show All</Button>
                </Col>

                <Col>
                    <h3>Sales</h3>
                    <Table striped hover>
                        <thead>
                        <tr>
                            <th>Month</th>
                            <th>Total Sales</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topSales.map((sale) => (
                            <tr key={sale.SalesID}>
                                <td>{sale.Date}</td>
                                <td>{sale.TotalSales}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Button variant="secondary" href="/sales">Show All</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;