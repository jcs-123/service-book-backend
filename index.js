require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./Router');
const path = require('path');
require('./connection');
 
const Servicebook = express();
Servicebook.use(cors());
Servicebook.use(express.json());

<<<<<<< HEAD
// ✅ Serve uploaded files
Servicebook.use('/uploads', express.static(path.join(__dirname, 'uploads')));
=======
>>>>>>> f5637e4d2c2dff689d9a23c242d1a1bea2bdac2c

// ✅ Static file serving (core fix)
Servicebook.use("/uploads", express.static(path.join(__dirname, "uploads")));
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