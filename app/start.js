const Board = require('./Board/Board');
const Command = require('./Command/Command');
const Game = require('./Game/Game');

const start = () => {
  const board = new Board(5, 5);
  const game = new Game(board);
  const command = new Command();
  command.operate(game);
  command.listen();
};

start();
