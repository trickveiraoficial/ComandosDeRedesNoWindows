import commands from './dados.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchField = document.getElementById('campo-pesquisa');
    const searchButton = document.getElementById('btn-pesquisar');
    const resultsDiv = document.getElementById('resultados-pesquisa');

    // Ativa a pesquisa ao pressionar Enter
    searchField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchCommands();
        }
    });

    // Ativa a pesquisa ao clicar no botão
    searchButton.addEventListener('click', searchCommands);

    function searchCommands() {
        const searchTerm = searchField.value.trim().toLowerCase();
        resultsDiv.innerHTML = ""; 
        resultsDiv.classList.remove('visible');

        if (!searchTerm) {
            displayMessage("Por favor, digite um termo para pesquisar.");
            return;
        }

        const regex = new RegExp(searchTerm.split(' ').join('|'), 'i');
        const filteredResults = commands.filter(({ command, description }) =>
            regex.test(command) || regex.test(description)
        );

        if (filteredResults.length > 0) {
            filteredResults.forEach(({ command, description }) => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('resultado-item');
                resultItem.innerHTML = `
                    <h3>${command}</h3>
                    <p><strong>Descrição:</strong> ${description}</p>
                `;
                resultsDiv.appendChild(resultItem);
            });
        } else {
            displayMessage("Nada encontrado.");
        }

        resultsDiv.classList.add('visible');
    }

    function displayMessage(message) {
        resultsDiv.innerHTML = `<p>${message}</p>`;
        resultsDiv.classList.add('visible');
    }
});
