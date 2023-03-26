
const creator = new URLSearchParams(window.location.search).get('creator');
const viewer = new URLSearchParams(window.location.search).get('viewer');
const owner = new URLSearchParams(window.location.search).get("owner");
const objkt = new URLSearchParams(window.location.search).get('objkt');

var isOwned = false;
let playToggle = document.querySelector("#play-toggle");
let downloadButton = document.querySelector("#download");
let purchaseElement = document.querySelector("#purchase");
let playElement = document.querySelector("#play-toggle");
let status = document.querySelector("#status");
let slider_cont = document.querySelector("#slider_cont");
let presetElements = [];
let elements = [];

purchaseElement.addEventListener('click', function(){
    
    gsap.fromTo("#body", {backgroundColor:"red", ease: "Power1.easeOut"}, {backgroundColor:"black"});

});

playElement.addEventListener('click', function(){

    if (playElement.className == "stop") {
        gsap.fromTo("#body", {backgroundColor:"red", ease: "Power1.easeOut"}, {backgroundColor:"black"});
    } else {
        gsap.fromTo("#body", {backgroundColor:"green", ease: "Power1.easeOut"}, {backgroundColor:"black"});        
    }
});

    presetElements = document.querySelectorAll(".preset");
    elements = document.querySelectorAll(".loopinteraction");

    for (var i = 0, presetElement; presetElement = presetElements[i]; i++) {
        presetElement.addEventListener('click', function() {
            for(var i = 0; i < presetElements.length; i++){
                presetElements[i].classList.remove('active');
            }
            this.classList.add('active');
            Tone.Transport.stop();
            loadPreset(this.dataset['value']);
            updatePlayClass();
            setTogglePlayGlowAndPartsActive();
        });
    }

    for (var i = 0, element; element = elements[i]; i++) {
        element.addEventListener("click", function (event) {
            Tone.Transport.stop();
            updateDurations();
            schedulePlayers();
            updatePlayClass();
            setTogglePlayGlowAndPartsActive();
        })
    }

    document.getElementById('masterUp').addEventListener("click", loopMasterUp);
    document.getElementById('masterDown').addEventListener("click", loopMasterDown);

function setTogglePlayGlowAndPartsActive() {
    var elem = document.querySelector("#play-toggle");

    if (Tone.Transport.state == "started" || player.state == "started") {
        if( document.querySelector('#glow-hover-play')) {
            document.querySelector('#glow-hover-play').id = "glow-hover-stop";
            elem.classList.remove("play")
            elem.classList.add("stop")
            slider_cont.classList.remove("play")
            slider_cont.classList.add("stop")
            boxes_cont.classList.add("pointer-events-none")

            for(var i = 0; i < parts.length; i++){
                parts[i].ref_box.classList.add("isnotactive");
            }
        }
    } else {
        if(document.querySelector('#glow-hover-stop')){
            document.querySelector('#glow-hover-stop').id = "glow-hover-play";
            elem.classList.remove("stop")
            elem.classList.add("play")
            slider_cont.classList.remove("stop")
            slider_cont.classList.add("play")
            boxes_cont.classList.remove("pointer-events-none")

            for(var i = 0; i < parts.length; i++){
                parts[i].isactive = false;
                parts[i].ref_box.classList.remove("isactive");
                parts[i].ref_box.classList.remove("isnotactive");
            }
        }
    }
}

function enableElements() {
    for (var i = 0, element; element = elements[i]; i++) {
        element.disabled = false
    }
}

let trackRepeatElement = document.getElementById("trackRepeat");
var trackRepeat = Number.parseInt(trackRepeatElement.innerHTML);

function loopMasterUp() {
    console.log("masterUp Loop")
    if(trackRepeat < 9){
        trackRepeat++;
        trackRepeatElement.innerHTML = trackRepeat;
        changeMasterLoop();
    }
}

function loopMasterDown() {
    if(trackRepeat > 0){
        trackRepeat--;
        trackRepeatElement.innerHTML = trackRepeat;
        changeMasterLoop();
    }
}

function changeMasterLoop(){
    Tone.Transport.stop();
    updateDurations();
    schedulePlayers();
    updatePlayClass();
    setTogglePlayGlowAndPartsActive();
}

const player = new Tone.Player().toDestination();
player.loop = true;

const buffers = parts.map(part => new Tone.Buffer({ url: trackDir + part.file }));

var activeBufferIndex = -1;
var renderedBufferIndex = 99;

var tlStageBlock
function mainTimline() {
  tlStageBlock = gsap.timeline({delay:0});
  tlStageBlock.timeScale( 2 ); 
  tlStageBlock.to("#stageBlock", {duration:1, autoAlpha:0},0);
  tlStageBlock.to("#flipMe_return_direx", {duration:3, delay:2, autoAlpha:1, ease:"Power4.easeInOut"});
  tlStageBlock.from("#wrapper_cont", {duration:1, autoAlpha:0},"-=1");
  tlStageBlock.from("#wrapper", {duration:1, autoAlpha:0});
  tlStageBlock.to("#header, #presets, #pre2,#boxes_cont, #master_controls, #progress_cont, .marquee, #footer", {duration:3, stagger:0.35, autoAlpha:1, delay:1, ease:"Power4.easeInOut"},.5);
  tlStageBlock.to("#wrapper", {duration:0.25, height:"100%", width:"100%", ease:"Power1.easeOut"},0);
  tlStageBlock.to('.loader, #wrapper_bg p', {duration:1,opacity: 0},0);

  document.getElementById('wrapper_bg').style.display = "none";
  nudge = null;
  gsap.to("#slider_cont",{duration:0.25, autoAlpha:1, delay:0, oncomplete: () => {
    // setSliderVisibility();
    // initialSliderPositionAndBounds();
  }});
  tlStageBlock.addLabel("myLabel", ">");
}

function readyCheck(){

    mainTimline();
}

//TONE LOADED
Tone.loaded().then(function () {

    status.innerHTML = "MASTER EDIT"
    playToggle.disabled = false;
    enableElements();
    loadPreset(0);

    const svgElement = document.getElementById('statusAudioIcon');
    const newSvgContent = `
    <circle cx="20" cy="20" r="18" stroke="#CEC6B3" stroke-width="4" fill="#576B68" />
    <path d="M13 20 l5 5 l10 -10" stroke="#CEC6B3" stroke-width="4" fill="none" />`;

    document.getElementById("statusAudio").innerHTML = "WAV Files Loaded";
    document.getElementById('statusAudio').style.color = '#576B68';
    svgElement.innerHTML = newSvgContent;

    var button = document.getElementById('confetti-button');
    var container = document.getElementById('confetti-container');

    gsap.to("#flipMe", {duration:1, autoAlpha:0, delay:2, ease:"Power4.easeInOut", oncomplete: () => {readyCheck();}});
    gsap.to("#cont_slider_boxes", {duration:2, autoAlpha:1, delay:3, ease:"Power4.easeInOut"});

    // gsap.to("#flipMe", {duration:4, autoAlpha:0, delay:4, oncomplete: () => {mainTimline();}});

    const errorTitle = document.getElementById('statusTitle');
    const errorInformation = document.getElementById('statusInformation');
    errorTitle.innerHTML = `READY!`;        
    // document.getElementById('statusTitle').style.color = '#7E1E20';
    errorInformation.innerHTML = `Player Ready`;
    // document.getElementById('statusInformation').style.color = '#7E1E20';
    

});

function loadPreset(index) {
    const preset = presets[index];
    for (var i = 0; i < parts.length ; i++) {
        parts[i].loop = preset[i] ?? 0;
        parts[i].refelem.innerHTML = parts[i].loop;
    }
    presetLoaded();
}

// loadPreset();

try {

} catch(error) {

    // console.log( ${error.message})
    console.log(`An error occurred: ${error.message}`)
    const errorTitle = document.getElementById('statusTitle');
    const errorInformation = document.getElementById('statusInformation');
    errorTitle.innerHTML = `REFRESH PAGE`;        
    document.getElementById('statusTitle').style.color = '#7E1E20';
    errorInformation.innerHTML = `An error occurred: ${error.message}`;
    document.getElementById('statusInformation').style.color = '#7E1E20';

}

async function presetLoaded() {

    updateDurations();
    schedulePlayers();
}

function render() {
    console.log("Download")
    status.innerHTML = "Render"
    const renderingPromise = Tone.Offline(({ transport }) => {
        transport.bpm.value = bpm;

        var playhead = 0;

        for (var i=0; i<trackRepeat; i++) {
            buffers.forEach((buffer, i) => {
                if (parts[i].loop == 0) { return }

                var partPlayer = new Tone.Player(buffer)
                partPlayer.loop = parts[i].loop > 1;
                var loopLength = parts[i].length * parts[i].loop;
                partPlayer.toDestination().sync().start(playhead + "m").stop(playhead + loopLength + "m");
                playhead += loopLength
            });
        }

        transport.start();
    }, Tone.Time(totalLength()))

    renderingPromise.then(buffer => {
        status.innerHTML = "Master Track"
        makeDownload(buffer.get())
    });

    renderingPromise.then(() => {
        var downloadLink = document.getElementById("download-link");
        downloadLink.click();
    });
}

Tone.Transport.bpm.value = bpm;

var players = buffers.map((buffer, i) => {
    var partPlayer = new Tone.Player(buffer)
    partPlayer.loop = parts[i].loop > 1;
    partPlayer.toDestination().sync()
    return partPlayer;
});

function schedulePlayers() {
    players.forEach((partPlayer) => {partPlayer.unsync(); partPlayer.sync()});
    var playhead = 0;
    for (var i=0; i<trackRepeat; i++) {
        players.forEach((partPlayer, i) => {
            if (parts[i].loop == 0) { 
                return;
            }

            partPlayer.loop = parts[i].loop > 1;
            var loopLength = parts[i].length * parts[i].loop;
            partPlayer.start(playhead + "m").stop(playhead + loopLength + "m");
            playhead += loopLength
        }); 
    }   
}

var playerStartTime = 0;
var previewProgressElement;

function previewPart(index, element) {
    if (Tone.Transport.state == "started") {
        Tone.Transport.stop();
    }

    if (activeBufferIndex != index) {
        player.stop();
        activeBufferIndex = index;
        player.buffer = buffers[index];
    }
    
    if (player.state == "started") {
        playerStartTime = 0;
        player.stop()
    } else {
        playerStartTime = Tone.now();
        previewProgressElement = element;
        player.start();
    }

    resetPreviewProgress();
    updatePlayClass();
}

function resetPreviewProgress(index) {
    var durationElements = document.querySelectorAll(".previewProgress");
    
    for (var i = 0, element; element = durationElements[i]; i++) {
        element.value = 0;
    }
}

function previewProgress() {
    if (playerStartTime == 0 || player.state == "stopped") {
        return 0;
    }
    return (Tone.now() - playerStartTime) % player.buffer.duration / player.buffer.duration;
}

playToggle.onclick = function () {

    Tone.start();

    if (activeBufferIndex != renderedBufferIndex) {
        activeBufferIndex = renderedBufferIndex;
        playerStartTime = 0;
        player.stop();
        resetPreviewProgress();
    }

    if (Tone.Transport.state == "started") {
        Tone.Transport.stop();
    } else {
        Tone.Transport.start()
        Tone.Transport.scheduleOnce(autoStop, '+' + totalLength());
    }
    updatePlayClass();
    goToFirst();
}

autoStop = function() {
    Tone.Transport.stop();
    updatePlayClass();
    goToFirst();
}

function scrollToPart(idx){
    seamless.elementScrollIntoView(parts[idx].ref_box, {
        behavior: "smooth",
        block: "start",
        inline: "start",
    });
}

function goToFirst() {
    lastIndex = 0;
    // scrollToPart(0);
    setTogglePlayGlowAndPartsActive();
    // TweenLite.set(draggableSlider[0].target, {y:0, onUpdate:draggableSlider[0].update, onUpdateScope:draggableSlider[0]});
}

playToggle.dataset.index = renderedBufferIndex;

function updatePlayClass() {
    const isPlaying = Tone.Transport.state == "started" || player.state == "started";

    var previewElements = document.querySelectorAll(".preview");
    
    for (var i = 0, element; element = previewElements[i]; i++) {
        if (element.dataset.index == activeBufferIndex && isPlaying) {
            element.classList.remove("play")
            element.classList.add("stop")
        } else {
            element.classList.remove("stop")
            element.classList.add("play")
        }
    }
}

function updateDurations() {
    var durationElements = document.querySelectorAll(".previewDuration");
    
    for (var i = 0, element; element = durationElements[i]; i++) {
        let index = element.dataset.index;
        let duration = previewDuration(index);
        element.innerHTML = formatDuration(duration);
    }

    let totalDurationElement = document.querySelector("#totalDuration");
    let totalDuration = trackDuration();
    totalDurationElement.innerHTML = formatDuration(totalDuration);

    let progress_total = document.querySelector("#progress_total");
    progress_total.innerHTML = formatDuration(totalDuration);

}

function previewDuration(index) {
    let duration = buffers[index].duration * parseInt(parts[index].loop);
    return duration
}
function mainLoopDuration() {
    return parts.reduce((sum, { loop }, index) => sum + buffers[index].duration * loop, 0);
}
function trackDuration() {
    return mainLoopDuration() * trackRepeat;
}

function trackLoopLength() {
    return parts.reduce((sum, { length, loop }) => sum + length * loop, 0) + 'm';
}

function totalLength() {
    return parts.reduce((sum, { length, loop }) => sum + length * loop, 0) * trackRepeat + 'm';
}

function formatDuration(duration) {
    let minutes = Math.floor(duration / 60);
    if(minutes < 10) minutes = "0" + minutes;
    let seconds = Math.floor(duration - (minutes * 60));
    if (seconds < 10) { seconds = "0" + seconds; }
    return minutes + ":" + seconds;
}

function pointerEventsOn(){
    gsap.set("#flipMe, #flipMe_return_direx", {pointerEvents:"auto"});
}

function pointerEventsOff(){
    gsap.set("#flipMe, #flipMe_return_direx", {pointerEvents:"none"});
}

function preview() {
    pointerEventsOff()
    // gsap.to("#content", {duration:0.5, y:"-=10"})
    // Tone.Transport.start()
    // console.log("preview toggle available");
}

function stopPreview() {
    pointerEventsOff()
    // gsap.to("#content", {duration:0.5, y:"+=10"})
    // Tone.Transport.stop()
    // console.log("preview toggle disabled");
}

document.getElementById("preview").addEventListener("mouseover", preview);
document.getElementById("preview").addEventListener("mouseout", stopPreview);

let testBool = true;
let showDirections = false;

function toggle() {

    var delay = 0.25;

    var tlFlipCard = gsap.timeline({paused: true});
    tlFlipCard.to("#wrapper_cont", {duration:0.5,opacity:0, ease:"Back.easeInOut"})

    if ((testBool == true) && (showDirections == false)) {
        pointerEventsOff();
        tlFlipCard.play();
        gsap.to("#flipMe_return_direx", {duration:0.5, opacity:1, delay:.5, visibility:"visible", onComplete:pointerEventsOn});

        const myButton = document.getElementById('flipMe_return_direx');
        myButton.innerHTML = 'PLAYER';
        document.getElementById('flipMe_return_direx').style.backgroundColor = '#495A58';
        document.getElementById('flipMe_return_direx').style.color = '#CEC6B3';
    } 
    else if ((testBool == true) && (showDirections == true)) {} 
    else {
        pointerEventsOff();
        tlFlipCard.reverse();
        gsap.to("#wrapper_cont", {duration:0.5, opacity:1, ease:"Back.easeInOut"})
        gsap.to("#flipMe_return_direx", {duration:0.5, opacity:1, delay:.5,visibility:"visible", onComplete:pointerEventsOn});

        const myButton = document.getElementById('flipMe_return_direx');
        document.getElementById('flipMe_return_direx').style.backgroundColor = '#CEC6B3';
        myButton.innerHTML = 'ALBUM ART';
        document.getElementById('flipMe_return_direx').style.color = '#495A58';
    }
    
    testBool = !testBool;
}

downloadButton.onclick = function () {
    render();
}

function makeDownload(buffer) {
    var newFile = URL.createObjectURL(bufferToWave(buffer, 0, buffer.length));

    var downloadLink = document.getElementById("download-link");
    downloadLink.href = newFile;
    downloadLink.download = downloadName;
}

function validateToken(viewer, objkt){
    const url = 'https://api.tzkt.io/v1/bigmaps/511/keys?key.address=' + viewer + '&key.nat=' + objkt + '&select=value';
    axios.get(url)
    .then(result => {
        let count = result.data ?? [];
        isOwned = count.length > 0;
        // downloadButton.disabled = !isOwned;
        downloadButton.style.visibility = isOwned ? 'visible' : 'hidden';
        purchaseElement.style.display = !isOwned ? 'block' : 'none';
    })
    .catch(err => console.log('error', err));
}

const progressElem_curr = document.getElementById('progress_current');
const progressElem = document.getElementById("progress");
let lastIndex = 0;

setInterval(() => {
    const progress = Tone.Transport.ticks / Tone.Time(totalLength()).toTicks();
    const width = Math.floor(progress * 100);

    let seconds = trackDuration() * progress;

    if(Number.isFinite(width)){
        progressElem_curr.innerHTML = formatDuration(seconds);
        progressElem.value = width;

        let loopDuration = mainLoopDuration();
        var current = 0;
        let currentMainLoop = 1;
        while(seconds > (loopDuration * currentMainLoop))
        {
            current += loopDuration;
            currentMainLoop++;
        }

        if(seconds > 0){
            for(var i = 0; i < parts.length; i++){
                current += previewDuration(i);
                if(seconds < current){
                    if(!parts[i].isactive){
                        scrollToPart(i);
                        parts[lastIndex].isactive = false;
                        parts[lastIndex].ref_box.classList.remove("isactive");
                        parts[lastIndex].ref_box.classList.add("isnotactive");
                        parts[i].ref_box.classList.remove("isnotactive");
                        parts[i].ref_box.classList.add("isactive");
                        parts[i].isactive = true;
                        lastIndex = i;
                    }
                    break;
                }
            }
        }
    }

    if (playerStartTime > 0) {
        const previewWidth = Math.floor(previewProgress() * 100);
        previewProgressElement.value = previewWidth;
    }

}, 200);

function validateToken(viewer, objkt){

    console.log("///////ABOUT:")
    console.log("• You are viewing an interactive music collectible with an integrated looper, token gate and direct download mechanism. Collect on the Tezos Blockchain to unlock and download edits as WAV files, when connecting your web3 wallet to a public marketplace.")
    console.log("////////RIGHTS:")
    console.log("• Original artist retains all creative rights to downloaded material.")
    console.log("• Collectors are fully encouraged to use downloaded edits in mix tapes, social content and public performances.")
    console.log("• Collectors are not allowed to distribute or repackage for direct sale or distribution in any way.")
    console.log("• Collector will assume no other rights.")
    
    const url = 'https://api.tzkt.io/v1/bigmaps/511/keys?key.address=' + viewer + '&key.nat=' + objkt + '&select=value';
    axios.get(url)
    .then(result => {
        let count = result.data ?? [];
        isOwned = count.length > 0;
    
    console.log("////////VERIFYING OWNER...")
    console.log("VIEWER:")
    console.log(viewer)
    console.log("OBJKT:")
    console.log(objkt)
      
    if(isOwned){

        console.log("is owned")

        console.log("CONFIRMING:")
        console.log(isOwned)
        console.log("• Owner Verified: Downloads Enabled")
        console.log("DOWNLOADS ENABLED")

        downloadButton.style.display = 'block';
        purchaseElement.style.display = 'none';
        downloadButton.onclick = function () {
            render();
        }
        
        } else {
        console.log("CONFIRMING:")
        console.log(isOwned)                    
        console.log("• Owner Not Verified: Collect to Unlock Downloads")
        console.log("COLLECT TO DOWNLOAD")

        downloadButton.style.display = 'none';
        purchaseElement.style.display = 'block';
        
        }
    })
    .catch(err => console.log('error', err));
}
    
validateToken(viewer, objkt)