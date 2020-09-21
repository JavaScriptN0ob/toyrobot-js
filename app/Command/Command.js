/* eslint-disable no-console */
const readlineSync = require('readline-sync');
const Robot = require('../Robot/Robot');

class Command {
  constructor() {
    this.placeRobot = this.placeRobot.bind(this);
    this.moveRobot = this.moveRobot.bind(this);
    this.leftRobot = this.leftRobot.bind(this);
    this.rightRobot = this.rightRobot.bind(this);
    this.reportRobot = this.reportRobot.bind(this);
  }

  operate(target) {
    this.target = target;
  }

  placeRobot(input) {
    const [x, y, f] = input.split(',');
    const robotX = parseInt(x, 10);
    const robotY = parseInt(y, 10);
    const robotFace = f.toUpperCase();

    const isValidCoord = this.target.isValidCoord({ x: robotX, y: robotY });
    const isValidFace = this.target.isValidFace(robotFace);

    if (!isValidCoord || !isValidFace) {
      console.log('Robot could not be placed, check Robot config');
      return;
    }

    const robot = new Robot({ x: robotX, y: robotY }, robotFace);

    this.target.place(robot);
    console.log(`Robot had been placed at ${robotX},${robotY} and face to ${robotFace}`);
  }

  moveRobot() {
    if (!this.target.isRobotExist()) {
      return;
    }
    this.target.robot.move();
  }

  leftRobot() {
    if (!this.target.isRobotExist()) {
      return;
    }
    this.target.robot.left();
  }

  rightRobot() {
    if (!this.target.isRobotExist()) {
      return;
    }
    this.target.robot.right();
  }

  reportRobot() {
    if (!this.target.isRobotExist()) {
      return;
    }
    this.target.robot.report();
  }

  listen() {
    readlineSync.promptCLLoop({
      PLACE: this.placeRobot,
      MOVE: this.moveRobot,
      LEFT: this.leftRobot,
      RIGHT: this.rightRobot,
      REPORT: this.reportRobot,
    });
  }
}

module.exports = Command;
