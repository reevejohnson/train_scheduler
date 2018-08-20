var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirstTime = moment($("#first-time-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTime: trainFirstTime,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().firstTime;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirstTime);
    console.log(trainFrequency);
 
     // First Time (pushed back 1 year to make sure it comes before current time)
     var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
     console.log(firstTimeConverted);
 
     // Current Time
     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
 
     // Difference between the times
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);
 
     // Time apart (remainder)
     var tRemainder = diffTime % trainFrequency;
     console.log(tRemainder);
 
     // Minute Until Train
     var tMinutesTillTrain = trainFrequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
 
     // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     var prettyNextTrain = moment(nextTrain).format("HH:mm");
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(prettyNextTrain),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#train-schedule-table > tbody").append(newRow);
  });