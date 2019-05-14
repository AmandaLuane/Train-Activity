console.log("train js page")

//#trainName
//#destination
//#trainTime
//#trianFrequency


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyARJgIVGScw27BnBojnlt9IPS_zU6K2yiQ",
    authDomain: "classact-e4d5f.firebaseapp.com",
    databaseURL: "https://classact-e4d5f.firebaseio.com",
    projectId: "classact-e4d5f",
    storageBucket: "classact-e4d5f.appspot.com",
    messagingSenderId: "119696482979",
    appId: "1:119696482979:web:526213a6c9e9277a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

        var database = firebase.database();


        $('#submitBtn').on("click", function () {

            event.preventDefault();

            var trainName = $('#trainName').val().trim();
            var destination = $('#destination').val().trim();
            var trainTime = $('#trainTime').val().trim();
            var trainFreq = $('#trianFrequency').val().trim();

            database.ref().push({
                trainName: trainName,
                destination: destination,
                trainTime: trainTime,
                trainFreq: trainFreq,
                dateAdded: firebase.database.ServerValue.TIMESTAMP,
            });
        });



        database.ref().on("child_added", function(childSnapshot) {

            var sv = childSnapshot.val();
            console.log(sv.trainName);
            console.log(sv.destination);

            var trainNameDB = sv.trainName;
            var destinationDB = sv.destination;
            var trainTimeDB = sv.trainTime;
            var trainFreqDB = sv.trainFreq;

            var startTimeConvert = moment(childSnapshot.val().trainTime, "hh:mm").subtract(1, "years");
            console.log("start time converted " + startTimeConvert);
            var difference  = moment().diff(moment(startTimeConvert), "minutes");
            console.log("different " + difference);
            var remaining = difference % childSnapshot.val().trainFreq;
            console.log("remaining " + remaining);
            var remainingMins = childSnapshot.val().trainFreq - remaining;
            console.log("remaining Mins " + remainingMins);
            var nextTrainDB = moment().add(remainingMins);
            console.log("nextTrain " + nextTrainDB);
            var key = childSnapshot.key;


            var dataSet = ("<tr><td>" + trainNameDB + "</td><td>" + destinationDB + "</td><td>" +
            trainFreqDB + "</td><td>" + trainTimeDB + "</td><td>" + remainingMins + "</td></tr>");
    
            $("#tbody").append(dataSet);

        });

        $(document).on("click", ".arrival", function() {
            keyref = $(this).attr("data-key");
            database.ref().child(keyref).remove();
            window.location.reload();
          });
          
          setInterval(function() {
            window.location.reload();
          }, 60000);



