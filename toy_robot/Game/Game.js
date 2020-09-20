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
    const validFaces = ["NORTH", "SOUTH", "EAST", "WEST"];
    const isValidFace = validFaces.includes(face);

    return isValidFace;
  }

  isRobotExist(robot) {
    if (!robot) {
      console.log("Please place a Robot");
      return false;
    };
    return true;
  }
}

module.exports =  Game;