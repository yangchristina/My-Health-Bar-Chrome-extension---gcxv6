/* todos
*   warning flashing lights
*   sign in page???
*   
*/


var s = function(sketch) {
    
    let c
    let col;
    let imgHeart;
    let imgWater;
    let myHealth = 100;
    let windowHeight = window.innerHeight 
    let healthX=60; let healthY = windowHeight-45; 
    sketch.preload = function() {
        let urlHeart = chrome.extension.getURL('assets/heart.png')
        imgHeart = sketch.loadImage(urlHeart);
        let urlWater = chrome.extension.getURL('assets/water.png')
        imgWater = sketch.loadImage(urlWater);
    }
    
    sketch.setup = function() {
        chrome.runtime.onMessage.addListener(sketch.gotMessage);
        
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

        if(sketch.mouseIsPressed)
            if(sketch.mouseX>healthX && sketch.mouseX<healthX+150 && sketch.mouseY>healthY && sketch.mouseY<healthY+30)
                healthX = sketch.mouseX; 
                healthY = sketch.mouseY; 

        if(col>0)
            col = myHealth/100*190-40
            sketch.HealthBar()
        sketch.Water()
    };
    sketch.gotMessage =function(message, sender, sendResponse) {
        if(myHealth >0){
            myHealth--
            // myHealth -= sketch.deltaTime*0.0000167 * 500 //get rid of 500 for production
        }
        console.log(message.txt)
    }
    
    sketch.HealthBar = function() {
         //outer rectangle
         sketch.fill(0,0,0);

         sketch.rect(healthX, healthY, 150, 30, 20);
         
         //inner rectangle
         sketch.colorMode(sketch.HSB)
         sketch.fill(col, 100, 100);
         sketch.rect(healthX+3, healthY+3, myHealthBar, 24, 20);
         
         //heart, x = 5, y = windowHeight-57
         sketch.image(imgHeart, healthX-55, healthY-12);
         sketch.fill('white')
         sketch.textSize(sketch.width / 80);
         sketch.text(Math.floor(myHealth)+'%', 34, windowHeight-30);
    }
    sketch.Water = function(){
        sketch.image(imgWater, healthX,  healthY-60);
    }
    sketch.BlinkingWarning = function(){
        sketch.textSize(32)
        sketch.text("Warning, low health", 34, windowHeight-30);
    }

};

var myp5 = new p5(s);