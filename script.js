import { allWords } from './getWordsList.js';
import { wordExamples } from './wordExamples.js';

document.addEventListener('DOMContentLoaded', function () {
	const dropdown = document.getElementById('wordDropdown');

	allWords.forEach((word) => {
		const option = document.createElement('option');
		option.value = word;
		option.textContent = word;
		dropdown.appendChild(option);
	});

	// Load the previously selected word from localStorage and display it
	const storedWord = localStorage.getItem('selectedWord');
	if (storedWord) {
		dropdown.value = storedWord;
		displaySelectedWord(storedWord, true);
	}

	document.getElementById('randomSelectButton').addEventListener('click', () => {
		const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
		dropdown.value = randomWord;
		localStorage.setItem('selectedWord', randomWord); // Store the selected word in localStorage
		displaySelectedWord(randomWord);
	});

	dropdown.addEventListener('change', () => {
		localStorage.setItem('selectedWord', dropdown.value); // Store the selected word in localStorage
		displaySelectedWord(dropdown.value);
	});
});

function displaySelectedWord(word, loadFromStorage = false) {
	const examplesContainer = document.getElementById('examplesContainer');
	examplesContainer.innerHTML = `<div class="selected-word">${word}</div>`;

	if (!loadFromStorage) {
		// Create and append "Show Examples" button if not already present
		if (!document.getElementById('showExamplesButton')) {
			const showExamplesButton = document.createElement('button');
			showExamplesButton.id = 'showExamplesButton';
			showExamplesButton.textContent = 'Erklärung und Beispiele';
			examplesContainer.appendChild(showExamplesButton);

			showExamplesButton.addEventListener('click', () => displayExamples(word));
		}
	} else {
		displayExamples(word); // Directly show examples if loading from storage
	}
}

function displayExamples(word) {
	const examplesContainer = document.getElementById('examplesContainer');
	examplesContainer.innerHTML = `<div class="selected-word">${word}</div>`;

	const examples = wordExamples[word] || [];

	examples.forEach((example) => {
		const exampleElement = document.createElement('div');
		exampleElement.innerHTML = example;
		exampleElement.classList.add('example');
		examplesContainer.appendChild(exampleElement);
	});
}
