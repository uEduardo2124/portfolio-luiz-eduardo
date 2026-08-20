import { validarContato } from './validacao.js';

const form = document.getElementById('form-contato');

if (form) {
  // Declarações e alinhamentos entre HTML e o JS
  const campoNome = form.querySelector('#nome');
  const campoEmail = form.querySelector('#email');
  const campoMensagem = form.querySelector('#mensagem');
  const status = form.querySelector('#contato-status');

  const campos = {
    nome: campoNome,
    email: campoEmail,
    mensagem: campoMensagem,
  };

  const avisos = {
    nome: form.querySelector('#erro-nome'),
    email: form.querySelector('#erro-email'),
    mensagem: form.querySelector('#erro-mensagem'),
  };

  // Realiza a limpeza do estado visual e acessível de erro dos três campos
  function limparErros() {
    for (const chave of Object.keys(avisos)) {
      avisos[chave].textContent = '';
      avisos[chave].hidden = true;
      campos[chave].classList.remove('contato-invalido');
      campos[chave].removeAttribute('aria-invalid');
      campos[chave].removeAttribute('aria-describedby');
    }
  }

  // Espelho do limpar, mas só nos campos que falharam, depois de zerar tudo, e escrevendo a mensagem de cada um.
  function pintarErros(erros) {
    limparErros();
    for (const chave of Object.keys(erros)) {
      avisos[chave].textContent = erros[chave];
      avisos[chave].hidden = false;
      campos[chave].classList.add('contato-invalido');
      campos[chave].setAttribute('aria-invalid', 'true');
      campos[chave].setAttribute('aria-describedby', avisos[chave].id);
    }
  }

  // Envio simulado: valida, pinta erros ou confirma sucesso — sem rede.
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const resultado = validarContato({
      nome: campoNome.value,
      email: campoEmail.value,
      mensagem: campoMensagem.value,
    });

    if (!resultado.valido) {
      pintarErros(resultado.erros);
      campos[Object.keys(resultado.erros)[0]].focus();
      status.textContent = 'Corrija os campos destacados.';
      status.classList.remove('contato-status-ok');
      status.classList.add('contato-status-erro');
      return;
    }

    limparErros();
    form.reset();
    status.textContent = 'Mensagem enviada com sucesso!';
    status.classList.remove('contato-status-erro');
    status.classList.add('contato-status-ok');
  });
}
