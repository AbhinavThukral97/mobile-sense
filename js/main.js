$(document).ready(function(){

var transcript = "";

try {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
  alert("Error: Check browser support for Speech Recognition");
}

recognition.onstart = function() {
	$("button.listen").addClass("running");
};

recognition.onspeechend = function() {
	$("button.listen").removeClass("running");
};

recognition.onerror = function(event) {
	$("button.listen").removeClass("running");
  if (event.error == "no-speech") {
  	console.log('No Speech Error');
  }
};

recognition.onresult = function(event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  var currentStory = $('p.transcript').text();
  $("p.transcript").text(currentStory + " " + transcript);
  $("button.listen").removeClass("running");
};

$('button.listen').click(function(){
	recognition.start();
});

});