const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 할 일 생성
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'content 필드는 필수입니다.' });
    }

    const todo = new Todo({ content });
    const savedTodo = await todo.save();
    
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 할 일 전체 조회
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 할 일 단일 조회
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: '할 일을 찾을 수 없습니다.' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 할 일 수정
router.put('/:id', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'content 필드는 필수입니다.' });
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({ error: '할 일을 찾을 수 없습니다.' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 할 일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: '할 일을 찾을 수 없습니다.' });
    }
    
    res.json({ message: '할 일이 삭제되었습니다.', todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

