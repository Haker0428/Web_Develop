/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */

function getWeather(cityCode) {
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather',
        params: {
            city: cityCode
        }
    }).then((res) => {
        console.log(res);
        const wObj = res.data;
        const dateStr = `
        <span class="dateShort">${wObj.date}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${wObj.dateLunar}</span>
        </span>
        `
        document.querySelector('.title').innerHTML = dateStr;
        document.querySelector('.area').innerHTML = wObj.area

        const nowStr= `
        <div class="tem-box">
        <span class="temp">
          <span class="temperature">${wObj.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${wObj.psPm25}</span>
          <span class="psPm25Level">${wObj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="${wObj.weatherImg}" class="weatherImg" alt="">
            <span class="weather">${wObj.weather}</span>
          </li>
          <li class="windDirection">${wObj.windDirection}</li>
          <li class="windPower">${wObj.windPower}</li>
        </ul>
      </div>
      `
      document.querySelector('.weather-box').innerHTML = nowStr; 

      const todayWeatherStr = `
       <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${wObj.weather}</span>
          <span class="temNight">${wObj.todayWeather.temNight}</span>
          <span>-</span>
          <span class="temDay">${wObj.todayWeather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${wObj.todayWeather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${wObj.todayWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${wObj.todayWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${wObj.todayWeather.sunsetTime}</span>
        </li>
      </ul>`;
      document.querySelector('.today-weather').innerHTML = todayWeatherStr;
    
      const dayForecast = wObj.dayForecast;
      const strForecast = dayForecast.map(item => {
        return `<li class="item">
          <div class="date-box">
            <span class="dateFormat">${item.dateFormat}</span>
            <span class="date">${item.date}</span>
          </div>
          <img src="${item.weatherImg}" alt="" class="weatherImg">
          <span class="weather">${item.weather}</span>
          <div class="temp">
            <span class="temNight">${item.temNight}</span>-
            <span class="temDay">${item.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${item.windDirection}</span>
            <span class="windPower">${item.windPower}</span>
          </div>
        </li>`;
      }).join('');
      document.querySelector('.week-wrap').innerHTML = strForecast;
    })
}

getWeather('110100');

document.querySelector('.search-city').addEventListener('input', e => {
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather/city',
        params: {
            city: e.target.value
        }
    }).then(res => {
        console.log(res);
        const str = res.data.map(item => {
            return `<li class="city-item" data-code="${item.code}">${item.name}</li>`;
        }).join('');
        document.querySelector('.search-list').innerHTML = str;
    })
})


document.querySelector('.search-list').addEventListener('click', e => {
    if (e.target.classList.contains('city-item')) {
        console.log(e.target);
        
        const cityCode = e.target.dataset.code;
        console.log(cityCode);
        getWeather(cityCode);
    }
})
