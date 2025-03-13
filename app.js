import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';


// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3030;

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction type and data
  const { type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" command
    const responses = ['smiles'];
    const random = responses[Math.floor(Math.random() * responses.length)];
    if (name === 'testcheeto') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random response to send from a helper function
          content: 'Cheeto ' + random + '.',
        },
      });
    }
    // "petcheeto" command
    else if (name === 'petcheeto') {
      // Send a message into the channel where command was triggered from
      const cheetoResponses = ['smiles','purrs','rolls over','looks at you funny', 'moves just out of reach', 'falls asleep','farts','paws at you playfully', 'scratches you, but not too hard','plays with Mr. Boo under the door','lies down on your hand','goes to the litter box','goes and eats some food','walks away to have a little water','stands by the door, waiting to go out, looking at you upside-down','makes biscuits','loves you'];
      const random = cheetoResponses[Math.floor(Math.random() * cheetoResponses.length)];
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Send random cheetoResponse
          content: 'Cheeto ' + random + '.',
        },
      });
    }
    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
