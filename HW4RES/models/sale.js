const db = require("../util/database");

module.exports = class Sale {
    constructor(id, item, quantity, date, cName, iName) {
        this.SalesID = id;
        this.ItemID = item;
        this.Quantity = quantity;
        this.SalesDate = date;
        this.CustomerName = cName;
        this.Product = iName;
    }

    static fetchAll() {
        return db.execute(
            "SELECT DATE_FORMAT(s.SalesDate, '%Y-%m-%d') AS Date, c.CustomerName, i.ItemName AS Product, s.Quantity AS Quantity, CONCAT('$', FORMAT((i.ItemPrice * s.Quantity), 2)) AS TotalSales FROM Sales s JOIN Customer c ON s.CustomerID = c.CustomerID JOIN Item i ON s.ItemID = i.ItemID WHERE MONTH(s.SalesDate) = MONTH(CURDATE()) AND YEAR(s.SalesDate) = YEAR(CURDATE()) ORDER BY TotalSales DESC"
        );
    }

    static getMonthly() {
        return db.execute("SELECT DATE_FORMAT(s.SalesDate, '%M %Y') AS Date, CONCAT('$', FORMAT(SUM(i.ItemPrice * s.Quantity), 2)) AS TotalSales " +
            "FROM Sales s JOIN Item i on s.ItemID = i.ItemID " +
            "GROUP BY DATE_FORMAT(s.SalesDate, '%Y-%m') " +
            "ORDER BY DATE_FORMAT(s.SalesDate, '%Y-%m') DESC;");
    }

    static findByID(SalesID) {
        return db.execute(
            "SELECT * FROM Sales WHERE SalesID = ?",
            [SalesID]
        );
    }
}