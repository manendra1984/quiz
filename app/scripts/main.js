(function() {
    var questions = [{
      question: "What is 2*5?",
      choices: [2, 5, 10, 15, 20],
      correctAnswer: 2
    }, {
      question: "What is 3*6?",
      choices: [3, 6, 9, 12, 18],
      correctAnswer: 4
    }, {
      question: "What is 8*9?",
      choices: [72, 99, 108, 134, 156],
      correctAnswer: 0
    }, {
      question: "What is 1*7?",
      choices: [4, 5, 6, 7, 8],
      correctAnswer: 3
    }, {
      question: "What is 8*8?",
      choices: [20, 30, 40, 50, 64],
      correctAnswer: 4
    }];
    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    //var quiz = document.getElementById(quiz);
    // Display initial question
    displayNext();
    
    
    // Click handler for the 'next' button

    document.getElementById('next').addEventListener('click', function(e) {
        e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
      });
    
     // Click handler for the 'prev' button

      document.getElementById('prev').addEventListener('click', function(e) {
        e.preventDefault();
      
        if(quiz.is(':animated')) {
          return false;
        }
        choose();
        questionCounter--;
        displayNext();
      });
   
  
    // Click handler for the 'Start Over' button

    document.getElementById('start').addEventListener('click', function(e) {
        e.preventDefault();
      
        if(quiz.is(':animated')) {
          return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
      });
   
   
  
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
     
      var qElement= document.createElement('div');
         qElement.id="question";
      
         var pel= document.createElement('p');
        pel.innerHTML = questions[index].question;
   
         qElement.appendChild(pel);

       
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
     
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = document.createElement('ul');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = document.createElement('li');
       // input = '<input type="radio" name="answer" value=' + i + ' />';
        input = document.createElement('input');
       // input.type="radio";
        input.setAttribute("type", "radio");
        input.name="answer";
        input.value = i;
      
       var textnode = document.createTextNode(questions[index].choices[i]); 
        console.log(input);
        item.appendChild(input);
        item.appendChild(textnode);
        radioList.appendChild(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!');
      return score;
    }
  })();