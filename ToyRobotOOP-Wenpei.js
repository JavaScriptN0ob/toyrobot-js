class Board {
  // Board dimensions: initial x & y;
  constructor(xs, ys) {
    this.xs = xs;
    this.ys = ys;
  }
}

class Robot {
  constructor(coord, face) {
    this.coord = coord;
    this.face = face;
  }

  join(game) {
    this.game = game;
  }

  move() {
    const { coord, face } = this;

    const newCoord = {
      NORTH: {
        ...coord,
        y: coord.y + 1,
      },
      EAST: {
        ...coord,
        x: coord.x + 1,
      },
      SOUTH: {
        ...coord,
        y: coord.y - 1,
      },
      WEST: {
        ...coord,
        x: coord.x - 1,
      },
    }[face];

    const isValidCoord = this.game.isValidCoord(newCoord);

    if (!isValidCoord) {
      console.log("Robot hit the border");
      return;
    }

    this.coord = newCoord;

    console.log(`Robot moved from ${coord.x},${coord.y} to ${newCoord.x},${newCoord.y} and face to ${face}`);
  }

  left() {
    const { face } = this;

    const newFace = {
      NORTH: "WEST",
      EAST: "NORTH",
      SOUTH: "EAST",
      WEST: "SOUTH",
    }[face];

    this.face = newFace;

    console.log(`Robot turned left from ${face} to ${newFace}`);
  }

  right() {
    const { face } = this;

    const newFace = {
      NORTH: "EAST",
      EAST: "SOUTH",
      SOUTH: "WEST",
      WEST: "NORTH",
    }[face];

    this.face = newFace;

    console.log(`Robot turned left from ${face} to ${newFace}`);
  }

  report() {
    const { coord, face } = this;

    console.log(`Robot currently stay at ${coord.x},${coord.y} and face to ${face}`);
  }
}

class Game {
  constructor(board) {
    this.board = board
  }
  
  place(robot) {
    this.robot = robot;
    robot.join(this);
  }
  
  isValidCoord(coord) {
    const { xs, ys } = this.board;
    
    const isValidX = coord.x >= 0 && coord.x < xs;
    const isValidY = coord.y >= 0 && coord.y < ys;
    
    return isValidX && isValidY;
  }

  isValidFace(face) {
    return {
      NORTH: true,
      SOUTH: true,
      EAST: true,
      WEST: true,
    } [face];
  }

  isRobotExist(robot) {
    if (!robot) {
      console.log("Please place a Robot");
      return false;
    };
    return true;
  }
}


class Command {
  operate(target) {
    this.target = target;
  }

  placeRobot(x, y, f) {
    const robotX = parseInt(x);
    const robotY = parseInt(y);
    const robotFace = f.toUpperCase();

    const isValidCoord = this.target.isValidCoord({ x: robotX, y: robotY });
    const isValidFace = this.target.isValidFace(robotFace);

    if (!isValidCoord || !isValidFace) {
      console.log("Robot could not be placed, check Robot config");
      return;
    };

    const robot = new Robot({x: robotX, y: robotY}, robotFace);

    this.target.place(robot);
    console.log(`Robot had been placed at ${robotX},${robotY} and face to ${robotFace}`);
  }

  moveRobot() {
    if (this.target.isRobotExist(this.target.robot)) {
      this.target.robot.move();
    }
  }

  leftRobot() {
    if (this.target.isRobotExist(this.target.robot)) {
      this.target.robot.left(); 
    }
  }

  rightRobot() {
    if (this.target.isRobotExist(this.target.robot)) {
      this.target.robot.right();  
    }
  }
  reportRobot() {
    if (this.target.isRobotExist(this.target.robot)) {
      this.target.robot.report(); 
    }
  }

  listen() {
    const readlineSync = require('readline-sync');
    
    readlineSync.promptCLLoop({
      PLACE: (x, y, f) => this.placeRobot(x, y, f),
      MOVE: () => this.moveRobot(),
      LEFT: () => this.leftRobot(),
      RIGHT: () => this.rightRobot(),
      REPORT: () => this.reportRobot(),
    });
  }
}

const main = () => {
  const board = new Board(5, 5);
  
  const game = new Game(board);
  
  const command = new Command();
  command.operate(game);
  
  command.listen();
}

main();