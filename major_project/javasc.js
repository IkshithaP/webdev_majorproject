function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = newName.value;

fetch("https://api.openweathermap.org/data/2.5/forecast?q="+newName.value+"&units=metric&appid=9ef4d2f08fa99a8f435147f858106902")
.then(response => response.json())
.then(data => {

    //Getting the min and max values for each day
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min ).toFixed(1)+ "°";
        
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max ).toFixed(1) + "°";
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "humid").innerHTML = "Humidity: " + Number(data.list[i].main.humidity);
    }
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "ws").innerHTML = "windspeed: " + Number(data.list[i].wind.speed);
    }
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "desc").innerHTML = "Desc:" + data.list[i].weather[0].description;
    }
   

    //Getting Weather Icons
     for(i = 0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon +".png";
    }

    console.log(data)


})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Connection"))
}

function DefaultScreen(){
    document.getElementById("cityInput").defaultValue = "Delhi";
    GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }