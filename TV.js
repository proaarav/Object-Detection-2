objects =[];
    


function preload(){
  img = loadImage("https://media.istockphoto.com/id/1332099020/photo/modern-living-room-interior-with-smart-tv-sofa-floor-lamp-and-potted-plant.jpg?s=612x612&w=0&k=20&c=j0lRO-TkQOAkXte-HBT6mnb3WfN6E2AA_Ma7e8k0dmU=");
}
 status = "";
function setup(){
    canvas = createCanvas(640,480);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);

    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
  console.log("Model is Loaded!");
  status = "finished";
  objectDetector.detect(img,gotResult);
}
function gotResult(error,results){
  if(error){
   console.log(error);
  }
  else{
   console.log(results);
   objects = results;
  }
}


function draw(){
    image(img,0,0,640,480);
    if(status != ""){
      for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Objects are Detected";

       fill("red");
       percent = floor(objects[i].confidence * 100);
       text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
       noFill();
       stroke("red");
       rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
      }
    }

}


