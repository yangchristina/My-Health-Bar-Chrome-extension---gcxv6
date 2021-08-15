console.log("background running")
let health = 100
let newState;
let healthRate = 1
let activeTab;

chrome.tabs.onActivated.addListener(({tabId: activeTab}) => {
    let msg = {
        myHealth: health
    }
    console.log("hi: "+health)
    console.log(activeTab)
    chrome.tabs.sendMessage(activeTab, msg);
})
chrome.runtime.onInstalled.addListener(() => {
    console.log('onInstalled...');
    // create alarm after extension is installed / upgraded
    chrome.alarms.create('refresh', { periodInMinutes: 1 });
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request)
    if(request == "water"){
        health += 10
        if(health >100) 
            health = 100
        console.log(health)
    }else if(request =='park'){
        if(healthRate == 2){
            heathRate = 1
        }else{healthRate = 2}
    }
    sendResponse(health)
});

chrome.alarms.onAlarm.addListener((alarm) => {

    chrome.idle.queryState(60, function(newState) {
        if(newState =="active")
            if(health>0)
                health-= 5
        else{
            health+=5 * healthRate
            if(health>100) health=100
        }console.log(newState)
        sendHealth();
    })
});

function sendHealth() {
    let msg = {
        myHealth: health
    }
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(activeTab, msg);  
    // });
    console.log("Hello, world!: "+health);
}