const cityName = document.getElementById('cityName')
const day = document.getElementById('day')
const today_date = document.getElementById('today_date')
const submitBtn = document.getElementById('submitBtn')
const city_name = document.getElementById('city_name')
const temp = document.getElementById('temp')
const temp_status= document.getElementById('temp_status')
const dataHide = document.querySelector('.middle_layer')
const dateData = ()=>{
    let weekDay = new Array(7)
    weekDay[0] = "Sunday"
    weekDay[1] = "Monday"
    weekDay[2] = "Tuesday"
    weekDay[3] = "Wednesday"
    weekDay[4] = "Thursday"
    weekDay[5] = "Friday"
    weekDay[6] = "Saturday"
    

    const currentTime = new Date()



    let month = currentTime.getMonth()
    let to_date  = currentTime.toISOString().slice(0, 10);
    let dateOfToday = to_date.slice(8, 10);

    // console.log(today_date);
    let months = [
        "Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"
    ]

    today_date.innerText = `${dateOfToday}  ${months[month]}`

    let today = `${weekDay[currentTime.getDay()]}`

    day.innerText = today 

    
}

const getInfo = async(event)=>{
    event.preventDefault()
    
    let cityVal = cityName.value
    if (cityVal === "") {
        city_name.innerText = 'Plz enter city name before search'
        // city_name.innerHTML = '<p>Plz enter city name before search</p>'
        dataHide.classList.add('data_hide')
    } else {
        console.log(cityVal);
        try {
            let url  = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=f54c31cea119a078daebf41b76cd0fbf`
            
            
            const response = await fetch(url)

            const data = await response.json();
            
            const arrData = [data]

            let temperature = Number(arrData[0].main.temp)
            let name_city = arrData[0].name
            let country = arrData[0].sys.country            
            city_name.innerText = `${name_city},${country}`
            temp.innerHTML = `<span>${(temperature-273).toFixed(2)}</span><sup>o</sup>C`
            status_temp = arrData[0].weather[0].main
            if (status_temp === "Clear") {
                temp_status.innerHTML = `<i class="fa fa-sun" style = "color:yellow" aria-hidden="true"></i>`
            }
            else if (status_temp === "Rain") {
                temp_status.innerHTML = `<i class="fa fa-solid fa-cloud-rain" style = "color:#fff" aria-hidden="true"></i>`
            }
            else if (status_temp === "Clouds") {
                temp_status.innerHTML = `<i class="fa fa-cloud" style = "color:#a4b0be" aria-hidden="true"></i>`
            }
            else{
                temp_status.innerHTML = `<i class="fa fa-cloud" style = "color:#f1f2f6" aria-hidden="true"></i>`
                
            }
            dataHide.classList.remove('data_hide')
            
            console.log(arrData[0].main,temperature,name_city);
        } catch (error) {
            city_name.innerText = "Some error occured or city not found"
            dataHide.classList.add('data_hide')
        }
    }
    
}
dateData()

submitBtn.addEventListener('click',getInfo)