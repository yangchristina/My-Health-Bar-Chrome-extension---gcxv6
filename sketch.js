/* todos
*   percent in heart stop at 0%
*   warning flashing lights
*   background scripts
*   sign in page???
*/


var s = function(sketch) {
    
    let c
    let col;
    let imgHeart;
    let imgWater;
    let timeElapsed;
    let myHealth = 100;
    let windowHeight = window.innerHeight

    sketch.preload = function() {
        let urlHeart = chrome.extension.getURL('assets/heart.png')
        imgHeart = sketch.loadImage(urlHeart);
        let urlWater = chrome.extension.getURL('assets/water.png')
        imgWater = sketch.loadImage(urlWater);
    }
    
    sketch.setup = function() {
        chrome.runtime.onMessage.addListener(sketch.gotMessage);
        
        timeElapsed = 0
        fullHealth = 144
        col = 150

        imgHeart.resize(55, 55)
        imgWater.resize(55, 70)

        c = sketch.createCanvas(window.innerWidth, windowHeight);
        c.position(0, 0, 'fixed');
        c.style('pointer-events', 'none');
        c.style('z-index', '999');

        sketch.textFont('inconsolata');
        sketch.textSize(sketch.width / 80);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
    };

    sketch.draw = function() {
        

        sketch.clear();
        console.log(myHealth)
        myHealthBar = myHealth/100 * fullHealth
        if(col>0)
            col = myHealth/100*180-30

        sketch.HealthBar()
        sketch.Water()
    };
    sketch.gotMessage =function(message, sender, sendResponse) {
        
        if(myHealth >0){
            myHealth--
            // timeElapsed += sketch.deltaTime/1000
            // myHealth -= sketch.deltaTime*0.0000167 * 500 //get rid of 500 for production
        }
    }
    
    sketch.HealthBar = function() {
         //outer rectangle
         sketch.fill(0,0,0);
 
         sketch.rect(60, windowHeight-45, 150, 30, 20);
         
         //inner rectangle
         sketch.colorMode(sketch.HSB)
         sketch.fill(col, 100, 100);
         sketch.rect(60+3, windowHeight-45+3, myHealthBar, 24, 20);
         
         //heart
         sketch.image(imgHeart, 5,  windowHeight-57);
         sketch.fill('white')
         sketch.text(Math.floor(myHealth)+'%', 34, windowHeight-30);
    }
    sketch.Water = function(){
        sketch.image(imgWater, 50,  windowHeight-100);
    }

};

var myp5 = new p5(s);