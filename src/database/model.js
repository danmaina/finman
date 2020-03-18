import sqlite from "./sqlite";

let db = sqlite.db;

const currencies = () => {

    let query = "SELECT currency_id, currency_name, iso_code FROM currencies";

    return db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        return rows;
    })
};

const currencyByISOCode = (isoCode) => {

    let query = "SELECT currency_id, currency_name FROM currencies where isoCode = ?";

    return db.get(query, [isoCode], (err, row) => {
        if (err) {
            console.error(err.message)
        }

        return row
    })

};

export default {currencies, currencyByISOCode}
