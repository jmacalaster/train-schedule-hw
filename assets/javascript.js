// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train schedule database.
// 4. Create a way to calculate the train schedules worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in hours and minutes.
// 5. Calculate the amount of time until arrival for each train 

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC_9ljbM1qx-60dyy1iZgsBrqxUzDjSkmU",
    authDomain: "my-awesome-project-f9c50.firebaseapp.com",
    databaseURL: "https://my-awesome-project-f9c50.firebaseio.com",
    projectId: "my-awesome-project-f9c50",
    storageBucket: "my-awesome-project-f9c50.appspot.com",
    messagingSenderId: "138051668610"
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();

  console.log(database);
  
  // Button for adding Train Times
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var firstTrainMoment = moment($("#first-train-input").val(), "HH:mm");
    var firstTrain = firstTrainMoment._i;
    var trainFreq = parseInt($("#frequency-input").val().trim());
    var diffTime = moment().diff(moment(firstTrainMoment), "minutes");
    var tRemainder = diffTime % trainFreq;
    var tMinutesTillTrain = trainFreq - tRemainder;
    var nextTrainMoment = moment().add(tMinutesTillTrain, "minutes");
    var nextTrain = moment(nextTrainMoment).format("HH:mm");


    console.log(trainName);
    console.log(trainDest);
    console.log(firstTrain);
    console.log(trainFreq);
    console.log(diffTime);
    console.log(tRemainder);
    console.log(tMinutesTillTrain);
    console.log(nextTrain);

  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      rate: trainFreq,
      next: nextTrain,
      min: tMinutesTillTrain
    };

    console.log(newTrain);
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.rate);
    console.log(newTrain.next);
    console.log(newTrain.min);
  
    alert("Train Schedule Successfully Added...choo choo!");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFreq = childSnapshot.val().rate;
    var nextTrain = childSnapshot.val().next;
    var tMinutesTillTrain = childSnapshot.val().min;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFreq);
    console.log(nextTrain);
    console.log(tMinutesTillTrain);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<th scope='row'>").text(trainName),
      $("<th>").text(trainDest),
      $("<th>").text(trainFreq),
      $("<th>").text(nextTrain),
      $("<th>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
 