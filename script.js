document.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.getElementById('message');
    const myButton = document.getElementById('myButton');
    const nameInput = document.getElementById('nameInput');
    const greetButton = document.getElementById('greetButton');
    const greetingOutput = document.getElementById('greetingOutput');

    myButton.addEventListener('click', () => {
        messageElement.textContent = "You clicked the button!";
    });

    greetButton.addEventListener('click', () => {
        const name = nameInput.value;
        if (name) {
            greetingOutput.textContent = `Hello, ${name}!`;
        } else {
            greetingOutput.textContent = "Please enter your name.";
        }
    });
});