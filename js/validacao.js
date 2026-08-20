// Valida os dados do formulário de contato e não envia nada.

// Mensagens fixas
const MSG = {
  nome: 'Informe o nome.',
  emailVazio: 'Informe o e-mail.',
  emailInvalido: 'Informe um e-mail válido.',
  mensagem: 'Informe a mensagem.',
};

// local@dominio.tld simples — exige TLD; aceita ponto no local e TLD composto.
const EMAIL_SIMPLES = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validação dos dados do formulário
export function validarContato(dados) {
  const nome = dados.nome.trim();
  const email = dados.email.trim();
  const mensagem = dados.mensagem.trim();
  const erros = {};

  if (!nome) {
    erros.nome = MSG.nome;
  }

  if (!email) {
    erros.email = MSG.emailVazio;
  } else if (!EMAIL_SIMPLES.test(email)) {
    erros.email = MSG.emailInvalido;
  }

  if (!mensagem) {
    erros.mensagem = MSG.mensagem;
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros,
  };
}
