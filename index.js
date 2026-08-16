const mineflayer = require('mineflayer');

const BOT_PASSWORD = 'Gay_Femboy'; // <-- Put a password for your bot here

function createBot() {
    const bot = mineflayer.createBot({
        host: '157.90.205.61',               // Your direct Falix IP
        port: 28258,                         // Your numerical Falix port
        username: 'flamefrags',             // The bot's name in-game
        version: false                       // Auto-detects server version
    });

    // Auto-Authenticate with AuthMe when joining
    bot.on('windowOpen', () => {
        // Some servers force open a book/pin-pad GUI for logging in. If so, this closes it.
        bot.closeWindow(window);
    });

    bot.on('spawn', () => {
        console.log('Bot logged into the server grid. Sending AuthMe verification...');
        
        // Wait 1.5 seconds after spawning, then try both registering and logging in
        setTimeout(() => {
            bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
            bot.chat(`/login ${BOT_PASSWORD}`);
        }, 1500);

        // Anti-AFK loop: Swings arm every 15 seconds to simulate real client activity
        setInterval(() => {
            if (bot.entity) {
                bot.swingArm('right');
            }
        }, 15000);
    });

    bot.on('end', (reason) => {
        console.log(`Disconnected: ${reason}. Reconnecting in 10 seconds...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log(`Error encountered: ${err.message}`);
    });
}

createBot();

// Web server layer to satisfy Render's Free Tier monitoring requirements
const http = require('http');
http.createServer((req, res) => {
    res.write('Falix Bot Instance with AuthMe Support Active.');
    res.end();
}).listen(process.env.PORT || 3000);
