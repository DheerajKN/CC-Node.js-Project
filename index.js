const express = require('express');
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Members API Routes
app.use('/cc/members', require('./memberRoutes'));
app.get('/',(req, res)=> res.json({status: "Connected"}))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));