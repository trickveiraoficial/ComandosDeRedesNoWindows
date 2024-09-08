import { categories, commands } from './dados.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchField = document.getElementById('campo-pesquisa');
    const searchButton = document.getElementById('btn-pesquisar');
    const resultsDiv = document.getElementById('resultados-pesquisa');
    const suggestionsList = document.getElementById('sugestoes');
    const categorySelect = document.getElementById('categoria');

    // Preencher o dropdown de categorias
    function populateCategorySelect() {
        categorySelect.innerHTML = '<option value="">Todas as Categorias</option>';
        categories.forEach(({ id, name }) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = name;
            categorySelect.appendChild(option);
        });
    }

    // Ativa a pesquisa ao pressionar Enter
    searchField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchCommands();
        }
    });

    // Ativa a pesquisa ao clicar no botão
    searchButton.addEventListener('click', searchCommands);

    // Autocompletar enquanto o usuário digita
    searchField.addEventListener('input', () => {
        const searchTerm = searchField.value.trim().toLowerCase();
        suggestionsList.innerHTML = ""; // Limpa as sugestões anteriores

        if (searchTerm.length > 0) {
            const regex = new RegExp(searchTerm.split(' ').join('|'), 'i');
            const filteredResults = commands.filter(({ command }) =>
                regex.test(command)
            );

            filteredResults.forEach(({ command }) => {
                const option = document.createElement('option');
                option.value = command;
                suggestionsList.appendChild(option);
            });
        }
    });

    // Filtra e exibe os comandos com base na categoria selecionada
    categorySelect.addEventListener('change', () => {
        const selectedCategoryId = parseInt(categorySelect.value);
        displayCommandsByCategory(selectedCategoryId);
    });

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

    function displayCommandsByCategory(categoryId) {
        resultsDiv.innerHTML = ""; 
        resultsDiv.classList.remove('visible');

        const filteredResults = commands.filter(({ categoryId: cmdCategoryId }) =>
            categoryId === "" || categoryId === cmdCategoryId
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
            displayMessage("Nenhum comando encontrado para a categoria selecionada.");
        }

        resultsDiv.classList.add('visible');
    }

    function displayMessage(message) {
        resultsDiv.innerHTML = `<p>${message}</p>`;
        resultsDiv.classList.add('visible');
    }

    // Preencher o dropdown de categorias ao carregar
    populateCategorySelect();
});
