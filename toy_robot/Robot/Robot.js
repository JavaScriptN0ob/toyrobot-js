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

module.exports = Robot;