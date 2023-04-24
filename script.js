
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  
function filterList(list, query) {
return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
});
}
  

function initChart(chart, object) {
const labels = Object.keys(object);

const info = Object.keys(object).map((item) => object[item].length);


const data = {
    labels: labels,
    datasets: [{
        label: 'Restaurants By Category',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: info
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {}
};

return new Chart(
    chart,
    config
);

}

function shapeDataForLineChart(array){
    return array.reduce((collection, item) => {
        if(!collection[item.category]) {
            collection[item.category] = [item]
        } else {
            collection[item.category].push(item);
        }
        return collection;
    }, {});
}

async function getData(){
    const url = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
    const data = await fetch(url);
    const json = await data.json();
    const reply = json.filter((item) => Boolean(item.geocoded_column_1)).filter((item) => Boolean(item.name));
    return reply;
}
  
async function mainEvent() {

    const chartTarget = document.querySelector("#myChart");
    
    const chartData = await getData();
    const shapedData = shapeDataForLineChart(chartData);
    console.log(shapedData);
    const myChart = initChart(chartTarget, shapedData);


    const results = await fetch(
        "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
      );

    const storedList = await results.json();
  
    console.log(storedList);
}
  /*
      This adds an event listener that fires our main event only once our page elements have loaded
      The use of the async keyword means we can "await" events before continuing in our scripts
      In this case, we load some data when the form has submitted
    */
  document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests