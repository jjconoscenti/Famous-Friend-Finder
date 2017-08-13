$(document).ready(function() {
    $('select').material_select();
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
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

})