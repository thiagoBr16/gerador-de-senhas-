function getChartTypes() {
  const uppercase = document.querySelector('#include_uppercase').checked;
  const lowercase = document.querySelector('#include_lowercase').checked;
  const numbers = document.querySelector('#include_numbers').checked;
  const specialCharacters = document.querySelector('#include_special_characters').checked;

  const charTypes = [];

  if (uppercase) {
    charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  }

  if (lowercase) {
    charTypes.push('abcdefghijklmnopqrstuvwxyz');
  }

  if (numbers) {
    charTypes.push('0123456789');
  }

  if (specialCharacters) {
    charTypes.push("!@#$%^&*()_+~`|}{[]:;?><,./-='");
  }

  return charTypes;

}

function getPasswordSize() {
  const raw = document.querySelector('#size').value;
  const size = parseInt(raw, 10);

  if (isNaN(size) || size < 4 || size > 128) {
    message('Tamanho inválido — digite um número entre 4 e 128', 'error');
    return null;
  }
  return size;

}

function generatePassword(size, charTypes) {
  let passwordGenerated = '';

  const selectedChars = charTypes.join('');

  // Garantir ao menos um caractere de cada tipo selecionado
  charTypes.forEach(type => {
    passwordGenerated += type[Math.floor(Math.random() * type.length)];
  });

  // Preencher até atingir o tamanho desejado
  while (passwordGenerated.length < size) {
    passwordGenerated += selectedChars[Math.floor(Math.random() * selectedChars.length)];
  }

  // Embaralhar os caracteres para não deixar os tipos em sequência
  passwordGenerated = passwordGenerated.split('').sort(() => Math.random() - 0.5).join('');

  return passwordGenerated;

}

function message(text, status = 'success') {
  Toastify({
    text: text,
    duration: 2000,
    style: {
      background: status === 'success' ? 'green' : 'red',
      boxShadow: 'none'
    }
  }).showToast();
}

document.querySelector('#generate').addEventListener('click', function () {
  const size = getPasswordSize();
  const charTypes = getChartTypes();

  if (!size) {
    return;
  }

  if (!charTypes.length) {
    message('Selecione pelo menos um tipo de caractere', 'error');
    return;
  }

  const passwordGenerated = generatePassword(size, charTypes);

  document.querySelector('#password_container').classList.add('show');
  document.querySelector('#password').textContent = passwordGenerated;

  message('Senha gerada com sucesso', 'success');
});

document.querySelector('#copy').addEventListener('click', function () {

  navigator.clipboard.writeText(document.querySelector('#password').textContent);
  message('Senha copiada com sucesso', 'success');
});