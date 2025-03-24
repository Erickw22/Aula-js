document.addEventListener('DOMContentLoaded', () => {
    const tabelaAlunos = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];

    async function carregarAlunos() {
        try {
            const response = await fetch('http://localhost:5000/students');
            if (!response.ok) {
                throw new Error('Erro ao carregar alunos.');
            }

            const alunos = await response.json();

            tabelaAlunos.innerHTML = '';

            alunos.forEach(aluno => {
                const row = tabelaAlunos.insertRow();
                row.insertCell().textContent = aluno.nome;
                row.insertCell().textContent = aluno.email;
                row.insertCell().textContent = aluno.curso;
                row.insertCell().textContent = aluno.periodo;
                row.insertCell().textContent = aluno.turma;
                row.insertCell().textContent = aluno.turno;
                row.insertCell().textContent = aluno.endereco;
                row.insertCell().textContent = aluno.telefone;

                const cellAcoes = row.insertCell();

                const btnEditar = document.createElement('button');
                btnEditar.textContent = 'Editar';
                btnEditar.addEventListener('click', () => editarAluno(aluno._id));
                cellAcoes.appendChild(btnEditar);

                const btnExcluir = document.createElement('button');
                btnExcluir.textContent = 'Excluir';
                btnExcluir.addEventListener('click', () => excluirAluno(aluno._id));
                cellAcoes.appendChild(btnExcluir);
            });
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao carregar alunos. Tente novamente.');
        }
    }

    async function editarAluno(id) {
        const novoNome = prompt('Digite o novo nome:');
        if (novoNome) {
            try {
                const response = await fetch(`http://localhost:5000/students/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome: novoNome })
                });

                if (!response.ok) {
                    throw new Error('Erro ao editar aluno.');
                }

                const data = await response.json();
                alert(data.message);
                carregarAlunos();
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao alterar aluno. Tente novamente.');
            }
        }
    }

    async function excluirAluno(id) {
        if (confirm('Deseja deletar o aluno?')) {
            try {
                const response = await fetch(`http://localhost:5000/students/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Erro ao deletar aluno.');
                }

                const data = await response.json();
                alert(data.message);
                carregarAlunos(); 
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao deletar aluno. Tente novamente.');
            }
        }
    }

    carregarAlunos();
});