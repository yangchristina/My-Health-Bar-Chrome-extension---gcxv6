/* todos
*   warning flashing lights
*   sign in page???
*   
*/


var s = function(sketch) {
    let blinkerCount
    let c
    let col;
    let imgHeart;
    let imgWater;
    let imgPark;
    let myHealth;
    let windowHeight = sketch.windowHeight
    let healthX=60; let healthY = windowHeight-45; 
    let value = 0
    let showIcons = false
    let walkingMode = false


    sketch.preload = function() {
        let urlHeart = chrome.extension.getURL('assets/heart.png')
        imgHeart = sketch.loadImage(urlHeart);
        let urlWater = chrome.extension.getURL('assets/water.png')
        imgWater = sketch.loadImage(urlWater);
        let urlPark = chrome.extension.getURL('assets/park.png')
        imgPark = sketch.loadImage(urlPark);

    }


    
    sketch.setup = function() {
        myHealth = 100
        chrome.runtime.onMessage.addListener(sketch.gotMessage);
        
        fullHealth = 144
        col = 150
        blinkerCount = 0
        blinker = true


        imgHeart.resize(55, 55)
        imgWater.resize(55, 70)
        imgPark.resize(55, 55)

        c = sketch.createCanvas(sketch.windowWidth,sketch.windowHeight);
        c.position(0, 0, 'fixed');
        c.style('pointer-events', 'none');
        c.style('z-index', '999');

        sketch.textStyle(sketch.BOLD);
        sketch.textFont('inconsolata');
        sketch.textSize(sketch.width / 80);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
    };

    sketch.draw = function() {
        c.style('pointer-events', 'none');

        sketch.clear();
        console.log(myHealth)
        myHealthBar = myHealth/100 * fullHealth

          
        if(col>0)
            col = myHealth/100*190-40
        sketch.HealthBar()
        sketch.Water()
        sketch.Park()
        if(myHealth<15) sketch.BlinkingWarning()

    };
    sketch.gotMessage =function(msg, sender, sendResponse) {
        myHealth = msg.myHealth
        console.log(myHealth)
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
         sketch.text(Math.floor(myHealth)+'%', 34, healthY+15);
    }
    sketch.Water = function(){
        if(showIcons)
            sketch.image(imgWater, healthX-60,  healthY-70);
    }

    sketch.Park = function(){
        if(showIcons)
            sketch.image(imgPark, healthX-55,  healthY-120);

        if(walkingMode)
            sketch.goneOutside()

    }

    sketch.goneOutside = function(){
        sketch.textSize(100)
        sketch.fill('black')
        sketch.text("AFK mode: gone outside", 0, sketch.height/2, sketch.width);
    }


    sketch.BlinkingWarning = function(){
        sketch.textSize(50)
        sketch.fill('red')
        if(blinkerCount <= 30){
            sketch.text("Warning, low health", 0, sketch.height/2, sketch.width);
        }else if(blinkerCount > 60){
            blinkerCount = -1
        }
        blinkerCount++
    }
    sketch.mouseDragged=function(event){
        if(sketch.mouseX>healthX && sketch.mouseX<healthX+150 && sketch.mouseY>healthY && sketch.mouseY<healthY+30){
            // healthX = sketch.mouseX; 
            c.style('pointer-events', 'auto');
            healthY += event.movementY;  
        }
    }

    sketch.mouseClicked = function(event){
        if(sketch.mouseX>healthX-55 && sketch.mouseX<healthX-5 && sketch.mouseY>healthY-10 && sketch.mouseY<healthY+40){
            c.style('pointer-events', 'auto');
            showIcons = !showIcons
        }
        if(sketch.mouseX>healthX-55 && sketch.mouseX<healthX-5 && sketch.mouseY>healthY-120 && sketch.mouseY<healthY-70){
            c.style('pointer-events', 'auto');
            window.open('https://www.google.com/maps?q=parks+near+me');
            walkingMode = !walkingMode
            chrome.runtime.sendMessage('park', (response)=> {
                myHealth = response
            });
        }
        if(sketch.mouseX>healthX-55 && sketch.mouseX<healthX-5 && sketch.mouseY>healthY-70 && sketch.mouseY<healthY-10){
            c.style('pointer-events', 'auto');
            chrome.runtime.sendMessage('water', (response)=> {
                myHealth = response
            }); 
        }
    }

    
}
var myp5 = new p5(s);