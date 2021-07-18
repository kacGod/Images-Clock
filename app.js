
let noon = 12;
let evening = 18;

let events = {
    wakeUpTime: {
        time: 7,
        imageSrc: "Images/wake_up_image.jpg",
        message: "\"Wake Up!\""
    },
    lunchTime: {
        time: 13,
        imageSrc: "Images/lunch_time_image.jpg",
        message: "\"Lunch Time!\""
    },
    napTime: {
        time: 15,
        imageSrc: "Images/nap_time_image.jpg",
        message: "\"Nap Time!\""
    },
    partyTime: {
        time: Number.MIN_SAFE_INTEGER,
        imageSrc: "Images/party_time_image.jpg",
        message: "\"Party Time\"",
    }
}

let timeOfDay = {
    morning: {
        time: 24,
        imageSrc: "Images/morning_image.jpg",
        message: "\"good morning\""
    },
    noon: {
        time: 12,
        imageSrc: "Images/afternoon_image.jpg",
        message: "\"good afternoon\""
    },
    evening: {
        time: 18,
        imageSrc: "Images/evening_image.jpg",
        message: "\"good evening\""
    }
}

let timeDisplay = document.getElementsByClassName("time-display")[0];

let hoursDisplay = document.getElementsByClassName("hours")[0];
let minutesDisplay = document.getElementsByClassName("minutes")[0];
let secondsDisplay = document.getElementsByClassName("seconds")[0];

let imageDisplay = document.getElementsByClassName("image-display")[0];
let hiddenImageDisplay = document.getElementsByClassName("hidden-image-display")[0];

let amPm = document.getElementsByClassName("am-pm")[0];



let dayPartsContainer = document.getElementsByClassName("day-parts-container")[0];
let dayPartsContent = document.getElementsByClassName("day-parts")[0];

let intervalId = setInterval(() => {
    let newDate = new Date();
    let hoursNow = newDate.getHours();
    let minutesNow = newDate.getMinutes();
    let secondsNow = newDate.getSeconds();
    changeImage(hoursNow, timeOfDay);

    if (secondsNow < 10) {
        secondsDisplay.textContent = `0${secondsNow}`;
    } else {
        secondsDisplay.textContent = secondsNow;
    }

    if (minutesNow < 10) {
        minutesDisplay.textContent = `0${minutesNow}`;
    } else {
        minutesDisplay.textContent = minutesNow;
    }

    checkAlertTime(hoursNow, events)

    amPm.textContent = hoursNow < 12 ? "am" : "pm";

    hoursDisplay.textContent = (hoursNow % 12) || 12;

}, 1000);

function changeImage(hourNow, dayParts) {
    if (hourNow >= dayParts.noon.time && hourNow < dayParts.evening.time) {
        imageDisplay.src = dayParts.noon.imageSrc;
        dayPartsContent.textContent = dayParts.noon.message;
    } else if (hourNow >= dayParts.evening.time && hourNow < dayParts.morning.time) {
        imageDisplay.src = dayParts.evening.imageSrc;
        dayPartsContent.textContent = dayParts.evening.message;
    } else {
        imageDisplay.src = dayParts.morning.imageSrc;
        dayPartsContent.textContent = dayParts.morning.message;
    }
}

function getTime(e) {
    switch (e.target.id) {
        case "wake-up":
            events.wakeUpTime.time = +e.target.value;
            break;
        case "lunch-time":
            events.lunchTime.time = +e.target.value;
            break;
        case "nap-time":
            events.napTime.time = +e.target.value;
    }
}

function checkAlertTime(hours, alertTimes) {
    for (let alert in alertTimes) {
        if (hours === alertTimes[alert].time) {
            imageDisplay.src = alertTimes[alert].imageSrc;
            dayPartsContent.textContent = alertTimes[alert].message;
        }
    }
}

let eventselectors = document.getElementsByTagName("select");
for (let i = 0; i < eventselectors.length; i++) {
    eventselectors[i].addEventListener("change", getTime);
}

let partyTimeButton = document.getElementsByClassName("party-time-button")[0];
let partyTimeTextContainer = document.getElementsByClassName("party-time-text-container")[0];

partyTimeButton.addEventListener("click", (e) => {

    if (events.partyTime.time < 0) {
        events.partyTime.time = new Date().getHours();
        e.currentTarget.textContent = "Party Over!";
        e.currentTarget.style.backgroundColor = "#f0f0f0";
    } else {
        events.partyTime.time = -1;
        e.currentTarget.textContent = "Party Time!";
        e.currentTarget.style.backgroundColor = "#43dde6";
    }
})