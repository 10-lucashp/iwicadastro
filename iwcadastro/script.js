const formulario = document.getElementById("formulario");
const mensagemGeral = document.getElementById("mensagem");

const campos = ["nome", "email", "idade", "senha"];

// Mostra ou limpa a mensagem de erro de um campo
function mostrarErro(id, texto) {
  const input = document.getElementById(id);
  const erro = document.getElementById("erro-" + id);
  erro.textContent = texto;
  input.classList.toggle("invalido", texto !== "");
  input.classList.toggle("valido", texto === "");
}

// Valida um campo e devolve a mensagem de erro ("" se estiver correto)
function validarCampo(id) {
  const valor = document.getElementById(id).value.trim();

  // 1. Campo vazio
  if (valor === "") return "Preencha este campo.";

  switch (id) {
    case "email": {
      // 2. Formato de e-mail válido
      const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formatoEmail.test(valor)) return "Digite um e-mail válido, como nome@exemplo.com.";
      break;
    }
    case "idade": {
      // 3. Idade maior que zero
      const idade = Number(valor);
      if (isNaN(idade) || idade <= 0) return "A idade deve ser um número maior que zero.";
      break;
    }
    case "senha":
      // 4. Senha com no mínimo 6 caracteres
      if (document.getElementById("senha").value.length < 6) {
        return "A senha deve ter pelo menos 6 caracteres.";
      }
      break;
  }
  return "";
}

// Validação em tempo real ao sair de cada campo
campos.forEach((id) => {
  document.getElementById(id).addEventListener("blur", () => {
    mostrarErro(id, validarCampo(id));
  });
});

formulario.addEventListener("submit", (evento) => {
  // 6. Impede o envio padrão do formulário
  evento.preventDefault();

  let existeErro = false;

  campos.forEach((id) => {
    const erro = validarCampo(id);
    mostrarErro(id, erro);
    if (erro !== "") existeErro = true;
  });

  if (existeErro) {
    mensagemGeral.textContent = "Corrija os campos destacados e tente novamente.";
    mensagemGeral.className = "mensagem-geral falha";
    return;
  }

  // 7. Tudo certo
  mensagemGeral.textContent = "Dados preenchidos corretamente!";
  mensagemGeral.className = "mensagem-geral sucesso";
});
