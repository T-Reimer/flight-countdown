class Particle {
    constructor(x, y) {
        this.target = {};

        this.setTarget(x, y);

        this.x = random(width);
        this.y = random(height);

        this.r = 2;
        this.colour = random(randomColours);


    }

    setTarget(x, y) {
        this.target.x = x;
        this.target.y = y;
    }

    update() {
        let easing = 0.1;

        let dX = this.target.x - this.x;
        let dY = this.target.y - this.y;


        this.x = this.x + (dX * easing);
        this.y = this.y + (dY * easing);
    }

    draw() {
        noStroke();
        fill(this.colour);
        ellipse(this.x, this.y, this.r);
    }
}