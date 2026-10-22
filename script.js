
/*
  UPDATE THESE VALUES BEFORE PUBLISHING.

  WhatsApp number:
  Use Sri Lankan international format without +, spaces or dashes.
  Example: 94771234567
*/

const CONFIG = {
  eventDate: "Sunday, 15 November 2026",
  eventTime: "2:00 PM – 5:00 PM",
  venueName: "Shangri-La",
  venueAddress: "Shangri-La Colombo, Sri Lanka",

  // Enter the recipient's real WhatsApp number.
  rsvpPhone: "94701937390",

  // Paste the full Google Maps URL for your venue.
  mapUrl: "https://www.google.com/maps/place/Shangri-La+Colombo/@6.9285407,79.8418613,17z/data=!4m9!3m8!1s0x3ae2593b09364c4f:0x7dc13fa1f24d5c16!5m2!4m1!1i2!8m2!3d6.9285354!4d79.8444362!16s%2Fg%2F11g9mhzr8y?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D"
};

// Populate the event information.
document.getElementById("eventDate").textContent = CONFIG.eventDate;
document.getElementById("eventTime").textContent = CONFIG.eventTime;
document.getElementById("venueName").textContent = CONFIG.venueName;
document.getElementById("venueAddress").textContent = CONFIG.venueAddress;

const welcomeScreen = document.getElementById("welcomeScreen");
const letterScreen = document.getElementById("letterScreen");
const detailsScreen = document.getElementById("detailsScreen");

const envelopeButton = document.getElementById("envelopeButton");
const showDetailsButton = document.getElementById("showDetailsButton");
const backToLetterButton = document.getElementById("backToLetterButton");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

let musicIsPlaying = false;

function showScreen(screenToShow) {
  [welcomeScreen, letterScreen, detailsScreen].forEach((screen) => {
    screen.classList.remove("active");
  });

  screenToShow.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Background music
async function startMusic() {
  try {
    await music.play();
    musicIsPlaying = true;
    updateMusicButton();
  } catch (error) {
    musicIsPlaying = false;
    updateMusicButton();
    console.info("Music needs a user interaction or a valid music.mp3 file.");
  }
}

function updateMusicButton() {
  musicButton.textContent = musicIsPlaying ? "♫ Music On" : "♫ Music Off";
  musicButton.setAttribute(
    "aria-label",
    musicIsPlaying ? "Pause background music" : "Play background music"
  );
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    await startMusic();
  } else {
    music.pause();
    musicIsPlaying = false;
    updateMusicButton();
  }
});

music.addEventListener("play", () => {
  musicIsPlaying = true;
  updateMusicButton();
});

music.addEventListener("pause", () => {
  musicIsPlaying = false;
  updateMusicButton();
});

// Clicking the envelope opens the letter.
// There is no separate "Open Your Letter" button.
envelopeButton.addEventListener("click", async () => {
  if (envelopeButton.disabled) return;

  envelopeButton.disabled = true;
  envelopeButton.classList.add("opening");

  // Start music after the user's envelope click.
  if (music.paused) {
    startMusic();
  }

  window.setTimeout(() => {
    showScreen(letterScreen);
    envelopeButton.disabled = false;
  }, 550);
});

// Letter -> event details
showDetailsButton.addEventListener("click", () => {
  showScreen(detailsScreen);
});

// Event details -> letter
backToLetterButton.addEventListener("click", () => {
  showScreen(letterScreen);
});

// Google Maps directions
document.getElementById("mapButton").addEventListener("click", () => {
  if (!CONFIG.mapUrl || CONFIG.mapUrl === "https://www.google.com/maps/place/Shangri-La+Colombo/@6.9285407,79.8418613,17z/data=!3m1!4b1!4m9!3m8!1s0x3ae2593b09364c4f:0x7dc13fa1f24d5c16!5m2!4m1!1i2!8m2!3d6.9285354!4d79.8444362!16s%2Fg%2F11g9mhzr8y?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D") {
    const address = CONFIG.venueAddress.trim();

    if (!address || address === "Shangri-La Colombo, Sri Lanka") {
      alert("Please add your venue address in script.js first.");
      return;
    }

    const searchUrl =
      "https://www.google.com/maps/place/Shangri-La+Colombo/@6.9285407,79.8418613,17z/data=!3m1!4b1!4m9!3m8!1s0x3ae2593b09364c4f:0x7dc13fa1f24d5c16!5m2!4m1!1i2!8m2!3d6.9285354!4d79.8444362!16s%2Fg%2F11g9mhzr8y?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D" +
      encodeURIComponent(address);

    window.open(searchUrl, "_blank", "noopener,noreferrer");
    return;
  }

  window.open(CONFIG.mapUrl, "_blank", "noopener,noreferrer");
});

// WhatsApp RSVP

/* WhatsApp RSVP */

document.getElementById("rsvpForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const guestName = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const guestCount = document.getElementById("guestCount").value;

  if (!guestName || !attendance || !guestCount) {
    alert("Please complete all RSVP fields.");
    return;
  }

  // Your default WhatsApp number goes here.
  // Example: Sri Lankan 0771234567 -> 94771234567
  const defaultWhatsAppNumber = "94778098533";

  const message =
`🧸 BABY SHOWER RSVP

Name: ${guestName}
Response: ${attendance}
Number of guests: ${guestCount}

Date: ${CONFIG.eventDate}
Time: ${CONFIG.eventTime}
Venue: ${CONFIG.venueName}

Thank you! 🤎`;

  const whatsappURL =
    "https://wa.me/" +
    defaultWhatsAppNumber +
    "?text=" +
    encodeURIComponent(message);

  // Open WhatsApp with the recipient and message filled in.
  window.open(whatsappURL, "_blank");
});

// Initial state
showScreen(welcomeScreen);
updateMusicButton();
