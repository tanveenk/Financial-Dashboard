const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

app.get('/' , (req, res)=> {
    res.send('Financial Dashboard backend is running!');
});

app.get('/test-db', async(req, res)=> {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
});

app.get('/transactions', async (req, res) => {
    const result = await pool.query(`
        SELECT
            transactions.id,
            transactions.amount,
            transactions.date,
            transactions.merchant,
            categories.name AS category,
            accounts.name AS account
        FROM transactions
        JOIN categories
            ON transactions.category_id = categories.id
        JOIN accounts
            ON transactions.account_id = accounts.id
    `);
    res.send(result.rows);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

app.post('/transactions', async(req, res)=> {
    console.log(req.body);
    res.send('Transaction received!');
});