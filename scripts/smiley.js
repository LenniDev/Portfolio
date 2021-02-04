var picture = [];
api_url = "minecraft.notingly.de/";
function setup(){
    let canvas = createCanvas(250, 250);
    canvas.parent("drawing-pad")
    clear_picture();
}
function draw(){
    if(mouseIsPressed){
        try{
            picture[Math.round((mouseX-5)/10)][Math.round((mouseY-5)/10)] = 255
        }catch{}
    }
    for(var x = 0; x< 25; x++){
        for(var y = 0; y< 25; y++){
            fill(255-picture[x][y])
            rect(10*x, 10*y, 10*x+10, 10*y+10);
        }
    }
}

function clear_picture(){
    picture = [];
    for(var x = 0; x< 25; x++){
        var line = [];
        for(var y = 0; y< 25; y++){
            line.push(0);
        }
        picture.push(line);
    }
}

async function identify(){
    let response = await fetch(api_url + 'predict', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"picture":picture}),
    });
    data = await response.json()
    console.log("Dein Smiley ist: " + JSON.stringify(data))
    $(".result").html("Dein Smiley ist: " + data["feeling"])
}