console.log("background running")

chrome.runtime.onInstalled.addListener(() => {
    console.log('onInstalled...');
    // create alarm after extension is installed / upgraded
    chrome.alarms.create('refresh', { periodInMinutes: 1 });
});
  
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(alarm.name); // refresh
    helloWorld();
});



function helloWorld(tab) {
    let msg = {
        txt: "hello"
    }
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, msg);  
    });
    console.log("Hello, world!");
}





// let tab1;
// chrome.tabs.getSelected(null, function(tab){
//     console.log(tab);
//     tab1 = tab
//     let msg = {
//         txt: "hello"
//     }
//     chrome.tabs.sendMessage(tab1.id, msg)
// });
// // console.log(tab1)
// chrome.browserAction.onClicked.addListener(buttonClicked)

// function buttonClicked(tab) {
//     let msg = {
//         txt: "hello"
//     }
//     chrome.tabs.sendMessage(tab.id, msg)
// }








// var s = function(sketch) {
    // console.log(TAB)
    // console.log("in p5")
    // let timeElapsed;
    // let myHealth;
    // let fullHealth = 144
  
    // sketch.setup = function() { 
        // console.log("in set-up")  
        // timeElapsed = 0
        // myHealth = 100

        // sketch.draw();
    // };

    // sketch.draw = function() {
        // console.log("in draw") 
        // let msg = {
        //     txt: "hello"
        // }
        // chrome.tabs.sendMessage(tab.id, msg)
        // sketch.clear();
        // if(myHealth >=0){
        //     timeElapsed += sketch.deltaTime/1000
        //     myHealth -= sketch.deltaTime*0.0000167 * 500 //get rid of 500 for production
        //     myHealthBar = myHealth/100 * fullHealth
        //     console.log(timeElapsed)
        //     console.log("my health: "+ myHealth)
        //     if(col>0)
        //         col = myHealth/100*180-30
        // }
        // sketch.HealthBar()
        // sketch.Water()
//     };
    
//     sketch.HealthBar = function() {

//     }
//     sketch.Water = function(){
//     }

// };

// var myp5 = new p5(s);