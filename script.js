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
        label: 'Proper Hand Washing ',
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
        if(!collection[item.proper_hand_washing]) {
            collection[item.proper_hand_washing] = [item]
        } else {
            collection[item.proper_hand_washing].push(item);
        }
        return collection;
    }, {});
}

async function getData(){
    const url = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
    const data = await fetch(url);
    const json = await data.json();
    return json;
}
  
async function mainEvent() {
    const chartTarget = document.querySelector("#myChart");
    
    const chartData = await getData();

    const shapedData = shapeDataForLineChart(chartData);
    console.log(shapedData);
    const myChart = initChart(chartTarget, shapedData);
}
  document.addEventListener("DOMContentLoaded", async () => mainEvent());