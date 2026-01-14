const newDogBtn = document.getElementById('newDogBtn');
const dogImage = document.getElementById('dogImage');
const breedSelect = document.getElementById('breedSelect');
const dogFact = document.getElementById('dogFact');

// dog facts array
const dogFacts = [
    "Dogs have a sense of time and can miss you.",
    "Dogs can learn over 1000 words.",
    "A Greyhound is the fastest dog breed.",
    "Dalmatians are born completely white.",
    "Dogs' noses are wet to help absorb scent chemicals.",
    "Some dogs can detect diseases like cancer.",
    "Dogs have three eyelids."
];

// load dog breeds into dropdown
async function loadBreeds() {
    try {
        const res = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await res.json();
        const breeds = Object.keys(data.message);
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
            breedSelect.appendChild(option);
        });
    } catch (err) {
        console.error('Error loading breeds:', err);
    }
}

// Fetch a new dog image
async function getNewDog() {
    try {
        let url = 'https://dog.ceo/api/breeds/image/random';
        if (breedSelect.value !== 'random') {
            url = `https://dog.ceo/api/breed/${breedSelect.value}/images/random`;
        }
        const res = await fetch(url);
        const data = await res.json();
        dogImage.classList.remove('loaded');
        dogImage.src = data.message;
        dogImage.onload = () => dogImage.classList.add('loaded');

        // sshow random dog fact
        dogFact.textContent = dogFacts[Math.floor(Math.random() * dogFacts.length)];
    } catch (err) {
        console.error('Error fetching dog image:', err);
    }
}

// Event listener
newDogBtn.addEventListener('click', getNewDog);

// Initialize
loadBreeds();
getNewDog();
