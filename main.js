const randomColours = [
    [244, 67, 54],
    [233, 30, 99],
    [156, 39, 176],
    [103, 58, 183],
    // [63, 81, 181],
    // [33, 150, 243],
    [3, 169, 244],
    [0, 188, 212],
    [0, 150, 136],
    [76, 175, 80],
    [139, 195, 74],
    [205, 220, 57],
    [255, 235, 59],
    [255, 193, 7],
    [255, 152, 0],
    [255, 87, 34]
];

let font;
let bg;

let characters = {};
let maxPoints = 0;

let tmpText = "12d 04h 06m 02s".split("");
let text = [];

const arrivalTime = new Date("Dec 20, 2018 3:18 pm");

function preload() {
    font = loadFont("./Roboto-Bold.ttf");
    bg = loadImage("./IMG_20180513_133059.jpg");
}

function setup() {

    createCanvas(1024, 768);
    background(150);

    let x = 0;
    let y = 100;

    setTimeout(function() {
        text = tmpText.map(function(char) {
            x += 60;
            if (char === " ") {
                x -= 30;
            }
            let letter = new Letter(x, y);

            letter.setText(char);
            return letter;
        });
    }, 100);
}


function draw() {

    let currentTime = Date.now() / 1000;
    let arrival = arrivalTime.getTime() / 1000;

    let time = arrival - currentTime;

    let days = Math.floor(time / (60 * 60 * 24));
    time = time - (days * 60 * 60 * 24);

    let hours = Math.floor(time / (60 * 60));
    time = time - (hours * 60 * 60);

    let minutes = Math.floor(time / 60);
    time = time - (minutes * 60);

    let seconds = Math.floor(time);

    let string = ``;

    string += days < 10 ? `0${days}d ` : `${days}d `;
    string += hours < 10 ? `0${hours}h ` : `${hours}h `;
    string += minutes < 10 ? `0${minutes}m ` : `${minutes}m `;
    string += seconds < 10 ? `0${seconds}s ` : `${seconds}s `;

    string = string.split("");

    background(bg);

    fill([38, 198, 218, 200]);
    rect(0, 0, 1024, 120);

    for (let i = 0; i < text.length; i++) {
        let letter = text[i];

        letter.setText(string[i]);

        letter.draw();
    }

}


function getCharPoints(char) {
    if (!characters[char]) {
        let points = font.textToPoints(char, 0, 0, 300);

        if (points.length > maxPoints) {
            maxPoints = points.length;
        }

        characters[char] = points;
    }
    return characters[char];
}


class Letter {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.particles = [];
        this.path = [];
    }

    setText(val) {

        this.path = getCharPoints(val);

        while (this.path.length > this.particles.length) {
            this.particles.push(new Particle(random(height), random(width)));
        }

        for (let i = 0; i < this.particles.length; i++) {
            let point = this.path[i % this.path.length];

            this.particles[i].setTarget(point.x / 3, point.y / 3);
        }

    }

    draw() {
        push();
        translate(this.x, this.y);

        this.particles.forEach(function(particle) {
            particle.update();
            particle.draw();
        });
        pop();
    }
}