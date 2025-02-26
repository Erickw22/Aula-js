function validarCPF(cpf) {
  const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
  return cpfRegex.test(cpf);
}

function validarNome(nome) {
  const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/;
  return nomeRegex.test(nome);
}

function validarDataNasc(data) {
  const dataRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return dataRegex.test(data);
}

function validarTelefone(telefone) {
  const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  return telefoneRegex.test(telefone);
}

function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validarFormulario(event) {
  event.preventDefault();

  let nome = document.getElementById('nome').value;
  let cpf = document.getElementById('cpf').value;
  let dataNsc = document.getElementById('dataNsc').value;
  let telefone = document.getElementById('telefone').value;
  let email = document.getElementById('email').value;

  let valido = true;

  if (nome.length > 100) {
    document.getElementById('nomeErro').innerText = 'Nome não pode ter mais que 100 caracteres';
    valido = false;
  } else if (!validarNome(nome)) {
    document.getElementById('nomeErro').innerText = 'Nome inválido. Use apenas letras e espaços.';
    valido = false;
  } else {
    document.getElementById('nomeErro').innerText = '';
  }

  // Validação do CPF
  if (!validarCPF(cpf)) {
    document.getElementById('cpfErro').innerText = 'CPF inválido. Use o formato xxx.xxx.xxx-xx';
    valido = false;
  } else {
    document.getElementById('cpfErro').innerText = '';
  }

  // Validação da data de nascimento
  if (!validarDataNasc(data_nsc)) {
    document.getElementById('dataNscErro').innerText = 'Data de nascimento inválida. Use o formato DD/MM/AAAA';
    valido = false;
  } else {
    document.getElementById('dataNscErro').innerText = '';
  }

  // Validação do telefone
  if (!validarTelefone(telefone)) {
    document.getElementById('telefoneErro').innerText = 'Telefone inválido. Use o formato (XX) XXXXX-XXXX';
    valido = false;
  } else {
    document.getElementById('telefoneErro').innerText = '';
  }

  // Validação do email
  if (!validarEmail(email)) {
    document.getElementById('emailErro').innerText = 'Email inválido.';
    valido = false;
  } else {
    document.getElementById('emailErro').innerText = '';
  }

  if (valido) {
    alert('Formulário enviado com sucesso!');
    document.getElementById('formCadastrarPaciente').submit();
  }
}

document.getElementById('formCadastrarPaciente').addEventListener('submit', validarFormulario);
