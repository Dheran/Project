let data = {
  playerName: "",
  playerScore: 0,
};
let correctSound = new Audio("../Audio/correct.mp3");
let wrongSound = new Audio("../Audio/wrong.mp3");
let currentQuestion = 1;

function showNextQuestion() {
  $("#q" + currentQuestion).addClass("d-none");
  currentQuestion++;
  $("#q" + currentQuestion).removeClass("d-none");
}

function flash(color) {
  $("body").css("background-image", "none");
  $("body").css("background-color", color);
  setTimeout(function () {
    $("body").css("background-color", "");
    $("body").css("background-image", 'url("../Icons/background.png")');
  }, 300);
}

function checkOption(questionNumber) {
  let selectedOption = $(
    'input[name="' + questionNumber + 'Choices"]:checked'
  ).val();
  if (selectedOption) {
    if (selectedOption == "true") {
      data.playerScore++;
      $("#score").html(data.playerScore);
      correctSound.play();
      flash("green");
      showNextQuestion();
    } else {
      wrongSound.play();
      flash("red");
      showNextQuestion();
    }
  } else {
    alert("Choose your answer");
  }
}

$(document).ready(function () {
  $("#playQuiz").click(function () {
    if ($("#name").val() != "") {
      data.playerName = $("#name").val();
      $("#getName").addClass("d-none");
      $("#quizContent").removeClass("d-none");
    } else {
      alert("Enter your name");
    }
  });

  for (let i = 1; i <= 10; i++) {
    $("#q" + i + "Button").click(function () {
      checkOption("q" + i);
    });
  }

  $("#homeButton").click(function () {
    $.post("../Server/post_score.php", data, function (response) {
      console.log(response);
    });
    window.location.href = "../Pages/index.html";
  });
});
