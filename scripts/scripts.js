// HOME PAGE
// ========================
// 1. On page load, play Terminator theme song.
// 2. Listen for button click "Press Start to Play"
// 3. Play hammer sounds when button is clicked.
// 4. After hammer sounds, play video of "I'd like to ask you a bunch of questions..."
// 5. Scroll to first question or navigate to questions page, whichever is easier.


// QUESTIONS
// ========================
// 1. Listen for user click
// 2. Store value of selection in a var
// 3. Check to see whether the value is correct or incorrect
// 4a. Play audio for wrong/correct an
// 4b. Add point if correct answer, else don't
// 4c. Set arnold pic to smilling for correct answer or angry for inco
// 5. Go to next question after audio clip. (Might need setTimeout if not poss

// SCOREBOARD
// ========================
// Use sticky firebase scoreboard in the bottom right corner of the page.

// LAST QUESTION
// ========================
// 1. Play audio clip during scroll to last question.

// FINISH
// ========================
// 1. "Click to Finish" button appears next to the submit button after the last question is submitted.
// 2. Listen for click event.
// 3a. Play video if score is above 70%, or another if below 70%.
// 3b. 
// Low Points: You're a puny weakling. Hit the gym and pump up your Arnie knowledge
// Mid Points: Not Bad. 
// High Points: Excellent! You're ready to directan 80s testosterone flick.

// 4. "Play Again?" button displays on its own page
// 5. Listen for button click
// 6. Navigate to Home page

// ???
// 1. Playing audio and video
// 2. Storing points in a variable?

// MVP2 - Store all question html in an array of objects and have them display dynamically

// MVP3 - One question has a textarea where users enter as many arnold movie titles as they can think of (use one key word and separate by comma). SetTimeout for them before runnig a function that end sthe question.Turn that string into an array of strings to compare with my array list.

// MVP4 - "Quit Game" button with audio clip
// ========================

// MVP5 - On click of arnold image, play audio clip "Stop it!"
// ========================

// MVP6 - On click of "Play a Different Game" button, play audio clip "I don't play that game"
// ========================


$(function () {
    // Set user points variable
    let userPoints = 0;

    // An array of object, each holding a question and its answers
    // const questions = [
    //     {
    //         question1: "In 1985, I played a retired Special Forces soldier who rescues Alyssa Milano from a puny weakling who wears a chainmail vest.",
    //         answer1:,
    //         answer2:,
    //         answer3:,
    //         answer4:
    //     },
    //     {
    //         question2:,
    //         answer1:,
    //         answer2:,
    //         answer3:,
    //         answer4:
    //     },
    //     {
    //         question3:,
    //         answer1:,
    //         answer2:,
    //         answer3:,
    //         answer4:
    //     },
    // ]

    // Array of correct answers
    const correctAnswers = [
        "commando",
        "ugly",
        "wolfcastle",
        "cloboomot",
        "tumour",
        "predator",
        "cabeza",
        "could",
        "cares",
        "running"
    ]










    // Question #1
    $('.commando-form').on('submit', function (e) {
        e.preventDefault();
        // This variable holds the correct answer value selected by the user
        const $userAnswer1 = $('input[name="commando"]:checked').val();
        // This variable holds the value of the input for the correct answer.
        const $correctAnswer1 = $('input[id="commando"]').val();
        // If the user's answer is correct, display/add the "right" image to the page and play the audio
        // if ($userAnswer1 === $correctAnswer1) {
        if ($.inArray($userAnswer1, correctAnswers) > -1) {
            // Add one point to total
            userPoints = userPoints + 1;
            // Play audio for right answer
            $('.arnold-response-audio').attr('src', './assets/audio/rightAnswer/good.mp3')[0].play();
            // Store audio element in a variable
            // const $correctAudio = $('<audio>').attr('src', './assets/audio/rightAnswer/good.mp3');

            // Add audio element to page
            // $('.arnold-response1-audio').html(`<audio src="./assets/audio/rightAnswer/good.mp3" class="apples"></audio>`)[0].play();

            // Store arnold image in variable
            const $correctImage = $('<img>').attr('src', './assets/arnold-face/right-answer1.jpg');
            // Add image to page
            $('.arnold-response-image').html($correctImage);
            // If the user's answer is incorrect, display/add the "wrong" image to the page and play the audio.
        } else {
            // Play audio for wrong answer
            $('.arnold-response-audio').attr('src', './assets/audio/wrongAnswer/noDeal.mp3')[0].play();
            // Store arnold image in variable
            const $wrongImage = $('<img>').attr('src', './assets/arnold-face/wrong-answer1.jpg');
            // Add image to page
            $('.arnold-response-image').html($wrongImage);
        }
        // Store the first question's section element in a variable
        let $currentSection = $(".question-container").first();
        // Store the next question's section element in a variable
        let $nextSection = $currentSection.next('.question-container');
        // After some time (allowing audio to play), check if another queston exists. If it does, the next section element is stored in the $currentSection variable. The stop(true) stops any animation I might have running but for now it doesn't apply. animate() includes scollTop
        setTimeout(function () {
            if ($nextSection.length) {
                $currentSection = $nextSection;
                $('html, body').stop(true).animate({
                    scrollTop: $nextSection.offset().top
                }, 1500);
            } else {
                return false;
            }
            $('input').prop("checked", false);
        }, 1000);

    });

    // Soundboard Buttons
    $('.choppa-button').on('click', function (e) {
        e.preventDefault();
        $('.choppa-audio')[0].play();
    });

    $('.zero-button').on('click', function (e) {
        e.preventDefault();
        $('.zero-audio')[0].play();
    });


});

