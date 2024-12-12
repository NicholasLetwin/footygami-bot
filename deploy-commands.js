const { REST, Routes } = require('discord.js');
const token = 'REDACTED';
const clientId = '1315958557488709724';
const guildId = '1157509654562222164'; // Use your Discord server (guild) ID here


const commands = [
    {
        name: 'score',
        description: 'Check for scorigami.',
        options: [
            {
                name: 'team1_players',
                type: 3, // STRING type
                description: 'Players on Team 1 (e.g., player1,player2)',
                required: true,
            },
            {
                name: 'team1_score',
                type: 4, // INTEGER type
                description: 'Score for Team 1',
                required: true,
            },
            {
                name: 'team2_players',
                type: 3, // STRING type
                description: 'Players on Team 2 (e.g., player3,player4)',
                required: true,
            },
            {
                name: 'team2_score',
                type: 4, // INTEGER type
                description: 'Score for Team 2',
                required: true,
            },
            {
                name: 'mvp',
                type: 3,
                description: 'game mvp',
                required: false,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();