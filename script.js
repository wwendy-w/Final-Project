let chartTarget;
let chartData;
let chart;

function initChart(chart, object) {
    const labels = Object.keys(object);
    const info = Object.keys(object).map((item) => object[item].length);

    const data = {
        labels: labels,
        datasets: [{
            label: 'Count ',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: info
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    suggestedMin: 0,
                    suggestedMax: 1000
                }
            }
        }
    };

    return new Chart(
        chart,
        config
    );
}

function changeChart(chart, object) {
    const labels = Object.keys(object);
    const info = Object.keys(object).map((item) => object[item].length);
    console.log(chart)
    chart.data.labels = labels;
    chart.data.datasets.forEach((set) => { 
        set.data = info; 
        return set;
    })
    chart.update();
} 
    
function chooseChart(){
    let category = document.querySelector("#inspection_types").value;
    let shapedData;
    if (category == "proper_hand_washing"){
        shapedData = shapeDataForHandWashing(chartData)
    } else if (category == "rodent_and_insects") {
        shapedData = shapeDataForRodentsAndInsect(chartData)
    }
    changeChart(chart, shapedData)
}

function shapeDataForHandWashing(array){
    return array.reduce((collection, item) => {
        if(!collection[item.proper_hand_washing]) {
            collection[item.proper_hand_washing] = [item]
        } else {
            collection[item.proper_hand_washing].push(item);
        }
        return collection;
    }, {});
}

function shapeDataForRodentsAndInsect(array){
    return array.reduce((collection, item) => {
        if(!collection[item.rodent_and_insects]) {
            collection[item.rodent_and_insects] = [item]
        } else {
            collection[item.rodent_and_insects].push(item);
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
    chartTarget = document.querySelector("#myChart");
    chartData = await getData();
    chart = initChart(chartTarget, shapeDataForHandWashing(chartData));
}
  document.addEventListener("DOMContentLoaded", async () => mainEvent());
  document.querySelector("#inspection_types").addEventListener("change", chooseChart);