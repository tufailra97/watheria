$(document).ready(()=>{ 
    //get form value on sbumit
    const form = $("#form");
    form.submit((e)=>{
        e.preventDefault();

        //extract the value of the city
        let city = $('#input_city').val();
        //extract the value of the country
        let country = $('#input_country').val();
        //variable to check whether there is an error or not   
        let error = false;
        //array to store error messages
        let errorMessage = [];

        //check if the city length is less than 1
        if(city.trim()< 1){
            error = true;
            errorMessage.push("City name is not valid");
        }

        //check if the country length is less than 1
        if(country.trim() < 1){
            error = true;
            errorMessage.push("Country name is not valid");
        }

        //if errors display else continue with the fetching
        if(error === true){
            //call the function to display all the errors
            displayErrors(errorMessage);
            //reset the variable
            errorMessage.length = 0;
        }else{
            $("#errors").hide();
            const API = '63cc671f5fd5f6b9f6732ed8344316e1';
            let url = "http://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&APPID="+API;
            let res = $.ajax(url)
                .done((res)=>{
                    console.log(res);
                    displayResults(res);
                })
                .fail((e)=>{
                    let err = e.responseJSON.message;
                    errorMessage.push(err);
                    displayErrors(errorMessage);
                    errorMessage.length = 0;
                })
        }
    });

    //display errors
    displayErrors = (error) => {
        //if ul child exist, remove
        if($('#results').length){
            $('#results').children().remove();
        }
        //display errors
        $("#results").hide().append(error.map((e)=>{
            return $('<li class="error">'+e+'!</li>')
        })).slideDown("slow");
    }

    //display results
    displayResults = (res) =>{
        let weather = res.weather[0].main;                                          //weather condition
        let temp = precisionRound(res.main.temp - 273.15);                          //current temp
        let minTemp = precisionRound(res.main.temp_min - 273.15);                   //min temp
        let maxTemp = precisionRound(res.main.temp_max - 273.15);                   //max temp
        let windSpeed = res.wind.speed;                                             //wind speed
        let d = new Date();                                                         
        let date = d.toDateString();                                                //date
        let time = d.toLocaleTimeString();                                          //time
        //if child exist, remove
        if($('#results').length){
            $('#results').children().remove();
        }
        //display results
        $('<li class="result"><span>Condition :</span> '+ weather + '</li>').appendTo("#results");
        $('<li class="result"><span>Temperature : </span> '+ temp + '&#8451;</li>').appendTo("#results");
        $('<li class="result"><span>Min Temp : </span> '+ minTemp + '&#8451</li>').appendTo("#results");
        $('<li class="result"><span>Max Temp : </span> '+ maxTemp + '</li>').appendTo("#results");
        $('<li class="result"><span>Wind Speed : </span> '+ windSpeed + ' mph</li>').appendTo("#results");
        $('<li class="result"><span>Time : </span> '+ time + '</li>').appendTo("#results");
        $('<li class="result"><span>Date : </span> '+ date + '</li>').appendTo("#results");
        
        $("#results").hide().slideDown("slow");
    }
    precisionRound = (number) => {
        let factor = Math.pow(10, 2);
        return Math.round(number * factor) / factor;
      }
});