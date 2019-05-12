console.log("train js page")

//#trainName
//#destination
//#trainTime
//#trianFrequency


  // Your web app's Firebase configuration
  var firebaseConfig = {
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



        database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function (childSnapshot) {

            var sv = childSnapshot.val();
            console.log(sv.trainName);
            console.log(sv.destination);

            var trainNameDB = sv.trainName;
            var destinationDB = sv.destination;
            var trainTimeDB = sv.trainTime;
            var trainFreqDB = sv.trainFreq;

            $(document).ready(function(){
                $('input.timepicker').timepicker({ timeFormat: 'hh:mm:ss p' });
            });



            

            // // //Making the employee start date look correct
            // var datePretty = moment(dateA).format("MM/DD/YYYY");

            // // //Calculate the months worked
            // var now = moment().format("MM/DD/YYYY");
            // var nowUTC = moment.utc(moment(now, "MM/DD/YYYY"));
            // var dateUTC = moment.utc(moment(dateA, "MM/DD/YYYY"));

            // // var empMonths = parseInt(now.from(moment(dateA), "months"));
            // var empMonths = nowUTC.diff(dateUTC, "months");
            // var empMonthPretty = empMonths;
            // console.log(now);
            // console.log(empMonths);
            // console.log(empMonthPretty);






            // //calculate the total billed rate
            // var empBilled = empMonths * rateA;
            // console.log(empBilled)

            var dataSet = ("<tr><td>" + trainNameDB + "</td><td>" + destinationDB + "</td><td>" +
            trainTimeDB + "</td><td>" + trainFreqDB + "</td></tr>");

            $("#tbody").append(dataSet);
        });