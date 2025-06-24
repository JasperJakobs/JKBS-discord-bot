import {
    Client,
    Collection,
    GatewayIntentBits,
} from 'discord.js';
import { initialLoaders } from './loaders/index.js';
import { env } from 'process';


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
    PREFIX: env.PREFIX,
};
client.prefixCommands = new Collection();
client.slashCommands = new Collection();

initialLoaders(client);

client.login(env.TOKEN);
