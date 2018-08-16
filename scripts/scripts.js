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
// 3. Quit Button and Play Again button at end

// MVP2 - Store all question html in an array of objects and have them display dynamically

// MVP3 - One question has a textarea where users enter as many arnold movie titles as they can think of (use one key word and separate by comma). SetTimeout for them before runnig a function that end sthe question.Turn that string into an array of strings to compare with my array list.

// MVP4 - "Quit Game" button with audio clip
// ========================

// MVP5 - On click of arnold image, play audio clip "Stop it!"
// ========================

// MVP6 - On click of "Play a Different Game" button, play audio clip "I don't play that game"
// ========================

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

// 1. Create the namespace(name of the app object)
// 2. Store variable in your pp object
// 3. Everythig else, i.e.loops, event listeners, are stored in a function that is then added to your app object. This makes them methods on your app object.
// 4. Create your initialization method, i.e. init(), on the app object.

$(function () {
    // Set user points variable
    let userPoints = 0;


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
    // Array of audio file paths for right answers
    const rightAnswerAudio = [
        "./assets/audio/rightAnswer/good.mp3",
        "./assets/audio/rightAnswer/no-problemo.mp3",
        "./assets/audio/rightAnswer/thatsAmazingReally.mp3",
        "./assets/audio/rightAnswer/yeah.mp3"
    ]
    // Array of audio file paths for wrong answers
    const wrongAnswerAudio = [
        "./assets/audio/wrongAnswer/deep-trouble.wav",
        "./assets/audio/wrongAnswer/don'tBeRidiculous.mp3",
        "./assets/audio/wrongAnswer/imSmartUnlikeSomeoneWeKnow.mp3",
        "./assets/audio/wrongAnswer/no1.wav",
        "./assets/audio/wrongAnswer/no2.wav",
        "./assets/audio/wrongAnswer/noDeal.mp3",
        "./assets/audio/wrongAnswer/noItsNotTrue.mp3",
        "./assets/audio/wrongAnswer/whatsTheMatter.mp3",
        "./assets/audio/wrongAnswer/whatTheHellWereYouThinking.mp3",
        "./assets/audio/wrongAnswer/wrong.mp3"
    ]

    const quitGameAudio = [
        "./assets/audio/quitGame/iveGotNewsForYouYourMineNow.mp3",
        "./assets/audio/quitGame/stopIt.mp3",
        "./assets/audio/quitGame/stopWhining.mp3"
    ]

    // Random Array Value
    const randomArrayValue = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Questions Form Submit
    $('.button').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('start-game-button')) {
            $('.video-questions').fadeIn().removeClass('hide').attr('autoplay', true); // .get(0).play();

            let $currentSection = $(this).parents('.scroll-section');
            console.log($currentSection);
            // Store the next question's section element in a variable
            let $nextSection = $('#question1');
            console.log($nextSection);
            $('html, body').stop(true).animate({
                scrollTop: $nextSection.offset().top
            }, 1500);

            setTimeout(function () {
                $('.video-questions').addClass('hide').fadeOut();  // .pause().attr('currentTime', 0);
            }, 5100)

        } else {  //if (!$(this).hasClass('start-game-button')) 
            // This variable holds the correct answer value selected by the user
            // const $userAnswer1 = $('input[name="commando"]:checked').val();
            const $userAnswer = $(this).parents('form').find('input:checked').val();
            console.log($userAnswer);
            // This variable holds the value of the input for the correct answer.
            const $correctAnswer1 = $('input[id="commando"]').val();
            // If the user's answer is correct, display/add the "right" image to the page and play the audio
            // if ($userAnswer1 === $correctAnswer1) {
            if ($.inArray($userAnswer, correctAnswers) > -1) {
                // Add one point to total
                userPoints = userPoints + 1;
                // Play audio for right answer
                const randomRightAudio = randomArrayValue(rightAnswerAudio);
                $('.arnold-response-audio').attr('src', randomRightAudio)[0].play();
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
                const randomWrongAudio = randomArrayValue(wrongAnswerAudio);
                $('.arnold-response-audio').attr('src', randomWrongAudio)[0].play();
                // Store arnold image in variable
                const $wrongImage = $('<img>').attr('src', './assets/arnold-face/wrong-answer1.jpg');
                // Add image to page
                $('.arnold-response-image').html($wrongImage);
            }
            console.log(userPoints);
            // Store the first question's section element in a variable
            let $currentSection = $(this).parents('.scroll-section');
            console.log($currentSection);
            // Store the next question's section element in a variable
            let $nextSection = $currentSection.next('.scroll-section');
            console.log($nextSection);
            // After some time (allowing audio to play), check if another queston exists. If it does, the next section element is stored in the $currentSection variable. The stop(true) stops any animation I might have running but for now it doesn't apply. animate() includes scollTop
            setTimeout(function () {
                if ($nextSection.length) {
                    // $currentSection = $nextSection;
                    $('html, body').stop(true).animate({
                        scrollTop: $nextSection.offset().top
                    }, 1500);
                } else {
                    return false;
                }
                $('input').prop("checked", false);
            }, 1000);
            console.log(userPoints);
        }
    });
    // ========================

    // ========================
    // Soundboard Buttons
    $('.choppa-button').on('click', function (e) {
        e.preventDefault();
        $('.arnold-response-audio').attr('src', './assets/audio/quotes/choppa.mp3')[0].play();
    });

    $('.zero-button').on('click', function (e) {
        e.preventDefault();
        $('.arnold-response-audio').attr('src', './assets/audio/quotes/sub-zero.mp3')[0].play();
    });
    // ========================

    // ========================
    // Game Results
    // ==Display Buttons==
    const displayResultsButtons = () => {
        const $playAgain = $('<a>').attr({
            class: "button-play-again",
            href: "#question1"
        }).text("Play Again!");

        const $giveUp = $('<a>').attr({
            class: "button-give-up",
            href: "#"
        }).text("Give Up");

        $('.play-again-buttons-container').append($playAgain, $giveUp);
    };

    $('.results-button').on('click', function (e) {
        e.preventDefault();
        // Results - Put text and maybe image on page. Play final audio
        if (userPoints >= 9) {
            $('.results-header').text(`Well done! You terminated this game by answering ${userPoints} questions correctly.`);
            $('.arnold-response-audio').attr('src', './assets/audio/game-results/illBeBack.mp3')[0].play();
        } else if (userPoints < 9 && userPoints >= 5) {
            $('.results-header').text(`Not bad! You answered ${userPoints} questions correctly. Watch five more 80s action movie montages and try again.`);
            $('.arnold-response-audio').attr('src', './assets/audio/game-results/illBeBack.mp3')[0].play();
        } else {
            $('.results-header').text(`You're a puny weakling by only answering ${userPoints} correctly! Keep training and try again.`);
            $('.arnold-response-audio').attr('src', './assets/audio/game-results/lack-discipline.wav')[0].play();
        }
        displayResultsButtons();
    });
    // ==Results Buttons Functionality==
    $('.play-again-buttons-container').on('click', '.button-give-up', function (e) {
        e.preventDefault();
        const randomQuitAudio = randomArrayValue(quitGameAudio);
        $('.arnold-response-audio').attr('src', randomQuitAudio)[0].play();
    });

    $('.play-again-buttons-container').on('click', '.button-play-again', function (e) {
        // e.preventDefault();
        userPoints = 0;
        console.log(userPoints);
    });

});

