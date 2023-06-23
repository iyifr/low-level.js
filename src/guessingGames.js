// Create an array of numbers from 1 to 100
const numberSet = Array.from({length: 100}, (_, i) => i + 1);
console.log(numberSet);

const prompt = require('prompt-sync')({sigint: true});

// Define a function to validate the user input
const validateInput = input => {
    // Convert the input to a number
    const num = Number(input);
    // Check if the input is a valid number between 1 and 100
    if (isNaN(num) || num < 1 || num > 100) {
        // Throw an error with a message
        throw new Error("Invalid input. Please enter a number between 1 and 100.");
    }
    // Return the number
    return num;
}

// Define a function to check the user guess
const checkGuess = (guess, target) => {
    // Find the index of the guess and the target in the array
    const guessIndex = numberSet.indexOf(guess);
    const targetIndex = numberSet.indexOf(target);
    // Compare the indexes and return a message accordingly
    if (guessIndex === targetIndex) {
        return "Holy moly you got itttt!";
    }
    if (guessIndex <= targetIndex * 0.5) {
        return "Not even close, too small";
    }
    if (guessIndex >= targetIndex * 1.5) {
        return "Not even close too big!";
    }
    return "You are pretty close!";
}

// Define a function to prompt the user for a guess and check it with tryLuck
const guessFunc = () => {
    // Prompt the user for a guess and validate it
    const itx = prompt(`Guess ${player1}'s number! : `);
    const guess = validateInput(itx);
    // Check the guess and get the message
    const message = checkGuess(guess, answer);
    // Display the message
    prompt(message);
    // Return true if the guess is correct, false otherwise
    return message === "Holy moly you got itttt!";
}

// Define a delay function that returns a promise
const delay = ms => new Promise(res => setTimeout(res, ms));

// Define a retry function that takes a function and a number of retries
const retry = async (func, retries) => {
    // Use a try-catch block to handle errors
    try {
        // Call the function and get the result
        const result = await func();
        // If the result is true, return it
        if (result) return result;
        // If the result is false and there are no more retries left, throw an error
        if (!result && retries === 0) throw new Error('No more retries');
        // If the result is false and there are still retries left, wait for some time and retry
        if (!result && retries > 0) {
            await delay(1000);
            return retry(func, retries - 1);
        }
    } catch (error) {
        // If there is an error, throw it or handle it as needed
        throw error;
    }
}

prompt("Welcome to the guessing game");
prompt("These are the rules of the game - you input a random number between 1 and a 100.");
prompt("Then fetch a friend to guess which number you set , this friend can only get three tries");
const text = prompt("Understood? yes / no -- > ");

const regex = /[Yy]es/;

const player1 = prompt("What is your name? ");

if (regex.test(text)) {
    prompt(`Welcome to the game, ${player1}!`);
} else console.log("Uh oh");

let benchmark = prompt("Enter the number you want your opponent to guess: ", {echo: "*"});
// Validate the answer
const answer = validateInput(benchmark);

prompt("Get the second player ready");
prompt("Is this the second player? - yes/no ");
if (regex.test(text)) {
     const name = prompt("What is your name? ");
     prompt(`Welcome to the game, ${name}!`);
} else console.log("Uh oh");

// Call the retry function with guessFunc and 3 retries
retry(guessFunc, 3)
.then(() => console.log('You win!'))
.catch(error => console.log(error.message));
