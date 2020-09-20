const Robot = require('../Robot/Robot');
const readlineSync = require('readline-sync');

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
    readlineSync.promptCLLoop({
      PLACE: (x, y, f) => this.placeRobot(x, y, f),
      MOVE: () => this.moveRobot(),
      LEFT: () => this.leftRobot(),
      RIGHT: () => this.rightRobot(),
      REPORT: () => this.reportRobot(),
    });
  }
}

module.exports = Command;