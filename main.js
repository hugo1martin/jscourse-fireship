import './style.css';

document.querySelector('form').addEventListener('submit', async (e) => {
  showSpinner();
  e.preventDefault();

  const data = new FormData(e.target);

  const response = await fetch('http://localhost:8080/dream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  });

  if (response.ok) {
    const { image } = await response.json();

    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" />`;
  } else {
    const error = await response.text();
    alert(error);
  }
  hideSpinner();
});

function showSpinner () {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Generating... <span class="spinner">🧠</span>';
}

function hideSpinner () {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Generate';
}
