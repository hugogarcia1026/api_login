const express = require('express');
const routes = express.Router();
const db = require('../db');

routes.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
        res.json(results);
    });
});

//criar um novo usuário
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

//editar um usuario
routes.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    db.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
        [nome, email, id], (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao atualizar usuário' });
            } else {
                res.status(201).json({ id, nome, email });
            }
        });
});

//deletar um usuario
routes.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        } else {
            res.status(201)({ message: 'Usuário deletado com sucesso' });
        }
    });
});

//buscar um usuario por id
routes.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Usuário não encontrado' });
            } else {
                res.status(201).json(results[0]);
            }
        }
    });
});

module.exports = routes;