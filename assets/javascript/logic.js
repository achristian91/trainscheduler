$( document ).ready(function() {
    // initialize firebase
    
    
      var config = {
        apiKey: "AIzaSyD7Dl89jl1YzPa5AXbCjHAUvmdoXUdoKJY",
        authDomain: "trainscheduler-13fd1.firebaseapp.com",
        databaseURL: "https://trainscheduler-13fd1.firebaseio.com",
        projectId: "trainscheduler-13fd1",
        storageBucket: "trainscheduler-13fd1.appspot.com",
        messagingSenderId: "1173806916"
      };
      // Initialize Firebase
      firebase.initializeApp(config);
    
    // Represents the database
     var database = firebase.database();
    
    // button to submit the user given info
    $('#submitButton').on('click', function (event) {
       // prevents the refresh
        event.preventDefault();
       
        var trainName = $('#nameInput').val().trim();
        var destination = $('#destInput').val().trim();
        var startTime = $('#timeInput').val().trim();
        var frequency = $('#frequencyInput').val().trim();
    
        // Code for the push    
        database.ref().push({
            trainName: trainName,
            destination: destination,
            startTime: startTime,
            frequency: frequency,
    
        })
    
        //resets all areas of user input
        $('#nameInput').val("");
        $('#destInput').val("");
        $('#timeInput').val("");
        $('#frequencyInput').val("");
    })
 
        database.ref().on("child_added", function (snapshot) {

        var startingtrainTime = moment(snapshot.val().startTime, "HH:mm").subtract(1, "years");
        var difftimeIN = moment().diff(moment(startingtrainTime), "minutes");
        var remainder = difftimeIN % snapshot.val().frequency;
        var mintillNext = snapshot.val().frequency - remainder;
        var nextTrain = moment().add(mintillNext, "minutes").format("hh:mm a");
        var newRow = $("<tr>");
       
        $("#trainBody").append(newRow);
    
        $(newRow).append($("<td>").text(snapshot.val().trainName));
        $(newRow).append($("<td>").text(snapshot.val().destination));
        $(newRow).append($("<td>").text(snapshot.val().frequency));
        $(newRow).append($("<td>").text(nextTrain));
        $(newRow).append($("<td>").text(mintillNext));
    })
})