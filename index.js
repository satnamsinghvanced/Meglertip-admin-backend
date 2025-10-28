require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 const routes = require("./src/api/routes") 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Node.js server is running ');
});

app.use('/api', routes);

app.use("/uploads", express.static("uploads"));
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log('http://localhost:9090');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
