import {
    Client,
    Collection,
    GatewayIntentBits,
} from 'discord.js';
import config from './config.js';
import { initialLoaders } from './loaders/index.js';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
    ]
});

client.config = {
    PREFIX: process.env.PREFIX
};
client.prefixCommands = new Collection();
client.slashCommands = new Collection();

initialLoaders(client);

client.login(process.env.TOKEN);
