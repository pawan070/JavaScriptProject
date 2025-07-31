// using event listeners to handle button click and display current date and time
document.querySelector('button').addEventListener('click', () => {
    console.log('Button clicked to get current date and time');
    const date = new Date();
    alert(`Current Date and Time: ${date}`);
});