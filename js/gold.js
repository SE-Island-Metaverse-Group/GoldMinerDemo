// Golds
class Gold {

    constructor(x, y, scale, value, rotate) {
        this.x = x;
        this.y = y;
        this.scale = scale;     // Render scale
        this.value = value;
        this.rotate = rotate;
        // Hitbox is smaller than gold image
        this.hitbox = new Hitbox(this.x + this.scale * 0.1, this.y + this.scale * 0.1,
                                 this.scale * 0.8, this.scale * 0.8);
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
    const GOLD_VALUE_RATIO = 8;
    const GOLD_VALUE_BASE = 30;

    for(let i = 0; i < number; ++i) {
        // Scale & Value
        base = Math.floor(Math.random() * 37 + 18);
        scale = Math.floor(base * GOLD_SCALE_RATIO);
        value = Math.floor(base * GOLD_VALUE_RATIO + Math.random() * GOLD_VALUE_BASE);
        // Place gold on map
        do {
            invalid_pos = false;
            x = Math.random() * (rangeW-scale) + rangeX;
            y = Math.random() * (rangeH-scale) + rangeY;
            hbox = new Hitbox(x, y, scale, scale);  // Hitbox of this gold
            // Check overlap region
            for(let j = 0; j < ret.length; ++j) {
                if (hbox.isCollided(ret[j].hitbox)) {
                    invalid_pos = true;
                    break;
                }
            }
        } while(invalid_pos);
        ret.push(new Gold(x, y, scale, value, Math.random() * Math.PI * 2));
    }
    return ret;
}