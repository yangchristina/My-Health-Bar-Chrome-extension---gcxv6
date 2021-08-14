var s = function(sketch) {
    let c
    let cX, cY
    let col = 'rgb(50,150,50)';
    let img;
    let timeElapsed;
    let width; 
    let myHealth;
    let windowHeight = window.innerHeight

    width = 140; 

    sketch.preload = function() {
        
        let url = chrome.extension.getURL('assets/heart.png')
        img = sketch.loadImage(url);
    }
    
    sketch.setup = function() {
        timeElapsed = 0
        myHealth = 100

        img.resize(50, 50)

        c = sketch.createCanvas(window.innerWidth, windowHeight);
        c.position(100, 0, 'fixed');
        c.style('pointer-events', 'none');
        c.style('z-index', '999');
    };

    sketch.draw = function() {
        timeElapsed += sketch.deltaTime/1000
        myHealth -= sketch.deltaTime*0.0000167
        console.log(timeElapsed)
        console.log("my health: "+ myHealth)

        sketch.image(img, 0, 0);

        //outer rectangle
        sketch.fill(0,0,0);
        sketch.rect(0, windowHeight-50, 150, 35, 20);

        //inner rectangle
        sketch.fill(col);
        sketch.rect(5, windowHeight-50+3, 140, 29, 20);

        // sketch.background('green')
    };

};

var myp5 = new p5(s);