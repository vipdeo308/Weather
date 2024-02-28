// Initialize the Variables
var countryURL = "https://restcountries.com/v2/all"
var apiKey = "26bfedc8800e0e5b9fe1b7518dde5837"

function get3RandomCountries(data)
{
    res = []
    while(res.length<3)
    {
        let ind = Math.floor(data.length*Math.random())
        res.push(data[ind])
    }
    return res
}

function countryFlag(country)
{
    return '<img width="200" height="150" src="'+country.flag+'">' 
}

function countryInfo(country)
{
    return "Capital: "+country.capital+"<br>Region: "+country.region+"<br>Country Code: "+country.alpha3Code
}

function buttonCode(country,data)
{
    let weather = data.weather[0]
    let str = 'Name: '+country.name+'; Main: '+weather.main+'; Description: '+weather.description+';'
    return '<button onclick="alert(&apos;'+str+'&apos;)">Click for Weather</button>'
}

async function loadData()
{
    let section = document.getElementById("section")

    let req = await fetch(countryURL)
    let res = await req.json()
    
    console.log(res)

    let cards = "<br>"

    let list = get3RandomCountries(res)
    
    for(var country of list)
    {
        let lat = country.latlng[0]
        let lon = country.latlng[1]
        
        let wURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
       
        let raw = await fetch(wURL)
        let data = await raw.json()

        cards += '<table class="card">'
        cards += '<tr><td id="name">'+country.name+'</td></tr>'
        
        cards += '<tr><td id="flag">'
        cards += countryFlag(country)
        cards += "</td></tr>"

        cards += '<tr><td id="info">'
        cards += countryInfo(country)
        cards += '</td></tr>'

        cards += '<tr><td id="weather">'
        cards += buttonCode(country,data)
        cards += '</td></tr>'

        cards += '</table>'
    }
    console.log(cards)

    try{
        section.innerHTML = cards
    }catch(err){
        console.log(err)
    }
}

window.onload = loadData()

