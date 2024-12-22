const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basit bir GET endpoint
app.get('/', (req, res) => {
    res.send('Backend çalışıyor!');
});

// Sunucuyu dinle
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

// Drone verilerini saklamak için basit bir nesne (gerçek dünyada veritabanı kullanılabilir)
let droneData = {
    latitude: 40.7128,
    longitude: -74.0060,
    armStatus: 'DISARM' // Drone'un durumu
  };
  
  // JSON verisini kabul etmek için middleware
  app.use(express.json());
  
  // Drone konumu ve durumu GET isteği
  app.get('/drone-status', (req, res) => {
    res.json(droneData);
  });
  
  // Drone durumunu değiştirme (ARM/DISARM) POST isteği
  app.post('/drone-status', (req, res) => {
    const { armStatus } = req.body;
    if (armStatus) {
      droneData.armStatus = armStatus;
      res.status(200).json({ message: 'Durum güncellendi.', droneData });
    } else {
      res.status(400).json({ message: 'Geçersiz durum.' });
    }
  });
  const users = [
    { username: 'bozbey', password: '123' },
    { username: 'emirhan', password: 'password123' }
  ];
  
  // Kullanıcı doğrulama POST isteği
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Kullanıcı adı ve şifreyi kontrol et
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      res.status(200).json({ message: 'Başarıyla giriş yapıldı!' });
    } else {
      res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı!' });
    }
  });
  
