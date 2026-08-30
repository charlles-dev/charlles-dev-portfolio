export type PlayerMotionState = "Idle" | "Walk" | "Run" | "Jump" | "Falling" | "Landing";
export type LandingWeight = "light" | "medium" | "heavy";

export type PlayerInput = {
  x: number;
  z: number;
  run: boolean;
  jumpPressed: boolean;
};

export type PlayerSnapshot = {
  x: number;
  y: number;
  z: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
  facing: number;
  grounded: boolean;
  state: PlayerMotionState;
  landingWeight: LandingWeight;
  landingTime: number;
  fallOrigin: number;
};

export type ControllerConfig = {
  walkSpeed: number;
  runSpeed: number;
  acceleration: number;
  deceleration: number;
  airControl: number;
  turnSpeed: number;
  gravity: number;
  jumpSpeed: number;
  stepHeight: number;
  groundSnap: number;
};

export type GroundSample = { height: number; blocked?: boolean };

export const defaultControllerConfig: ControllerConfig = {
  walkSpeed: 2.25,
  runSpeed: 4.8,
  acceleration: 11,
  deceleration: 15,
  airControl: 4.2,
  turnSpeed: 10,
  gravity: 18,
  jumpSpeed: 6.6,
  stepHeight: 0.32,
  groundSnap: 0.38,
};

export const initialPlayerSnapshot: PlayerSnapshot = {
  x: 0,
  y: 0,
  z: -2.4,
  velocityX: 0,
  velocityY: 0,
  velocityZ: 0,
  facing: 0,
  grounded: true,
  state: "Idle",
  landingWeight: "light",
  landingTime: 0,
  fallOrigin: 0,
};

function moveTowards(current: number, target: number, maxDelta: number) {
  if (Math.abs(target - current) <= maxDelta) return target;
  return current + Math.sign(target - current) * maxDelta;
}

function shortestAngle(from: number, to: number) {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

export function landingWeightForDistance(distance: number): LandingWeight {
  if (distance >= 2.6) return "heavy";
  if (distance >= 1.15) return "medium";
  return "light";
}

export function locomotionState(speed: number, running: boolean): PlayerMotionState {
  if (speed < 0.08) return "Idle";
  return running && speed > 2.7 ? "Run" : "Walk";
}

export function stepPlayer(
  previous: PlayerSnapshot,
  input: PlayerInput,
  deltaSeconds: number,
  sampleGround: (x: number, z: number) => GroundSample,
  config: ControllerConfig = defaultControllerConfig,
): PlayerSnapshot {
  const delta = Math.min(Math.max(deltaSeconds, 0), 1 / 20);
  const inputLength = Math.hypot(input.x, input.z);
  const inputX = inputLength > 1 ? input.x / inputLength : input.x;
  const inputZ = inputLength > 1 ? input.z / inputLength : input.z;
  const targetSpeed = input.run ? config.runSpeed : config.walkSpeed;
  const hasInput = Math.hypot(inputX, inputZ) > 0.01;
  const response = previous.grounded
    ? hasInput ? config.acceleration : config.deceleration
    : config.airControl;

  let velocityX = moveTowards(previous.velocityX, inputX * targetSpeed, response * delta);
  let velocityZ = moveTowards(previous.velocityZ, inputZ * targetSpeed, response * delta);
  let velocityY = previous.velocityY;
  let x = previous.x + velocityX * delta;
  let z = previous.z + velocityZ * delta;
  let y = previous.y;
  let grounded = previous.grounded;
  let state = previous.state;
  let landingWeight = previous.landingWeight;
  let landingTime = Math.max(0, previous.landingTime - delta);
  let fallOrigin = previous.fallOrigin;

  const currentGround = sampleGround(previous.x, previous.z);
  let nextGround = sampleGround(x, z);
  const climbsTooHigh = nextGround.blocked || nextGround.height - currentGround.height > config.stepHeight;

  if (climbsTooHigh && grounded) {
    const xOnly = sampleGround(x, previous.z);
    const zOnly = sampleGround(previous.x, z);
    if (!xOnly.blocked && xOnly.height - currentGround.height <= config.stepHeight) {
      z = previous.z;
      velocityZ = 0;
      nextGround = xOnly;
    } else if (!zOnly.blocked && zOnly.height - currentGround.height <= config.stepHeight) {
      x = previous.x;
      velocityX = 0;
      nextGround = zOnly;
    } else {
      x = previous.x;
      z = previous.z;
      velocityX = 0;
      velocityZ = 0;
      nextGround = currentGround;
    }
  }

  if (grounded && input.jumpPressed) {
    grounded = false;
    velocityY = config.jumpSpeed;
    state = "Jump";
    fallOrigin = y;
    landingTime = 0;
  } else if (grounded) {
    const drop = y - nextGround.height;
    if (drop > config.groundSnap) {
      grounded = false;
      velocityY = 0;
      state = "Falling";
      fallOrigin = y;
    } else {
      y = nextGround.height;
      velocityY = 0;
      state = landingTime > 0 ? "Landing" : locomotionState(Math.hypot(velocityX, velocityZ), input.run);
    }
  }

  if (!grounded) {
    velocityY -= config.gravity * delta;
    y += velocityY * delta;
    const landingGround = sampleGround(x, z);
    if (!landingGround.blocked && velocityY <= 0 && y <= landingGround.height) {
      const fallDistance = Math.max(0, fallOrigin - landingGround.height);
      landingWeight = landingWeightForDistance(fallDistance);
      landingTime = landingWeight === "heavy" ? 0.48 : landingWeight === "medium" ? 0.32 : 0.16;
      y = landingGround.height;
      velocityY = 0;
      grounded = true;
      state = "Landing";
    } else if (velocityY <= 0) {
      state = "Falling";
    }
  }

  let facing = previous.facing;
  const horizontalSpeed = Math.hypot(velocityX, velocityZ);
  if (horizontalSpeed > 0.12) {
    const targetFacing = Math.atan2(velocityX, velocityZ);
    facing += Math.max(-config.turnSpeed * delta, Math.min(config.turnSpeed * delta, shortestAngle(facing, targetFacing)));
  }

  return {
    x,
    y,
    z,
    velocityX,
    velocityY,
    velocityZ,
    facing,
    grounded,
    state,
    landingWeight,
    landingTime,
    fallOrigin,
  };
}
