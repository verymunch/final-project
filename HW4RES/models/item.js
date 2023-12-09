const db = require("../util/database");

module.exports = class Item {
    constructor(name, price) {
        this.ItemName = name;
        this.ItemPrice = price;
    }

    save() {
        return db.execute('INSERT INTO Item (ItemName, ItemPrice)' +
            'values (?, ?)',
            [this.ItemName, this.ItemPrice]
        )
    }

    static fetchAll() {
        return db.execute(
            "SELECT\n" +
            "i.ItemID,\n" +
            "    i.ItemName,\n" +
            "    CONCAT('$', FORMAT(COALESCE(SUM(i.ItemPrice * s.Quantity), 0.00), 2)) AS TotalSales\n" +
            "FROM Item i\n" +
            "LEFT JOIN Sales s ON i.ItemID = s.ItemID\n" +
            "GROUP BY i.ItemID, i.ItemName\n" +
            "ORDER BY SUM(i.ItemPrice * s.Quantity) DESC;\n"
        )
            ;
    }

    static delete(ItemID) {
        return db.execute("DELETE FROM Item WHERE ItemID = ?",
            [ItemID]
        )
    }

    static findByID(ItemID) {
        return db.execute(
            "SELECT * FROM Item WHERE ItemID = ?",
            [ItemID]
        );
    }

    update(ItemID) {
        return db.execute(
            "UPDATE Item SET ItemName = ?, ItemPrice = ? WHERE ItemID = ?",
            [this.ItemName, this.ItemPrice, ItemID]
        );
    }

    static topFive() {
        return db.execute(
            "SELECT\n" +
            "    i.ItemID,\n" +
            "    i.ItemName,\n" +
            "    CONCAT('$', FORMAT(COALESCE(SUM(i.ItemPrice * s.Quantity), 0.00), 2)) AS TotalSales\n" +
            "FROM Item i\n" +
            "LEFT JOIN Sales s ON i.ItemID = s.ItemID\n" +
            "GROUP BY i.ItemID, i.ItemName\n" +
            "ORDER BY SUM(i.ItemPrice * s.Quantity) DESC\n" +
            "LIMIT 5;\n"
        )
    }
}