const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');

// Define the client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

require('dotenv').config(); 
const token = process.env.DISCORD_TOKEN;
// File to store scores
const SCORES_FILE = path.join(__dirname, 'scores.json');

// Load past scores from the file when the bot starts
const pastScores = new Set();
if (fs.existsSync(SCORES_FILE)) {
    const savedScores = JSON.parse(fs.readFileSync(SCORES_FILE, 'utf-8'));
    savedScores.forEach((score) => pastScores.add(score));
}

// Save scores to the file
function saveScores() {
    fs.writeFileSync(SCORES_FILE, JSON.stringify(Array.from(pastScores)), 'utf-8');
}

// Check if the score is a scorigami
function checkScorigami(scoreCombo) {
    if (pastScores.has(scoreCombo)) {
        return `Score ${scoreCombo} is NOT a footygami.`;
    } else {
        pastScores.add(scoreCombo);
        saveScores(); // Save to file after adding the new score
        return `Footygami! ${scoreCombo} is a new score, lil bro! 🐸`;
    }
}

// Event listener for when the bot is ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener for slash command interactions
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'score') {
        const team1Players = interaction.options.getString('team1_players');
        const team1Score = interaction.options.getInteger('team1_score');
        const team2Players = interaction.options.getString('team2_players');
        const team2Score = interaction.options.getInteger('team2_score');
        const mvp = interaction.options.getString('mvp');

        if (isNaN(team1Score) || isNaN(team2Score)) {
            return interaction.reply('Scores must be numbers. Please try again.');
        }

        const scoreCombo = `${Math.min(team1Score, team2Score)}-${Math.max(team1Score, team2Score)}`;
        const response = checkScorigami(scoreCombo);

        let replyMessage = `Teams: ${team1Players} (${team1Score}) vs. ${team2Players} (${team2Score})\n`;
        if (mvp) {
            replyMessage += `MVP: ${mvp}\n`;
        }
        replyMessage += response;

        await interaction.reply(replyMessage);
    }
});

// Login to Discord
client.login(token);
