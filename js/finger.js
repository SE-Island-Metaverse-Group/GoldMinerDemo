// Finger
var Finger = {
    x: 0,
    y: 0,
    headX: 0,
    headY: 0,
    t: 0,
    state: 0,
    maxRopeLength: 0,
    held: -1
};

const DEGREE = Math.PI / 180;
const FINGER_VELOCITY = 0.01;   // Ratio
const FINGER_ANGULAR_VELOCITY = 3.0;
const FINGER_STATUS = {
    IDLING: 1,
    STRECTCHING: 2,
    PULLING: 3
};

// Return a vec2 representing the direction of finger
function fingerDirection() {
    let _angular = Math.sin(FINGER_ANGULAR_VELOCITY*DEGREE*Finger.t) * Math.PI * 0.5;
    return {
        x: Math.sin(_angular),
        y: Math.cos(_angular)
    };
}

// Compute distance between two points
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function fingerRopeLength() {
    return distance(Finger.x, Finger.y, Finger.headX, Finger.headY);
}

function fingerInit(x, y, maxRopeLength) {
    Finger.x = x, Finger.y = y;
    Finger.headX = x, Finger.headY = y;
    Finger.maxRopeLength = maxRopeLength;
    Finger.state = FINGER_STATUS.IDLING;
}

function fingerStrectch() {
    if (Finger.state == FINGER_STATUS.IDLING) {
        Finger.state = FINGER_STATUS.STRECTCHING;
    }
}

function fingerUpdate() {
    // Update with status
    switch (Finger.state) {
        case FINGER_STATUS.IDLING:
            ++Finger.t; break;
        case FINGER_STATUS.STRECTCHING:
            if (fingerRopeLength() < Finger.maxRopeLength) {
                let direction = fingerDirection();
                Finger.headX += direction.x * FINGER_VELOCITY * Finger.maxRopeLength;
                Finger.headY += direction.y * FINGER_VELOCITY * Finger.maxRopeLength;

                // Find gold
                for(let i = 0; i < golds.length; ++i) {
                    if(golds[i].hitbox.isInside(Finger.headX, Finger.headY)) {
                        // Get you!
                        Finger.held = i;
                        Finger.state = FINGER_STATUS.PULLING;
                        break;
                    }
                }
            } else {
                let direction = fingerDirection();
                Finger.headX = Finger.x + direction.x * Finger.maxRopeLength;
                Finger.headY = Finger.y + direction.y * Finger.maxRopeLength;
                Finger.state = FINGER_STATUS.PULLING;
            }
            break;
        case FINGER_STATUS.PULLING:
            if (fingerRopeLength() > FINGER_VELOCITY * Finger.maxRopeLength) {
                let direction = fingerDirection();
                Finger.headX -= direction.x * FINGER_VELOCITY * 1.8 * Finger.maxRopeLength;
                Finger.headY -= direction.y * FINGER_VELOCITY * 1.8 * Finger.maxRopeLength;
                if(Finger.held > -1) {
                    golds[Finger.held].move(-direction.x * FINGER_VELOCITY * 1.8 * Finger.maxRopeLength, 
                                            -direction.y * FINGER_VELOCITY * 1.8 * Finger.maxRopeLength);
                }
            } else {
                let direction = fingerDirection();
                Finger.headX = Finger.x;
                Finger.headY = Finger.y;
                Finger.state = FINGER_STATUS.IDLING;
                if(Finger.held > -1) {
                    Score += golds[Finger.held].value;
                    golds.splice(Finger.held, 1);
                    Finger.held = -1;
                }
            }
            break;
        default:
            // ERROR!
    }
}