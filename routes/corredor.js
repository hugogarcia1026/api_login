const express = require('express');
const routes = express.Router();
const db = require('../db');

routes.get('/', (req, res) => {
    db.query('SELECT * FROM corredores', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar corredor' });
        }
        res.json(results);
    });
});

//criar um novo usuário
routes.post('/create', (req, res) => {
    const { nome, turma, } = req.body;
    db.query('INSERT INTO corredores (nome, turma, ) VALUES (?, ?)',
        [nome, turma, ], (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao criar um corredor' });
            } else {
                res.status(201).json({ id: results.insertId, nome, turma });
            }
        });
});

//editar um usuario
routes.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, turma, } = req.body;
    db.query('UPDATE corredores SET nome = ?, turma = ? WHERE id = ?',
        [nome, turma, id], (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao atualizar corredor' });
            } else {
                res.status(201).json({ id, nome, turma });
            }
        });
});

//deletar um usuario
routes.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM corredores WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao deletar corredor' });
        } else {
            res.status(201)({ message: 'Corredor deletado com sucesso' });
        }
    });
});

//buscar um usuario por id
routes.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM corredores WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar correodor' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Coredor não encontrado' });
            } else {
                res.status(201).json(results[0]);
            }
        }
    });
});

module.exports = routes; 