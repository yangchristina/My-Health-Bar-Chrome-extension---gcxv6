var s = function(sketch) {
    let c
    let cX, cY
    let colour = (255, 204, 0);

    sketch.setup = function() {
        cY = 100
        cX = 0

        c = sketch.createCanvas(window.innerWidth, window.innerHeight);
        c.position(cX, cY);
        c.style('pointer-events', 'none');
        c.style('z-index', '999');
    };

    sketch.draw = function() {

        sketch.fill(colour);
        sketch.rect(50, 50, 100, 50, 20);

        // c = sketch.createCanvas(sketch.width, sketch.height);
        c.position(cX, cY);
        // sketch.background('green')
    };

    sketch.mouseWheel = function(event) {
        var body = document.body,
        html = document.documentElement;

        var heightPage = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
        // print(event.delta);
        //move the square according to the vertical scroll amount
        if(cY <0)
            cY = 0
        else if (cY > heightPage)
            cY = heightPage
        else
            cY += event.delta;
        //uncomment to block page scrolling
        //return false;
    };


};

var myp5 = new p5(s);