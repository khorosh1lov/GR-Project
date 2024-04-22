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

	// Check if there's a stored word from the session
	const sessionWord = sessionStorage.getItem('returnWord');
	if (sessionWord) {
		dropdown.value = sessionWord;
		displaySelectedWord(sessionWord);
	}

	document.getElementById('randomSelectButton').addEventListener('click', () => {
		const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
		dropdown.value = randomWord;
		displaySelectedWord(randomWord);
	});

	dropdown.addEventListener('change', () => {
		displaySelectedWord(dropdown.value);
	});
});

function displaySelectedWord(word) {
	const examplesContainer = document.getElementById('examplesContainer');
	examplesContainer.innerHTML = `<div class="selected-word">${word}</div>`;

	// Always create and append "Show Examples" button
	const showExamplesButton = document.createElement('button');
	showExamplesButton.id = 'showExamplesButton';
	showExamplesButton.textContent = 'Examples';
	examplesContainer.appendChild(showExamplesButton);

	showExamplesButton.addEventListener('click', () => displayExamples(word));
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