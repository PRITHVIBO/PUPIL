/* =========================================================
   Pupil - Open Source Computer Science Curriculum
   One script shared by every page
   ========================================================= */

/* ---------------- Runs on every page ---------------- */
window.onload = function () {
  // Footer year (the footer is the same on all pages)
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.innerHTML = new Date().getFullYear();
  }

  // Course pages start with an empty progress bar
  updateProgressText();
};

/* =========================================================
   HOME PAGE
   ========================================================= */

function showGreeting() {
  var name = prompt("What is your name?");
  var box = document.getElementById("greeting");
  if (!box) return;

  if (name === null || name.trim() === "") {
    box.innerHTML = "Welcome to Pupil. Pick a track and start where you are.";
  } else {
    box.innerHTML = "Hello " + name + ", welcome to Pupil. Pick a track and start today.";
  }
  box.className = "success";
}

var count = 0;

function increaseCounter() {
  count = count + 1;
  var box = document.getElementById("counter");
  if (box) {
    box.innerHTML = count;
  }
}

/* =========================================================
   COURSES PAGE - search filter
   ========================================================= */

function filterCourses() {
  var box = document.getElementById("search");
  if (!box) return;

  var text  = box.value.toLowerCase().trim();
  var cards = document.getElementsByClassName("card");
  var shown = 0;

  for (var i = 0; i < cards.length; i++) {
    // search the title and the description together
    var content = cards[i].innerText.toLowerCase();

    if (content.indexOf(text) > -1) {
      cards[i].style.display = "flex";
      shown = shown + 1;
    } else {
      cards[i].style.display = "none";
    }
  }

  var info = document.getElementById("searchInfo");
  if (!info) return;

  if (text === "") {
    info.innerHTML = "";
    info.className = "";
  } else if (shown === 0) {
    info.innerHTML = "No track matched \"" + text + "\". Try: web, python, docker, aws, dsa, design.";
    info.className = "error";
  } else {
    info.innerHTML = shown + " track(s) matched \"" + text + "\".";
    info.className = "success";
  }
}

/* =========================================================
   COURSE PAGES - module progress tracker
   ========================================================= */

function completeModule() {
  var bar = document.getElementById("progressBar");
  if (!bar) return;

  if (bar.value < bar.max) {
    bar.value = bar.value + 1;
    updateProgressText();
  } else {
    alert("All 6 modules of this track are already marked as done. Well done!");
  }
}

function resetProgress() {
  var bar = document.getElementById("progressBar");
  if (!bar) return;

  bar.value = 0;
  updateProgressText();
}

function updateProgressText() {
  var bar = document.getElementById("progressBar");
  if (!bar) return;

  var text = document.getElementById("progressText");
  if (text) {
    text.innerHTML = bar.value + " of " + bar.max;
  }

  // the confidence meter follows the same value
  var meter = document.getElementById("confidence");
  if (meter) {
    meter.value = bar.value;
  }
}

/* =========================================================
   QUIZ PAGE
   ========================================================= */

// question -> [correct option, track name, page to revise from]
var QUIZ_KEY = {
  q1: ["b", "Web Development",              "webdev.html"],
  q2: ["b", "AI / Machine Learning",        "aiml.html"],
  q3: ["c", "DevOps",                       "devops.html"],
  q4: ["c", "Cloud Computing",              "cloud.html"],
  q5: ["b", "Data Structures & Algorithms", "dsa.html"],
  q6: ["b", "System Design",                "systemdesign.html"]
};

function checkQuiz() {
  var result = document.getElementById("quizResult");
  var review = document.getElementById("quizReview");
  var score  = 0;
  var wrong  = [];
  var answered = 0;

  for (var q in QUIZ_KEY) {
    var picked = document.querySelector('input[name="' + q + '"]:checked');

    if (picked) {
      answered = answered + 1;
      if (picked.value === QUIZ_KEY[q][0]) {
        score = score + 1;
      } else {
        wrong.push(QUIZ_KEY[q]);
      }
    }
  }

  // all six must be answered
  if (answered < 6) {
    result.innerHTML = "Please answer all 6 questions. You have answered " + answered + ".";
    result.className = "error";
    review.innerHTML = "";
    return false;
  }

  var message = "You scored " + score + " out of 6.";

  if (score === 6) {
    message = message + " Excellent - you are ready for the placement round.";
  } else if (score >= 4) {
    message = message + " Good. Revise the tracks listed below.";
  } else {
    message = message + " Start again from the basics of the tracks listed below.";
  }

  result.innerHTML = message;
  result.className = "success";

  // show which track to revise
  if (wrong.length === 0) {
    review.innerHTML = "<div class='review-box'><p>All answers correct. " +
                       "Move on to the <a href='systemdesign.html'>System Design</a> track.</p></div>";
  } else {
    var html = "<div class='review-box'><h4>Revise these tracks</h4><ul>";
    for (var i = 0; i < wrong.length; i++) {
      html = html + "<li><a href='" + wrong[i][2] + "'>" + wrong[i][1] + "</a></li>";
    }
    html = html + "</ul></div>";
    review.innerHTML = html;
  }

  // a chosen focus track is shown as a suggestion
  var focus = document.getElementById("focus");
  if (focus && focus.value !== "") {
    review.innerHTML = review.innerHTML +
      "<p>Your selected focus track: <a href='" + focus.value + ".html'>" +
      focus.options[focus.selectedIndex].text + "</a></p>";
  }

  // return false so the page does not reload
  return false;
}

function clearResult() {
  var result = document.getElementById("quizResult");
  var review = document.getElementById("quizReview");

  if (result) { result.innerHTML = ""; result.className = ""; }
  if (review) { review.innerHTML = ""; }
}

/* =========================================================
   CONTACT PAGE - form validation
   ========================================================= */

function validateForm() {
  var name    = document.getElementById("name").value.trim();
  var email   = document.getElementById("email").value.trim();
  var phone   = document.getElementById("phone").value.trim();
  var course  = document.getElementById("course").value;
  var message = document.getElementById("message").value.trim();
  var msgBox  = document.getElementById("formMsg");

  if (name.length < 3) {
    return showFormError(msgBox, "Name must be at least 3 letters long.");
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    return showFormError(msgBox, "Please enter a valid email address.");
  }

  if (phone !== "" && (phone.length !== 10 || isNaN(phone))) {
    return showFormError(msgBox, "Phone number must be exactly 10 digits.");
  }

  if (course === "") {
    return showFormError(msgBox, "Please select the track you want to join.");
  }

  if (message.length < 10) {
    return showFormError(msgBox, "Your message is too short. Write at least 10 characters.");
  }

  msgBox.innerHTML = "Thank you " + name + ". Your message has been received. " +
                     "A coordinator will reply to " + email + " within 24 hours.";
  msgBox.className = "success";
  document.getElementById("contactForm").reset();

  // return false so the page does not reload
  return false;
}

function showFormError(box, text) {
  box.innerHTML = text;
  box.className = "error";
  return false;
}

function clearFormMsg() {
  var box = document.getElementById("formMsg");
  if (box) {
    box.innerHTML = "";
    box.className = "";
  }
}
