const trackDir = "";
const bpm = 124;

const parts = [
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.1.wav", length: 4,  loop: 1 },
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.2.wav", length: 4,  loop: 1 }, 
    // { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.3.wav", length: 8,  loop: 1 },
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.5.wav", length: 8,  loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.7.wav", length: 8,  loop: 1 },
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.9.wav", length: 8,  loop: 1 },
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.11.wav", length: 8, loop: 1 },
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.13.wav", length: 4, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.15.wav", length: 4, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.17.wav", length: 4, loop: 1 },
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.19.wav", length: 4, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.21.wav", length: 4, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.23.wav", length: 4, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.25.wav", length: 4, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.27.wav", length: 8, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.29.wav", length: 8, loop: 1 },
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.31.wav", length: 8, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.33.wav", length: 8, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.35.wav", length: 8, loop: 1 },
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.37.wav", length: 8, loop: 1 },//18 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.39.wav", length: 8, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.41.wav", length: 4, loop: 1 },//20
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.43.wav", length: 4, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.45.wav", length: 4, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.47.wav", length: 8, loop: 1 },
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.49.wav", length: 8, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.51.wav", length: 8, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.53.wav", length: 8, loop: 1 },
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.55.wav", length: 8, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.57.wav", length: 8, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.59.wav", length: 8, loop: 1 }, 
    { file: "Audio_Soul_Project-Deliver_Me_Dub_Instrumental_16bit_master.61.wav", length: 8, loop: 1 }, 
];

const presets = [];
presets.push([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
]);
presets.push([    
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
]);
presets.push([ 
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
]);
presets.push([ 
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
]);

const svgElement2 = document.getElementById('statusScriptIcon');
const newSvgContent2 = `
<circle cx="20" cy="20" r="18" stroke="#CEC6B3" stroke-width="4" fill="#576B68" />
<path d="M13 20 l5 5 l10 -10" stroke="#CEC6B3" stroke-width="4" fill="none" />`;

document.getElementById("statusScript").innerHTML = "Visual Assets Loaded";
document.getElementById('statusScript').style.color = '#576B68';
svgElement2.innerHTML = newSvgContent2;

// console.log("PRODUCER: SLUM GOD")
// console.log("LABEL: Housepit CHI | HPIT.info")
// console.log("DEVELOPER: Bryan (Bai-ee) Balli")
// console.log("ABOUT: EditTrax is a collectable digital audio workstation NFT that allows for the non-destructive editing, rendering, and direct downloading of audio .wav files.")
// console.log("LIMITATIONS:")

// console.log("• DOWNLOADS ENABLED IN SAFARI BROWSERS ONLY. MUST BE VIEWING ON HICETNUNC")
// console.log("• Original artist retains all creative rights to any edit created and downloaded")
// console.log("• You are fully encouraged to use downloaded edits in your mix tapes, social content creation and public performances")
// console.log("• You are not allowed to distribute downloaded edits for direct sale or distribution in any way")
// console.log("CONTACT: edittrax@protonmail.com")
// console.log("WEB: EditTrax.nft | .com")


const downloadName = "Audio_Soul_Project_(Deliver_Me_DUB)_EDIT.wav"
const boxHeight = 60; //min height == 40 -> otherwise clickable buttons are to small
const reverseScrolling = false;
