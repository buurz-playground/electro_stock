var request = require('request');
setInterval(function(){
  request("https://finance.google.com/finance/info?client=lg&q=dji", function(error, response, body){
    body = body.slice(3);
    body = JSON.parse(body);
    console.log(body);
    newPrice(body);
  });
}, 1000)

var lastPrice = 0;
function newPrice(arr){
  currentPrice = arr[0]["l"];
  var history = document.getElementById("priceHistory");
  if (lastPrice < currentPrice){
    var newElText = "\u25B2 ";
    var wrap = document.createElement("span");
    wrap.className = "up";
  }
  else if (lastPrice == currentPrice){
    var newElText = "\u2012 ";
    var wrap = document.createElement("span");
    wrap.className = "noChange";
  }
  else{
    var newElText = "\u25BC ";
    var wrap = document.createElement("span");
    wrap.className = "down";
  }

  history.appendChild(wrap);
  var textNode = document.createTextNode(newElText);
  wrap.appendChild(textNode);
  var nodeList = history.getElementsByTagName("SPAN").length;
  if(nodeList == 8){
    history.children[0].remove();
  }
  currentPrice = arr[0]["l"];
  document.getElementById("price").innerHTML = currentPrice;
  lastPrice = currentPrice
}