import 'dotenv/config';
import { capitalize, InstallGlobalCommands } from './utils.js';

// Get the game choices from game.js
function createCommandChoices() {
  return [`cointoss`];
}

// Simple test command
const TEST_COMMAND = {
  name: 'testcheeto',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Command containing options
const PETCHEETO_COMMAND = {
  name: 'petcheeto',
  description: 'Pet Cheeto',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [TEST_COMMAND, PETCHEETO_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
