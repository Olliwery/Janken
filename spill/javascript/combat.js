// Define player objects
let player1 = {
    name: "Player 1",
    health: 100,
    maxHealth: 100
};

let player2 = {
    name: "Player 2 (Bot)",
    health: 100,
    maxHealth: 100
};

// Function to show damage notification
function showDamageNotification(playerId, damage) {
    let playerElement = document.getElementById(playerId);
    let notification = document.createElement('div');
    notification.classList.add('damage-notification');
    notification.innerText = `-${damage} health`;

    playerElement.appendChild(notification);

    setTimeout(() => {
        playerElement.removeChild(notification);
    }, 1000); // Remove notification after 1 second
}

// Function to show damage animation
function showDamageAnimation(playerId) {
    let damageImg = document.getElementById(`${playerId}-damage`);
    damageImg.style.display = 'block';
    setTimeout(() => {
        damageImg.style.display = 'none';
    }, 1000); // Hide animation after 1 second
}

// Update health bars and attack messages
function updateHealthBars() {
    updateHealthBar('player1', player1.health, player1.maxHealth);
    updateHealthBar('player2', player2.health, player2.maxHealth);
}

// Function to update a player's health bar
function updateHealthBar(playerId, currentHealth, maxHealth) {
    let healthBar = document.getElementById(`${playerId}-health`);
    let healthPercentage = (currentHealth / maxHealth) * 100;
    let gradientColor;

    // Set gradient color based on health percentage
    if (currentHealth === maxHealth) {
        gradientColor = '#4CAF50'; // Green color if health is full
    } else {
        gradientColor = `linear-gradient(to left, #FF5733 ${100 - healthPercentage}%, #4CAF50 ${100 - healthPercentage}%)`;
    }

    healthBar.style.width = 20.7 + 'vw'; // Adjust width based on health
    healthBar.style.height = 5 + 'vh'; // Adjust height based on health
    healthBar.style.background = gradientColor; // Apply gradient color
    healthBar.innerText = `${currentHealth}/${maxHealth}`; // Display health as text
}


// Function to handle player choice
// Function to handle player choice
function playerChoice(choice) {
    let botChoice = Math.floor(Math.random() * 3); // Random choice for bot: 0 for rock, 1 for paper, 2 for scissors
    let result;

    // Determine result based on player and bot choices
    if (choice === 'rock') {
        result = (botChoice === 1) ? 'bot' : (botChoice === 2) ? 'player' : 'draw';
    } else if (choice === 'paper') {
        result = (botChoice === 0) ? 'player' : (botChoice === 2) ? 'bot' : 'draw';
    } else if (choice === 'scissors') {
        result = (botChoice === 0) ? 'bot' : (botChoice === 1) ? 'player' : 'draw';
    }

    // Display attacks on screen
    let playerAttackMsg = `Player 1 performs ${choice}`;
    let botAttackMsg = `Player 2 (Bot) performs `;
    if (botChoice === 0) {
        botAttackMsg += 'rock';
    } else if (botChoice === 1) {
        botAttackMsg += 'paper';
    } else {
        botAttackMsg += 'scissors';
    }
    document.getElementById('player1-attack').innerText = playerAttackMsg;
    document.getElementById('player2-attack').innerText = botAttackMsg;

    // Update health based on result
    if (result === 'player') {
        player2.health -= 10;
        showDamageNotification('player2', 10);
        showDamageAnimation('player2');
    } else if (result === 'bot') {
        player1.health -= 10;
        showDamageNotification('player1', 10);
        showDamageAnimation('player1');
    }

    // Check if a player has lost
    if (player1.health <= 0) {
        document.getElementById('result').innerText = "Player 2 (Bot) wins!";
        // Play death video and redirect after it finishes
        let video = document.getElementById('death-video');
        video.style.display = 'block';
        document.body.style.overflow = 'hidden';

        video.play();
        video.onended = function () {
            window.location.href = 'menu.html'; // Redirect to menu.html after video ends
        };

    } else if (player2.health <= 0) {
        document.getElementById('result').innerText = "Player 1 wins!";
        // Play win video and redirect after it finishes
        let video = document.getElementById('win-video');
        video.style.display = 'block';
        document.body.style.overflow = 'hidden';

        video.play();
        video.onended = function () {
            window.location.href = 'menu.html'; // Redirect to menu.html after video ends
        };
    }

    updateHealthBars(); // Update health bars after attack

    // Player responses when attacked
    if (result === 'player') {
        let player2Response = ['Ouch my', 'That hurt my', 'Oh no my', 'I felt that one striking my', 'Yikes my'];
        let randomIndex = Math.floor(Math.random() * player2Response.length);
        setTimeout(() => {
            showDamageNotification('player2', player2Response[randomIndex]);
        }, 1000); // Delay the response after damage notification
    } else if (result === 'bot') {
        let player1Response = ['Oof!', 'That stings my', 'I will get you for damaging my', 'You will regret taking my', 'Not again, my'];
        let randomIndex = Math.floor(Math.random() * player1Response.length);
        setTimeout(() => {
            showDamageNotification('player1', player1Response[randomIndex]);
        }, 1000); // Delay the response after damage notification
    }
}


// Update health bars when the page loads
updateHealthBars();
