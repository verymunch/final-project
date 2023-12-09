import {Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import React from "react";

function SalesAudit({sales}) {
    console.log(sales);
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="mt-4"></h1>
            <Table striped hover>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total Sales</th>
                </tr>
                </thead>
                <tbody>
                {sales.map((sale) => (
                    <tr key={sale.SalesID}>
                        <td>{sale.Date}</td>
                        <td>{sale.CustomerName}</td>
                        <td>{sale.Product}</td>
                        <td>{sale.Quantity}</td>
                        <td>{sale.TotalSales}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default SalesAudit;