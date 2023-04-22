// Golds
class Gold {

    constructor(x, y, scale, value) {
        this.x = x;
        this.y = y;
        this.scale = scale;     // Render scale
        this.value = value;
        this.hitbox = new Hitbox(this.x, this.y, this.scale, this.scale);
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
    for(let i = 0; i < number; ++i) {
        // Scale & Value
        base = Math.floor(Math.random() * 19 + 18);
        scale = base * 4;
        value = base * 10 + Math.floor(Math.random() * 30);
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
        ret.push(new Gold(x, y, scale, value));
    }
    return ret;
}