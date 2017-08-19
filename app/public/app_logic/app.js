$(document).ready(function() {
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
    $('select').material_select();
    $('.modal').modal();

    // Array to store user results
    var userEntry = [];

    // Array for best matching friend
    var bestMatch = [];

    // Array to store API results
    var apiResults = [];

    $('#submitButton').on('click', function(e) {
        e.preventDefault();
        console.log("submit");
        var newUserEntry = {
            name: $('#first_name').val().trim(),
            twitter: $('#twitter_handle').val().trim(),
            instagram: $('#instagram_handle').val().trim(),
            photo: $('#photo').val().trim(),
            answers: [$('#q1').val().trim(), $('#q2').val().trim(), $('#q3').val().trim(), $('#q4').val().trim(), $('#q5').val().trim(), $('#q6').val().trim(), $('#q7').val().trim(), $('#q6').val().trim(), $('#q9').val().trim(), $('#q10').val().trim()]
        }

        // update newUserEntry array with user's results
        newUserEntry.answers.forEach(function(result) {
            var entry = parseInt(result);
            userEntry.push(entry);
            console.log(newUserEntry);
        })

        if ($('#first_name').val() !== '' && $('#twitter_handle').val() !== '' && $('#instagram_handle').val() !== '' && $('#photo').val() !== '' && $('#q1').val() !== '' && $('#q2').val() !== '' && !$('#q3').val() !== '' && $('#q4').val() !== '' && $('#q5').val() !== '' && $('#q6').val() !== '' && $('#q7').val() !== '' && $('#q8').val() !== '' && $('#q9').val() !== '' && $('#q10').val() !== '') {
            $.post("/api/friends", newUserEntry,
                function(data) {
                    if (data) {
                        $('#modal1').modal('open');
                        // append data attributes to modal elements
                        $('#modal1 #first_name').html(data.name);
                        $('#modal1 #twitter_handle').html(data.twitter);
                        $('#modal1 #instagram_handle').html(data.instagram);

                    } else {
                        console.log('An error occured!')
                    }
                    resetSurvey();
                });
        } else {
            console.log('Error occurred!');
        }
    });
    // .done(function(data) {})

    // $.ajax({
    //     url: '/api/friends',
    //     method: 'GET'
    // }).done(function(data) {
    // data.forEach(function(result) {
    // apiResults.push(result);




    // });
    // });
});

function resetSurvey() {
    $('#friendFinderForm')[0].reset();
}
Array.min = function(array) {
    return Math.min.apply(Math, array);
};