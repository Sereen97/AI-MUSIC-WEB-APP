song="";
song1_status="";
song2_status="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist="";
scoreRightWrist="";


function preload()
{
    song1= loadSound("music.mp3");
    song2= loadSound("peter_pan.mp3")
}
function setup()
{
    canvas= createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is initialized');
}


function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist =" + scoreLeftWrist);
        scoreRightWrist =results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist =" + scoreRightWrist);
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY ="+ leftWristY);
   
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY ="+ rightWristY);
    }

}
function draw()
{
    image(video, 0,0,600,500);
    song1_status= song1.isPlaying();
    song2_status= song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreRightWrist >0.2)
    {
        circle(rightWristX,rightWristY, 20);
        song2.stop();
        if(song1_status==false)
        {
            song=song1;
            song.play()
            document.getElementById("song").innerHTML="soothing music"
        }
    }
    if(scoreLeftWrist >0.2)
    {
        circle(leftWristX,leftWristY, 20);
        song1.stop();
        if(song2_status==false)
        {
            song=song2;
            song.play()
            document.getElementById("song").innerHTML="Peter Pan"
        }
    }
}
function playing()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause()
{
    song.pause();
}

function stop()
{
    song.stop();
}
