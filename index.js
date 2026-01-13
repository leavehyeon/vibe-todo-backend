require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const todoRouter = require('./routers/todoRouter');
const cors = require("cors");

const app = express();

// MongoDB 연결
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB 연결 성공');
  })
  .catch((error) => {
    console.error('MongoDB 연결 실패:', error);
  });

// Express 미들웨어
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Todo Backend API' });
});

// Todo 라우터
app.use('/todos', todoRouter);

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port 5000');
});

