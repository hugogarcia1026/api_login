const express = require('express');
const routes = express.Router();
const db = require('../db');

routes.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
           return res.status(500).json({ error: 'Erro ao buscar usuários' });
        } else {
            res.json(results);
        }
    });
});

routes.post('/:id', (req, res) => {
    db.query('CREATE USER IF NOT EXISTS ?@localhost IDENTIFIED BY ?', [req.params.id, 'password'], (err) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao criar usuário' });
        } else {
            res.json({ message: 'Usuário criado com sucesso' });
        }
    });
});

routes.put('/:id', (req, res) => {
    db.query('UPDATE users SET nome = ?, email = ? WHERE id = ?', [nome, email, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
            res.json({ message: 'Usuário atualizado com sucesso' });
        }
    });
});

routes.delete('/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
            res.json({ message: 'Usuário deletado com sucesso' });
        }
    });
});


module.exports = routes;