document.getElementById('formCadastrarAluno').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const curso = document.getElementById('curso').value;
  const periodo = document.getElementById('periodo').value;
  const turma = document.getElementById('turma').value;
  const turno = document.getElementById('turno').value;
  const endereco = document.getElementById('endereco').value;
  const telefone = document.getElementById('telefone').value;

  if (nome.length < 3 || nome.length > 100) {
      alert('Nome deve ter entre 3 e 100 caracteres.');
      return;
  }

  if (!validateEmail(email)) {
      alert('E-mail inválido.');
      return;
  }

  if (!validateTelefone(telefone)) {
      alert('Telefone deve ter 10 ou 11 dígitos.');
      return;
  }

  const aluno = {
      nome,
      email,
      curso,
      periodo,
      turma,
      turno,
      endereco,
      telefone
  };

  try {
      const response = await fetch('http://localhost:5000/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(aluno)
      });

      if (!response.ok) {
          throw new Error('Erro ao cadastrar aluno.');
      }

      const data = await response.json();
      alert(data.message);
      document.getElementById('formCadastrarAluno').reset();
  } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao cadastrar aluno. Tente novamente.');
  }
});

document.getElementById('btnLista').addEventListener('click', () => {
  window.location.href = 'lista.html';
});

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateTelefone(telefone) {
  const regex = /^\d{10,11}$/;
  return regex.test(telefone);
}