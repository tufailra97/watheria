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
            const API = '63cc671f5fd5f6b9f6732ed8344316e1';
            let weather = {};
            let url = "http://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&APPID="+API;
            let res = $.ajax(url)
                .done((res)=>{
                    weather = res;


                })
                .fail((e)=>{
                    console.log(e);
                    let err = e.responseJSON.message;
                    errorMessage.push(err);
                    displayErrors(errorMessage);
                    errorMessage.length = 0;
                })
        }
    });

    //function to display errors
    displayErrors = (error) => {
        //if ul child exist, remove
        if($('#errors').length){
            $('#errors').children().remove();
        }
        //display errors
        $("#errors").hide().append(error.map((e)=>{
            return $('<li class="error">'+e+'!</li>')
        })).slideDown("slow");
    }
});