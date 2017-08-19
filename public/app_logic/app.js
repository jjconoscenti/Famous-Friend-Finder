$(document).ready(function() {
    $('select').material_select();
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
    $('.modal').modal();
});

// Require color NPM package to read console more easily
var colors = require('colors');

// Array to store user results
var userEntry = [];

// Array for best matching friend
var bestMatch = [];

// Array to store API results
var apiResults = [];

$('#submit-btn').on('click', function(e) {
    e.preventDefault();
    var newUserEntry = {
            name: $('#first_name').val().trim(),
            twitter: $('#twitter_handle').val().trim,
            instagram: $('#instagram_handle').val().trim,
            photo: $('#photo').val().trim(),
            answers: [$('#q1').val().trim(), $('#q2').val().trim(), $('#q3').val().trim(), $('#q4').val().trim(), $('#q5').val().trim(), $('#q6').val().trim(), $('#q7').val().trim(), $('#q6').val().trim(), $('#q9').val().trim(), $('#q10').val().trim()]
        }
        // update newUserEntry array with user's results
    newUserEntry.answers.forEach(function(result) {
        var entry = parseInt(result);
        userEntry.push(entry);
        console.log(colors.green(newUserEntry));
    })
});

$.ajax({
    url: '/api/friends',
    method: 'GET'
}).done(function(data) {
    data.forEach(function(result) {
        apiResults.push(result);
    });
    var allUserDifferences;
    var allFriendsDifferences = [];
    apiResults.forEach(function(friend) {
        var friendScores = friend.scores;
        allUserDifferences = [];
        allFriendsDifferences.push(allUserDifferences);
        for (var i = 0; i < 10; i++) {
            allUserDifferences = Math.abs(friendScores[i] - userEntry[i]);
        }
    });
    var totalFriendDif = [];
    allFriendsDifferences.forEach(function(difference) {
        var totalDifference = 0;
        for (var i = 0; i < 10; i++) {
            totalDifference += difference[i];
        }
        totalFriendDif.push(totalDifference);
    });
    console.log(colors.yellow(allFriendsDifferences));
    console.log(colors.yellow(totalFriendDif));
    var minDif = Array.min(totalFriendDif);
    for (var i = 0; i < totalFriendDif.length; i++) {
        if (minDif === totalFriendDif[i]) {
            $(`#match`).html(apiResults[i].name);
        }
    }
    if ($('#first_name').val() !== '' && $('#twitter_handle').val() !== '' && $('#instagram_handle').val() !== '' && $('#photo').val() !== '' && $('#q1').val() !== '' && $('#q2').val() !== '' && !$('#q3').val() !== '' && $('#q4').val() !== '' && $('#q5').val() !== '' && $('#q6').val() !== '' && $('#q7').val() !== '' && $('#q8').val() !== '' && $('#q9').val() !== '' && $('#q10').val() !== '') {
        $.post("/api/friends", newUserEntry,
            function(data) {
                if (data) {
                    $('#modal1').modal('open');
                }
                resetSurvey();
            });
    } else {
        console.log(colors.red('Error occurred!'));
    }
});

function resetSurvey() {
    $('#friendFinderForm')[0].reset();
}
Array.min = function(array) {
    return Math.min.apply(Math, array);
};