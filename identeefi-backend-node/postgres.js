import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import multer from 'multer';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

// auth

function createAccount(username, password, role) {
  pool.query('INSERT INTO auth (username, password, role) VALUES ($1, $2, $3)', [username, password, role], (err, res) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Data insert successful');
    }
  });
}

function changePassword(username, password) {
  pool.query('UPDATE auth SET password = $1 WHERE username = $2', [password, username], (err, res) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Data update successful');
    }
  });
}

// profile

function createProfile(username, name, description, website, location, image, role) {
  pool.query('INSERT INTO profile (username, name, description, website, location, image, role) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
    [username, name, description, website, location, image, role], (err, res) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Data insert successful');
      }
    });
}

// product

const storageProduct = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads/product'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const storageProfile = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads/profile'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

function addProduct(serialNumber, name, brand) {
  pool.query('INSERT INTO product (serialNumber, name, brand) VALUES ($1, $2, $3)', 
    [serialNumber, name, brand], (err, res) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Data insert successful');
      }
    });
}

// auth
app.get('/authAll', async (req, res) => {
  const data = await pool.query('Select * from auth');
  res.header('Access-Control-Allow-Credentials', true);
  res.send(data.rows);
  console.log("Data sent successfully");
});

app.post('/auth/:username/:password', async (req, res) => {
  const { username, password } = req.params;
  const data = await pool.query(`SELECT * FROM auth WHERE username = '${username}' AND password = '${password}'`);
  res.send(data.rows);
  console.log("Data sent successfully");
});

app.post('/addaccount', (req, res) => {
  const { username, password, role } = req.body;
  createAccount(username, password, role);
  res.send('Data inserted');
});

app.post('/changepsw', (req, res) => {
  const { username, password } = req.body;
  changePassword(username, password);
  res.send('Data updated');
});

// profile 

app.get('/profileAll', async (req, res) => {
  const data = await pool.query('Select * from profile');
  res.header('Access-Control-Allow-Credentials', true);
  res.send(data.rows);
  console.log("Data sent successfully");
});

app.get('/profile/:username', async (req, res) => {
  const { username } = req.params;
  const data = await pool.query(`SELECT * FROM profile WHERE username = '${username}'`);
  res.send(data.rows);
  console.log("Data sent successfully");
});

app.post('/addprofile', (req, res) => {
  const { username, name, description, website, location, image, role } = req.body;
  createProfile(username, name, description, website, location, image, role);
  res.send('Data inserted');
});

// image

app.post('/upload/profile', (req, res) => {
  let upload = multer({ storage: storageProfile }).single('image');

  upload(req, res, (err) => {
    if (!req.file) {
      return res.send('Please select an image to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
  });
});

// product

app.post('/upload/product', (req, res) => {
  let upload = multer({ storage: storageProduct }).single('image');

  upload(req, res, (err) => {
    if (!req.file) {
      return res.send('Please select an image to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
  });
});

app.get('/file/profile/:fileName', function (req, res) {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, 'public/uploads/profile', fileName);
  res.sendFile(filePath);
});

app.get('/file/product/:fileName', function (req, res) {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, 'public/uploads/product', fileName);
  res.sendFile(filePath);
});

app.get('/product/serialNumber', async (req, res) => {
  const data = await pool.query(`SELECT serialNumber FROM product`);
  res.send(data.rows);
});

app.post('/addproduct', (req, res) => {
  const { serialNumber, name, brand } = req.body;
  addProduct(serialNumber, name, brand);
  res.send('Data inserted');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
