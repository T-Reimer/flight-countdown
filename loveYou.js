let drawWords = (function() {
    let messages = [
        "Babbeee!",
        "Babbeee!!",
        "Miinee!!",
        "Miinee!",
        "XOXO",
        "I Love You!",
        "I Love You!!",
        "I Love You!"
    ];

    // let text = "I Love You".split("");

    let x = 60;
    let y = 600;

    let characters = [];

    setTimeout(function() {
        let text = random(messages).split("");
        characters = text.map(function(char) {

            // x += 60;

            let letter = new Letter(x, y);

            letter.setText(char);

            let maxX = 0;
            letter.particles.forEach(function(particle) {
                if (particle.target.x > maxX) {
                    maxX = particle.target.x;
                }
            });

            x += maxX;
            x += 10;

            return letter;
        });

    }, 100);


    function drawWords() {

        for (let letter of characters) {
            // debugger;
            if (random() > .9) {
                letter.spawnPoint();
            }
            letter.draw();
        }

    }

    return drawWords;

})();