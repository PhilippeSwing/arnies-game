const arnieApp = {};

// Set user points variable
arnieApp.userPoints = 0;

// Array of correct answers
arnieApp.correctAnswers = [
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
arnieApp.rightAnswerAudio = [
    "./assets/audio/rightAnswer/good.mp3",
    "./assets/audio/rightAnswer/no-problemo.mp3",
    "./assets/audio/rightAnswer/thatsAmazingReally.mp3",
    "./assets/audio/rightAnswer/yeah.mp3"
]

// Array of audio file paths for wrong answers
arnieApp.wrongAnswerAudio = [
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

// Array of audio file pths when clicking to "give up"
arnieApp.quitGameAudio = [
    "./assets/audio/quitGame/iveGotNewsForYouYourMineNow.mp3",
    "./assets/audio/quitGame/stopIt.mp3",
    "./assets/audio/quitGame/stopWhining.mp3"
]

arnieApp.pageLoad = function () {
    const finalCountdownAudio = $(`<audio src="./assets/audio/pageLoad/countdown-edit.mp3" class="final-countdown-audio"></audio>`);
    $('.final-countdown-audio-container').append(finalCountdownAudio);
    $('.final-countdown-audio').get(0).play();
    // Explosion on page load
    setTimeout(function () {
        $('.explosion-audio')[0].play();
    }, 15000);

    // setTimeout(function () {
    //     $('.header-content-container, .header-image').effect('shake', 500);
    // }, 15200);
};

// Random Array Value
arnieApp.randomArrayValue = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

// Start Game and Question Submit Buttons
arnieApp.mainButtonSubmit = function () {
    $('.button').on('click', function (e) {
        e.preventDefault();
        // START GAME BUTTON CLICK
        // Cutoff page load audio and play intro video
        if ($(this).hasClass('start-game-button')) {
            // **COMMENTED OPENING AUDIO VIDEO DUE TO CHROME'S NEW AUTOPLAY POLICY**
            // Remove explosion sound and Final Countdown if the user clicks to start before they happen
            // $('.final-countdown-audio').animate({ volume: 0 }, 1500);
            // $('.explosion-audio').animate({ volume: 0 }, 1500);
            setTimeout(function () {
                // const arnieVideo = $(`<video class="video-header hide" width="100%" src="./assets/videos/bunch-of-questions.mp4" fullscreen>
                //     Your browser does not support the video element.
                // </video>`);
                // $('.arnie-video-container').append(arnieVideo);
                $('.video-header').fadeIn(900).removeClass('hide').get(0).play();
                $('.header-image').css('display', 'none').fadeOut(900);
            }, 500)
            // After the video is done plying, display the sticky Arnold image and scroll to the first question
            setTimeout(function () {
                $('.header-image').fadeIn(900).css({
                    display: 'inline',
                    transform: 'translateX(0)'
                });
                $('.video-header').addClass('hide').fadeOut(1500);

                let $currentSection = $(this).parents('.scroll-section');
                // Store the next question's section element in a variable
                let $nextSection = $('#question1');
                $('html, body').stop(true).animate({
                    scrollTop: $nextSection.offset().top
                }, 1500);
            }, 5100)
            // Display sticky small header at top of page when scrolling to the first question
            setTimeout(function () {
                // Add small sticky site header
                const gameHeaderSmall = $('<h2>').text(`Arnie's Game`).addClass('game-header-small');
                $('.game-header-small-container').slideDown().append(gameHeaderSmall);
            }, 6000);
            // ========================

            // ========================
            // QUESTIONS FORM SUBMIT
        } else {
            // This variable holds the correct answer value selected by the user
            const $userAnswer = $(this).parents('.question-form').find('input:checked').val();
            // If the value of the user's selection equals one of the values in the correctAnswers array, add a point and play a random audio clip from the rightAnswerAudio array.
            if ($.inArray($userAnswer, arnieApp.correctAnswers) > -1) {
                // Add one point to total
                arnieApp.userPoints = arnieApp.userPoints + 1;
                // Play audio for right answer
                const randomRightAudio = arnieApp.randomArrayValue(arnieApp.rightAnswerAudio);
                $('.arnold-response-audio').attr('src', randomRightAudio).animate({ volume: 1 })[0].play();
                // If the value of the user's selection does not equal one of the values in the correctAnswers array, do not add a point and play a random audio clip from the wrongAnswerAudio array.
            } else {
                // Play audio for wrong answer
                const randomWrongAudio = arnieApp.randomArrayValue(arnieApp.wrongAnswerAudio);
                $('.arnold-response-audio').attr('src', randomWrongAudio).animate({ volume: 1 })[0].play();
            }
            // Store the first question's section element in a variable
            let $currentSection = $(this).parents('.scroll-section');
            // Store the next question's section element in a variable
            let $nextSection = $currentSection.next('.scroll-section');
            // After some time (allowing audio to play), check if another question exists. If it does, the next section element is stored in the $currentSection variable. The stop(true) stops any animation I might have running but for now it doesn't apply. Empty the checkbox input and scroll to the next question.
            setTimeout(function () {
                if ($nextSection.length) {
                    $('html, body').stop(true).animate({
                        scrollTop: $nextSection.offset().top
                    }, 1500);
                } else {
                    return false;
                }
                // Remove check from checkbox
                $('input').prop("checked", false);
            }, 1000);
        }
    });
};

// Choppa Soundboard Button
arnieApp.choppaAudioButton = function () {
    $('.choppa-button').on('click', function (e) {
        e.preventDefault();
        $('.arnold-response-audio').attr('src', './assets/audio/quotes/choppa.mp3')[0].play();
    });
};

// Running Man Soundboard Button
arnieApp.runningManAudioButton = function () {
    $('.zero-button').on('click', function (e) {
        e.preventDefault();
        $('.arnold-response-audio').attr('src', './assets/audio/quotes/butIHopeYouLeaveEnoughRoomForMyFist.mp3')[0].play();
    });
};

// Game Results: HTML for the Play Again button
arnieApp.playAgain = $('<a>').attr({
    class: "button-play-again button-prim",
    href: "#question1"
}).text("Play Again!");

// Game Results: HTML for the Give Up button
arnieApp.giveUp = $('<a>').attr({
    class: "button-give-up button-prim",
    href: "#"
}).text("Give Up");

// Game Results: Function to append Results Buttons to HTML
arnieApp.displayResultsButtons = () => {
    $('.play-again-buttons-container').append(arnieApp.playAgain, arnieApp.giveUp);
};

// On button click, display results buttons and text with associated audio
arnieApp.displayResults = function () {
    $('.results-button').on('click', function (e) {
        e.preventDefault();
        $('.play-again-buttons-container').empty();
        if (arnieApp.userPoints >= 9) {
            $('.results-text').text(`"Well done! You terminated this game by answering ${arnieApp.userPoints} questions correctly."`);
            $('.arnold-response-audio').attr('src', './assets/audio/game-results/illBeBack.mp3')[0].play();
        } else if (arnieApp.userPoints < 9 && arnieApp.userPoints >= 5) {
            $('.results-text').text(`Not bad! You answered ${arnieApp.userPoints} questions correctly. Watch five more 80s action movie montages and try again.`);
            $('.arnold-response-audio').attr('src', './assets/audio/game-results/illBeBack.mp3')[0].play();
        } else if (arnieApp.userPoints === 1) {
            $('.results-text').text(`You're a puny weakling with ${arnieApp.userPoints} correct answer! Keep training and try again.`);
            $('.arnold-response-audio').attr('src', './assets/audio/game-results/lack-discipline.wav')[0].play();
        } else {
            $('.results-text').text(`"You're a puny weakling with ${arnieApp.userPoints} correct answers! Keep training and try again."`);
            $('.arnold-response-audio').attr('src', './assets/audio/game-results/lack-discipline.wav')[0].play();
        }
        arnieApp.displayResultsButtons();
    });
};

// Results Buttons Functionality: Play audio when clicking button to give up
arnieApp.giveUpButton = function () {
    $('.play-again-buttons-container').on('click', '.button-give-up', function (e) {
        e.preventDefault();
        const randomQuitAudio = arnieApp.randomArrayValue(arnieApp.quitGameAudio);
        $('.arnold-response-audio').attr('src', randomQuitAudio)[0].play();
    });
};

// Results Buttons Functionality: Reset the game when clicking to play again
arnieApp.playAgainButton = function () {
    $('.play-again-buttons-container').on('click', '.button-play-again', function (e) {
        arnieApp.userPoints = 0;
        $('.results-text').text("");
        $('.button-give-up').detach();
        $('.button-play-again').detach();
        $('.button-poker').detach();
    });
};

arnieApp.init = function () {
    // **COMMENTED OPENING AUDIO DUE TO CHROME'S NEW AUTOPLAY POLICY**
    // arnieApp.pageLoad();
    arnieApp.mainButtonSubmit();
    arnieApp.choppaAudioButton();
    arnieApp.runningManAudioButton();
    arnieApp.displayResults();
    arnieApp.giveUpButton();
    arnieApp.playAgainButton();
};

$(function () {
    // Alert about Chrome issue
    // if (navigator.userAgent.search("Chrome") >= 0) {
    //     alert(`Due to Chrome's new video and audio policy as of April 2018, this site is best viewed in other browsers.`)
    // Scroll to top on page load
    //     $(this).scrollTop(0);
    //     arnieApp.init();
    // } else {
    // Scroll to top on page load
    $(this).scrollTop(0);
    arnieApp.init();
    // }
});

