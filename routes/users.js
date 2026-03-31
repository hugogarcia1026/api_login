const express = require('express');
const routes = express.Router();
const db = require('../db');

routes.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
        res.json(results);
    });
});

routes.post('/create', (req, res) => {
    const { nome, email, senha } = req.body; 
    db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?)', 
        [nome, email, senha], (err, result) => {
        if (err) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
        } else {
        res.status(201).json({ id: results.insertId, nome, email });
        }
    });
});

routes.put('/:id', (req, res) => {
    const { id } = req.params; 
    const { nome, email } = req.body; 

    db.query('UPDATE users SET nome = ?, email = ? WHERE id = ?', [nome, email, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        res.json({ message: 'Usuário atualizado com sucesso' });
    });
});

routes.delete('/:id', (req, res) => {
    const { id } = req.params; 

    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        res.json({ message: 'Usuário deletado com sucesso' });
    });
});

module.exports = routes;