/* todos
*   percent in heart stop at 0%
*   warning flashing lights
*   background scripts
*   sign in page???
*/

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    console.log(message.txt)
}

var s = function(sketch) {
    let c
    let col = 150;
    let imgHeart;
    let imgWater;
    let timeElapsed;
    let myHealth;
    let windowHeight = window.innerHeight

    

    sketch.preload = function() {
        let urlHeart = chrome.extension.getURL('assets/heart.png')
        imgHeart = sketch.loadImage(urlHeart);
        let urlWater = chrome.extension.getURL('assets/water.png')
        imgWater = sketch.loadImage(urlWater);
    }
    
    sketch.setup = function() {
        
        timeElapsed = 0
        myHealth = 100
        fullHealth = 144

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
        if(myHealth >=0){
            timeElapsed += sketch.deltaTime/1000
            myHealth -= sketch.deltaTime*0.0000167 * 500 //get rid of 500 for production
            myHealthBar = myHealth/100 * fullHealth
            console.log(timeElapsed)
            console.log("my health: "+ myHealth)
            if(col>0)
                col = myHealth/100*180-30
        }
        sketch.HealthBar()
        sketch.Water()
    };
    
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
         sketch.text(Math.floor(myHealth+1)+'%', 34, windowHeight-30);
    }
    sketch.Water = function(){
        sketch.image(imgWater, 50,  windowHeight-100);
    }

};

var myp5 = new p5(s);