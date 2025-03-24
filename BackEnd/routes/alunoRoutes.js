const express = require('express');
const alunoController = require('../controllers/alunoController');

const router = express.Router();

router.get('/', alunoController.listarAlunos);
router.post('/', alunoController.cadastrarAluno);
router.put('/:id', alunoController.atualizarAluno);
router.delete('/:id', alunoController.excluirAluno);

module.exports = router;