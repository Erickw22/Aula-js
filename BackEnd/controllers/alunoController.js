const Aluno = require('../models/Aluno');

const listarAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find(); 
        res.status(200).json(alunos); 
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
        res.status(500).json({ error: 'Erro ao listar alunos' });
    }
};

const cadastrarAluno = async (req, res) => {
    try {
        const { nome, email, curso, periodo, turma, turno, endereco, telefone } = req.body;
        if (!nome || !email || !curso || !periodo || !turma || !turno || !endereco || !telefone) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }
        const novoAluno = new Aluno(req.body);
        await novoAluno.save();
        res.status(201).json({ message: 'Aluno criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        res.status(500).json({ error: 'Erro ao cadastrar aluno' });
    }
};

const atualizarAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const alunoAtualizado = await Aluno.findByIdAndUpdate(id, req.body, { new: true });
        if (!alunoAtualizado) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }
        res.status(200).json({ message: 'Aluno alterado com sucesso!', aluno: alunoAtualizado });
    } catch (error) {
        console.error('Erro ao alterado aluno:', error);
        res.status(500).json({ error: 'Erro ao alterado aluno' });
    }
};

const excluirAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const alunoExcluido = await Aluno.findByIdAndDelete(id);
        if (!alunoExcluido) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }
        res.status(200).json({ message: 'Aluno deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletado aluno:', error);
        res.status(500).json({ error: 'Erro ao deletado aluno' });
    }
};
module.exports = {
    listarAlunos,
    cadastrarAluno,
    atualizarAluno,
    excluirAluno
};