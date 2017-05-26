$(document).ready(function(){
  //initialize firebase

  var config = {
    apiKey: "AIzaSyA0M7IV67mwnE31VnkblO599Q_W7vZtszw",
    authDomain: "train-scheduler-1f7a1.firebaseapp.com",
    databaseURL: "https://train-scheduler-1f7a1.firebaseio.com",
    projectId: "train-scheduler-1f7a1",
    storageBucket: "train-scheduler-1f7a1.appspot.com",
    messagingSenderId: "611244779858"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//click function
  $("#add-train-btn").on("click", function(){

    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#first-train-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
      tName: trainName,
      dest: trainDestination,
      time: trainTime,
      freq: trainFrequency,
    };
//Prevents empty fields from being submitted 
    if(trainName && trainDestination && trainTime && trainFrequency){
   
      database.ref().push(newTrain);

      console.log(newTrain.tName);
      console.log(newTrain.dest);
      console.log(newTrain.time);
      console.log(newTrain.freq);

  }
//clear inputs
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");

  });


  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().tName;
    var trainDestination = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().freq;

    var timeCheck = moment(trainTime, "HH:mm").subtract(1, "years");
    var differenceOfTimes = moment().diff(moment(timeCheck), "minutes");
    var mod = differenceOfTimes % trainFrequency;
    var mAway = trainFrequency - mod;
    var arrival = moment().add(mAway, "minutes");

    $("#train-table>tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + 
      trainFrequency + "</td><td>" + moment(arrival).format("HH:mm") + "</td><td>" + mAway + "</td></tr>");
  });
});