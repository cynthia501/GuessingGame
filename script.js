const toggleButton = document.getElementById('togglebutton');
const moonState = document.getElementById('moon')
const sunState = document.getElementById('sun')
const body = document.body
const container = document.getElementById('container')
const heading = document.getElementById("heading")
const hint = document.getElementById("hint-text")
const text = document.getElementById("hint")
const button1 = document.getElementById("guess-number")
const button2 = document.getElementById("guess-country")
const button3 = document.getElementById("guess-emoji")
const form = document.querySelector("form")
const formContainer = document.querySelector('form')
const input = document.getElementById("user-guess")
const scoreCont = document.getElementById("scoreNumber")
const scorediv = document.getElementById("score")
const guessContainer = document.getElementById('guessContainer')
const emojiContainer = document.getElementById('emoji')
const countryFlagContianer = document.getElementById('countryFlag')
const flagImg = document.getElementById('flagImg')
const emojiImg = document.getElementById('emojiImg')
const notifyNumber = document.getElementById('notify')
const notifyCountry = document.getElementById('notifyCountry')
const notifyEmoji = document.getElementById('notifyEmoji')
const correctAnswer = document.getElementById('correctAnswer')
const correctAnswerCountry = document.getElementById('correctAnswerCountry')
const correctAnswerEmoji = document.getElementById('correctAnswerEmoji')
const formCountry = document.getElementById('formCountry')
const formEmoji = document.getElementById('formEmoji')
const countryFlagGuessInput = document.getElementById('country-flag-guess').value
const emojiDisplay = document.getElementById("emojiDisplay")

let score = 0;

// deFine the initial state of the game
guessContainer.style.display = 'block'
countryFlagContianer.style.display = 'none'
emojiContainer.style.display = 'none'

// Event listener for the number guessing game
formContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = Number(document.getElementById('user-guess').value)
    const randomNumbers = Math.floor(Math.random() * (9 + 1));
    console.log(randomNumbers);

    if (inputValue == randomNumbers) {
        notifyNumber.textContent = 'CORRECT'
        score++
        scoreCont.textContent = score
        correctAnswer.textContent = `You are correct!! the correct number was ${randomNumbers}`
    } else {
        notifyNumber.textContent = 'INCORRECT'
        correctAnswer.textContent = `You are not correct!! the correct number was ${randomNumbers}`
    }

})
// Toggle light and dark theme
toggleButton.addEventListener('click', function () {
    body.classList.toggle('lightTheme')
    container.classList.toggle('lightTheme')
    heading.classList.toggle("lightTheme")
    hint.classList.toggle("lightTheme")
    text.classList.toggle("lightTheme")
    button1.classList.toggle("lightTheme")
    button2.classList.toggle("lightTheme")
    button3.classList.toggle("lightTheme")
    form.classList.toggle('lightTheme')
    formCountry.classList.toggle('lightTheme')
    formEmoji.classList.toggle('lightTheme')

    input.classList.toggle("lightTheme")
    scorediv.classList.toggle("lightTheme")

    if (moonState.style.display == 'flex') {
        moonState.style.display = 'none'
        sunState.style.display = 'flex'
    } else {
        moonState.style.display = "flex"
        sunState.style.display = 'none'
    }
})
// When the game starts
button1.addEventListener('click', function () {
    guessContainer.style.display = 'block'
    countryFlagContianer.style.display = 'none'
    emojiContainer.style.display = 'none'
})

// make sure you have this line
let countryName = '';

function loadRandomFlag() {
    const baseUrl = "https://restcountries.com/v3.1/all?fields=name,flags";

    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const country = data[randomIndex];
            flagImg.src = country.flags.svg;
            countryName = country.name.common;
        })
        .catch(error => {
            console.error('Error fetching flag:', error);
        });
}

// When the game starts
button2.addEventListener('click', function () {
    guessContainer.style.display = 'none';
    countryFlagContianer.style.display = 'block';
    emojiContainer.style.display = 'none';

    loadRandomFlag(); // show the first flag
});

// When user submits a guess
formCountry.addEventListener('submit', function (e) {
    e.preventDefault();

    const countryFlagGuessInput = document.getElementById('country-flag-guess').value.trim();

    if (countryFlagGuessInput.toLowerCase() === countryName.toLowerCase()) {
        notifyCountry.textContent = 'CORRECT';
        score++;
        scoreCont.textContent = score;
        correctAnswerCountry.textContent = `You are correct! The country is ${countryName}`;
    } else {
        notifyCountry.textContent = 'INCORRECT';
        correctAnswerCountry.textContent = `You are not correct. The country is ${countryName}`;
    }

    // Load a new flag after each guess
    loadRandomFlag();
    document.getElementById('country-flag-guess').value = ''; // clear input
});

let emojiName = '';

function loadRandomEmoji() {
    const baseUrl = "https://emoji-api.com/emojis?access_key=875a95c11270186afd54045ae6748682b9168e2e";

    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const emoji = data[randomIndex];

            emojiDisplay.textContent = emoji.character;
            emojiName = emoji.subGroup;
            console.log("Emoji:", emoji.character);
            console.log("Meaning:", emoji.subGroup);
            console.log("Category:", emoji.group);
        })
        .catch(err => console.error("Error:", err));
}



button3.addEventListener('click', function () {
    guessContainer.style.display = 'none'
    countryFlagContianer.style.display = 'none'
    emojiContainer.style.display = 'block'

    loadRandomEmoji()
})

// When user submits a guess
formEmoji.addEventListener('submit', function (e) {
    e.preventDefault();

    const EmojiGuessInput = document.getElementById('emoji-user-guess').value.trim();

    if (EmojiGuessInput.toLowerCase() === emojiName.toLowerCase()) {
        notifyEmoji.textContent = 'CORRECT';
        score++;
        scoreCont.textContent = score;
        correctAnswerEmoji.textContent = `You are correct! The emoji is ${emojiName}`;
    } else {
        notifyEmoji.textContent = 'INCORRECT';
        correctAnswerEmoji.textContent = `You are not correct. The emoji is ${emojiName}`;
    }

    // Load a new flag after each guess
    loadRandomEmoji();
    document.getElementById('emoji-user-guess').value = ''; // clear input
});

