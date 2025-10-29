require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./Router');
const path = require('path');
require('./connection');
 
const Servicebook = express();
Servicebook.use(cors());
Servicebook.use(express.json());

// ✅ Serve uploaded files
Servicebook.use('/uploads', express.static(path.join(__dirname, 'upload')));

// ✅ Mount the router
Servicebook.use('/', router);

// Base route
Servicebook.get('/', (req, res) => {
  res.send('Get Request Received');
});

// Start server
const PORT = process.env.PORT || 4000;
Servicebook.listen(PORT, () => {
  console.log(`Server is running successfully at PORT ${PORT}`);
 
});