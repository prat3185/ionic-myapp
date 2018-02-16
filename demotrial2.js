$(function(){
    var config = {
        apiKey: "AIzaSyDo1Jz7FTyOxmkdw3B2IixfSNxQJiGpvnw",
        authDomain: "test-eefa2.firebaseapp.com",
        databaseURL: "https://test-eefa2.firebaseio.com",
        projectId: "test-eefa2",
        storageBucket: "test-eefa2.appspot.com",
        messagingSenderId: "334050492647"
      };
        firebase.initializeApp(config);
      
       const container=document.getElementById("object");
       const dataref=firebase.database().ref().child('object');
     
 
       for(var i=-3.14;i<=3.14;i+=0.01){
        var j=0;
        while(j<1000)
        {
                j++;
                console.log(j);
        }
        console.log(i);
        dataref.update({"angle3":parseFloat(i)}); 
        }
     

});