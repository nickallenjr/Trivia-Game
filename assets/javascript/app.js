var correct = 0;
var questionCounter = 0;
var wrong = 0; 
var unanswered = 0;
	

$(document).ready(function(){

	
	var intervalId;
	var clockRunning;
	var time;
	var qs = ["Who is the King of The North?", "How many Starks are still alive?", "Which Stark recieved training from the many faced God?", "Who was responsible for the red wedding?", "What are the names of the 3 Lannister siblings?", "What is the name of the eldest child of Mad King Aerys?", "Who was Daenerys once married to?", "Who gives Robert Baratheon the drugged wine that causes his death?", "What is the name of Robert Baratheon youngest brother?"]
	var ans = [["Ned Stark", "Rob Stark", "Sansa Stark", "John Snow"], ["3", "1","5", "4"],["Theon", "Sansa", "Rickon", "Arya"], ["Walder Frey", "Tywin Lannister", "Ramsey Bolton", "Stannis Baratheon"], ["Cersei, Jaime, Tyrion", "Cersei, Lancel, Tywin", "Cersei, Jaime, Tywin", "Cersei, Tyrion, Tommen"], ["Rhaego", "Rhaegar", "Rhaegerys", "Rhaegys"], ["Stannis", "Jaime", "Khal Drogo", "Tyrion"], ["Tyrion", "Tywin", "Jaime", "Cersei"], ["Renly", "Tywin", "Stannis", "Mathais"]]
	var correctAns = ["John Snow", "3", "Arya", "Walder Frey", "Cersei, Jaime, Tyrion", "Rhaegar", "Khal Drogo", "Jaime", "Renly"];

	$("#game1").on("click", function(){
		$(".col-md-3").hide("slow");
		$(".row").append( "<div class='col-md-12'><h1 class='timeRemaining'>Time Remaining: <span id='time'></span></h1></div>" );
		$(".row").append( "<div id='questions' class='col-md-6'><h1 class='questions'>Question</h1></div>" );
		$(".row").append( "<div id='answers' class='col-md-6'><h1 class='answers'>Answers</h1></div>" );
		timer();
		showQuestions();
		
	})

	function showQuestions() {
		clearInterval(intervalId);
		$(".questions").append("<h2 class='h2'></h2>");
		var q = $(".h2").text(qs[questionCounter])
		$(".answers").append("<div class='a'></div>"); 
		for (var i = 0; i < 4; i++) {
			$(".a").append("<div class='answerChoice'>" + ans[questionCounter][i] + "<br><br></div>");
		}
		$(".answerChoice").mouseover(function(){
			$(this).fadeTo("fast", 1);
		});	
		$(".answerChoice").mouseleave(function(){
			$(this).fadeTo("fast", 0.5)
		});	
		timer();
	}

	function getResults(){
		$(".container-fluid").empty();
		$(".container-fluid").append("<div class='results'></div>");
		$(".results").append("<h1>Here's how you did!</h1>");
		$(".results").append("<h1>Correct: " + correct + "</h1>");
		$(".results").append("<h1>Incorrect: " + wrong + "</h1>");
		$(".results").append("<h1>Unaswered: " + unanswered + "</h1>");
		$(".results").append("<a href='#' class='btn btn-danger' role='button'>Play Again</a>")
		$(".btn").on("click", start);	
	}
	

	function nextQuestion() {
		var target = $(this).text();
		clearInterval(intervalId);
		timer();
		if (target == correctAns[questionCounter]) {
			correct++;
			$(".h2").remove();
			$(".a").remove();
			questionCounter++;
			if (questionCounter == ans.length) {
				getResults();
			}else {
				showQuestions();
			}
		}
		else {
			wrong++;
			console.log(wrong);
			$(".h2").remove();
			$(".a").remove();
			questionCounter++;
			if (questionCounter == ans.length) {
				getResults();
			}else {
				showQuestions();
			}
			
		}
	}		
		
	function timer() {
	    time = 15;
	    $("#time").text(time);
	    intervalId = setInterval(function() {
	        time--;
	        $("#time").text(time);
	        if (time === 0) {
	        	unanswered++;
	            clearInterval(intervalId);
	            $(".h2").remove();
				$(".a").remove();
				questionCounter++;
				if (questionCounter === qs.length) {
					clearInterval(intervalId);
					questionCounter++;
					getResults();
				}
				else {
					showQuestions();
				} 
	        }
	    }, 1000);
	}
	
	function start() {
		location.reload();
	}

	$(document.body).on('click', '.answerChoice', nextQuestion);
});