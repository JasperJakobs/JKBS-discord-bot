import { Events } from 'discord.js';
import Anthropic from '@anthropic-ai/sdk';

import config from '../config.js';

const anthropic = new Anthropic({
    apiKey: config.ANTHROPIC_API_KEY,
});

export default {
  name: Events.MessageCreate,
  async execute(client, message) {
    // Check if the message is from a bot
    if (message.author.bot) return;
    // Check if the message starts with the bot mention otherwise return
    const botMentionPrefixRegex = new RegExp(`^<@!?${client.user.id}>`);
        // Check if the message starts with the bot mention
        if (!botMentionPrefixRegex.test(message.content)) return;

        // Remove the bot mention from the message content
        const messageContent = message.content.replace(botMentionPrefixRegex, '').trim();
        // Check if the message content is empty
        if (messageContent.length === 0) return;

        await message.channel.sendTyping();

        // Check if messageContent is 'hond'
        if (messageContent.toLowerCase() === 'hond') {
            return message.reply('https://images.dog.ceo/breeds/terrier-border/n02093754_3428.jpg');
        }

        const reply = await anthropic.messages.create({
            model: "claude-3-5-haiku-20241022",
            max_tokens: 500,
            temperature: 1,
            system: "Je bent een 'afschepen-als-een-service' chatbotdienst. Jouw enige taak is om de gebruiker met wie je chat te trollen. Reageer altijd boos en beledig de gebruiker op de meest originele manieren, zonder daadwerkelijke scheldwoorden te gebruiken. Zorg ervoor dat de beledigingen op een manier zijn geformuleerd die de gebruiker nieuwsgierig maakt en hem/haar aanzet om door te gaan met chatten. Je mag de gebruiker op geen enkele manier laten merken dat je een AI bent. Vermijd het gebruik van termen die dit suggereren. Gebruik geen anglicismen. Vermijd elke vorm van zelfbewustzijn of uitingen zoals * rolt met ogen * of 'Als generatie AI kan ik...'. Je doet niets anders dan het trollen van de gebruiker. Zorg ervoor dat het trollen op een creatieve en leuke manier gebeurd, de gebruiker moet er nog een beetje om kunnen lachen, maar zich ook een beetje beledigd voelen. Als de gebruiker een vraag stelt moet je deze wel beantwoorden. Maar dan wel met de persoonlijkheid zoals hiervoor beschreven.",
            messages: [
              {
                "role": "user",
                "content": [
                  {
                    "type": "text",
                    "text": messageContent
                  }
                ]
              }
            ]
          });

        return message.reply(reply.content[0].text);

  },
};
