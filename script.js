console.log("java script hello");
let cir;
let songs;
let playmusic;
let previ=document.getElementById("previous");
let currentsong=new Audio();
let ab=0;
function convertSecondsToMinutes(seconds) {
  seconds = Math.floor(seconds); // Ensure the input is an integer
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
async function getsongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  

  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.getElementsByTagName("a");

  let songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

async function main() {
   playmusic = ((track,pause=false) => {
    
    currentsong.src = "/songs/" +decodeURI(track)
    if(!pause){                           
      currentsong.play();         //for play the music this is only function
     
    
    }    
    play.src="spotify clone/pause.svg"
    document.querySelector(".songinfo").innerHTML=track
        document.querySelector(".songtime").innerHTML="00:00/00:00"

  })

   

  
   songs = await getsongs();

  let songul = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songul.innerHTML =
      songul.innerHTML +
      ` 
           <li>
              <img class="invert" src="spotify clone/music.svg" alt="">
              <div class="info">
                 <div>${song .replaceAll("%20", " ") }</div>
                <div>song artist</div>
              </div>
              <div class="playnow">
                <span>play now</span>
                <img class="invert" src="spotify clone/play.svg" alt="">
              </div>
        
              </li>`;
  }
  playmusic(songs[0],true);
    play.src="spotify clone/play.svg"
  currentsong.addEventListener("timeupdate",()=>{
    if(currentsong.currentTime==currentsong.duration){
      play.src="spotify clone/play.svg"
    }
    document.querySelector(".songtime").innerHTML=`${convertSecondsToMinutes(currentsong.currentTime)}/${convertSecondsToMinutes(currentsong.duration)}`
    document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%";
  })
  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())   
  
    })

  });
  document.querySelector(".seekbar").addEventListener("click",e=>{
    let seekbar=document.querySelector(".seekbar");
  document.querySelector(".circle").style.left=(e.offsetX/seekbar.clientWidth)*100+"%"
 


      document.querySelector(".songtime").innerHTML=`${convertSecondsToMinutes(((e.offsetX/902)*100/100)*currentsong.duration)}/${convertSecondsToMinutes(currentsong.duration)}`
      currentsong.currentTime=((e.offsetX/seekbar.clientWidth)*100/100)*currentsong.duration;
      
  
  })
  play.addEventListener("click",()=>{
    if(currentsong.paused){
      currentsong.play();
      play.src="spotify clone/pause.svg"; 
    }else{
      currentsong.pause();
      play.src="spotify clone/play.svg";  // change the icon to play.svg when the audio is paused.
    }
  })
  document.querySelector(".slide").addEventListener("click",()=>{
    document.querySelector(".left").style.display="inline-block";
     let left= document.querySelector(".left")
     left.style.width="100vw";
     document.querySelector(".conteiner").style.display="inline-block";
     document.querySelector(".right").style.display="none";
     document.querySelector(".songlist").style.height="70vh"
    
     
    });
    document.querySelector(".slide1").addEventListener("click",()=>{
    
      let left= document.querySelector(".left")
      left.style.width="0%";
      document.querySelector(".right").style.display="inline-block";
      document.querySelector(".left").style.display="none";
      
     });
}
Array.from(
  document.querySelector(".cardcontainer").getElementsByTagName("svg")
).forEach((e) => {
  e.addEventListener("click", (element) => {
    const infoElement = e.querySelector(".info");
    if (infoElement && infoElement.firstElementChild) {
      playmusic(infoElement.firstElementChild.innerHTML.trim());
    }
  });
});
previous.addEventListener("click",()=>{
  let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
 if(index>=1){
  playmusic(songs[index-1])
 }
 
})
next.addEventListener("click",()=>{
 let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
 if(index<songs.length-1){
  playmusic(songs[index+1])
 }
 
})

main();
