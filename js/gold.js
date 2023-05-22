// Round Hitbox

class RoundHitbox {

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.r = radius;
    }

    // Move hitbox
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    // Return the distance between point (x, y) and hitbox center point.
    distance(x, y) {
        return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
    }

    // Return true if input point is inside it, otherwise return false;
    isInside(x, y) {
        if (this.distance(x, y) < this.r) {
            return true;
        }
        return false;
    }

    // Return true when it overlaps another RoundHitbox, otherwise return false.
    isCollided(box) {
        if (this.distance(box.x, box.y) < this.r + box.r) {
            return true;
        }
        return false;
    }
}

// Gold

function GoldHitbox(x, y, scale) {
    // Return a new round hitbox object
    return new RoundHitbox(x, y, scale * 0.4);
}

class Gold {

    constructor(x, y, scale, value, rotate) {
        this.x = x;
        this.y = y;
        this.scale = scale;     // Render scale
        this.value = value;
        this.rotate = rotate;
        // Hitbox is smaller than gold image
        this.hitbox = GoldHitbox(x, y, scale);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.hitbox.move(dx, dy);
    }
}

function generateGold(rangeX, rangeY, rangeW, rangeH, number) {
    let ret = [];
    let base, scale, value;
    let x, y, invalid_pos;
    let hbox;
    // Scale ratio: depending on game area
    const GOLD_SCALE_RATIO = Math.sqrt(0.018 * rangeW * rangeH) / 36;
    // Value ratio
    const GOLD_VALUE_RATIO = 8.0;
    const GOLD_VALUE_BASE = 30.0;

    for(let i = 0; i < number; ++i) {
        // Scale & Value
        base = Math.floor(Math.random() * 37.0 + 18.0);
        scale = Math.floor(base * GOLD_SCALE_RATIO);
        value = Math.floor(base * GOLD_VALUE_RATIO + Math.random() * GOLD_VALUE_BASE);
        // Place gold on map
        do {
            invalid_pos = false;
            x = Math.random() * (rangeW-scale) + rangeX;
            y = Math.random() * (rangeH-scale) + rangeY;
            hbox = GoldHitbox(x, y, scale);     // Hitbox of this gold
            // Check overlap region
            for(let j = 0; j < ret.length; ++j) {
                if (hbox.isCollided(ret[j].hitbox)) {
                    invalid_pos = true;
                    break;
                }
            }
        } while(invalid_pos);
        ret.push(new Gold(x, y, scale, value, Math.random() * Math.PI * 2.0));
    }
    return ret;
}