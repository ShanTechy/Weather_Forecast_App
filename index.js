let getData = async ()=>{
    let city = document.getElementById("city").value;
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e886ef6590be09d68cda8cd90b032725`)
    let data= await res.json();
    return data   
}

let container=document.getElementById("container")

let showData = async()=>{
    let city = document.getElementById("city").value;

    let data=await getData();
    console.log(data);
    container.innerHTML="";

    let h1=document.createElement("h1");
    h1.innerText="Weather Details";
    h1.style.color="red";
    h1.style.textDecoration="underline";

    let min_temp=document.createElement("p");
    min_temp.innerHTML=`<b>Minimum Temperature :</b> ${Math.floor((data.main.temp_min)-273.15)}°c`

    let max_temp=document.createElement("p");
    max_temp.innerHTML=`<b>Maximum Temperature :</b> ${Math.floor((data.main.temp_max)-273.15)}°c`

    let wind=document.createElement("p");
        wind.innerHTML=`<b>Wind Speed :</b> ${data.wind.speed} Km/hr`

    let cloud=document.createElement("p");
    cloud.innerHTML=`<b>Clouds :</b> ${data.clouds.all}`


    function convertTime(seconds) {
        let date = new Date(seconds * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let second = "0" + date.getSeconds();
        return hours + ":" + minutes.substr(-2) + ":" + second.substr(-2)
    }
    let sunrise=document.createElement("p");
    let time = (data.sys.sunrise)
    sunrise.innerHTML=`<b>Sunrise :</b> ${convertTime(time)}`

    let time1 = (data.sys.sunset)

    let sunset=document.createElement("p");
    sunset.innerHTML=`<b>Sunset :</b> ${convertTime(time1)}`

    let iframe=document.getElementById("gmap_canvas");
    iframe.src=`https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`

    container.append(h1,min_temp,max_temp,wind,cloud,sunrise,sunset)
    nshowData()
}

let ngetData = async ()=>{
    let city = document.getElementById("city").value;
    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e886ef6590be09d68cda8cd90b032725&units=metric`)
    let data = await res.json();
    return (data);
}

let nshowData =async ()=>{
    let data = await ngetData();
    let ndata=data.list;
    console.log(data);

    let container = document.getElementById("container1");

    for(let i=0;i<ndata.length;i=i+8){
        let div=document.createElement("div");

        var timestamp = (ndata[i].dt) * 1000;
        var date = new Date(timestamp);
        var dayIndex = date.getDay();
        var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var dayName = dayNames[dayIndex];
        let day = document.createElement("P");
        day.innerText=dayName;
        let icon = document.createElement("img");
        icon.src=`https://openweathermap.org/img/w/${ndata[i].weather[0].icon}.png`
        let maxTemp=document.createElement("p");
        maxTemp.innerText=`${Math.floor(ndata[i].main.temp_max)}°c`
        let minTemp=document.createElement("p");
        minTemp.innerText=`${Math.floor(ndata[i].main.temp_min)}°c`
        div.append(day,icon,maxTemp,minTemp);
        container.append(div)
    }
}


let searchBtn=document.getElementById("search");
searchBtn.addEventListener("click",showData)