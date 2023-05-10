let chartTarget;
let chartData;
let chart;

function initChart(chart, object) {
  const labels = Object.keys(object);
  const info = Object.keys(object).map((item) => object[item].length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Count ",
        backgroundColor: "rgb(232, 174, 185)",
        borderColor: "rgb(255, 99, 132)",
        data: info,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 1000,
        },
      },
    },
  };

  return new Chart(chart, config);
}

function changeChart(chart, object) {
  const labels = Object.keys(object);
  const info = Object.keys(object).map((item) => object[item].length);
  console.log(chart);
  chart.data.labels = labels;
  chart.data.datasets.forEach((set) => {
    set.data = info;
    return set;
  });
  chart.update();
}

function chooseChart() {
  let category = document.querySelector("#inspection_types").value;
  let shapedData;
  if (category == "proper_hand_washing") {
    shapedData = shapeDataForHandWashing(chartData);
  } else if (category == "rodent_and_insects") {
    shapedData = shapeDataForRodentsAndInsect(chartData);
  } else if (category == "ill_workers_restricted") {
    shapedData = shapeDataForIllWorkersRestricted(chartData);
  } else if (category == "food_protected_from") {
    shapedData = shapeDataForFoodContamination(chartData);
  } else if (category == "proper_sewage_disposal") {
    shapedData = shapeDataForSewage(chartData);
  } else if (category == "cooking_time_and_temperature") {
    shapedData = shapeDataForCooking(chartData);
  }
  changeChart(chart, shapedData);
}

function shapeDataForHandWashing(array) {
  return array.reduce((collection, item) => {
    if (!collection[item.proper_hand_washing]) {
      collection[item.proper_hand_washing] = [item];
    } else {
      collection[item.proper_hand_washing].push(item);
    }
    return collection;
  }, {});
}

function shapeDataForRodentsAndInsect(array) {
  return array.reduce((collection, item) => {
    if (!collection[item.rodent_and_insects]) {
      collection[item.rodent_and_insects] = [item];
    } else {
      collection[item.rodent_and_insects].push(item);
    }
    return collection;
  }, {});
}

function shapeDataForIllWorkersRestricted(array) {
  return array.reduce((collection, item) => {
    if (!collection[item.ill_workers_restricted]) {
      collection[item.ill_workers_restricted] = [item];
    } else {
      collection[item.ill_workers_restricted].push(item);
    }
    return collection;
  }, {});
}

function shapeDataForFoodContamination(array) {
  return array.reduce((collection, item) => {
    if (!collection[item.food_protected_from]) {
      collection[item.food_protected_from] = [item];
    } else {
      collection[item.food_protected_from].push(item);
    }
    return collection;
  }, {});
}

function shapeDataForSewage(array) {
  return array.reduce((collection, item) => {
    if (!collection[item.proper_sewage_disposal]) {
      collection[item.proper_sewage_disposal] = [item];
    } else {
      collection[item.proper_sewage_disposal].push(item);
    }
    return collection;
  }, {});
}

function shapeDataForCooking(array) {
  return array.reduce((collection, item) => {
    if (!collection[item.cooking_time_and_temperature]) {
      collection[item.cooking_time_and_temperature] = [item];
    } else {
      collection[item.cooking_time_and_temperature].push(item);
    }
    return collection;
  }, {});
}

async function getData() {
  const url = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  const data = await fetch(url);
  const json = await data.json();

  return json;
}

async function mainEvent() {
  chartTarget = document.querySelector("#myChart");
  chartData = await getData();
  chart = initChart(chartTarget, shapeDataForHandWashing(chartData));
  const refreshButton = document.querySelector("#refresh_button");
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());
document
  .querySelector("#inspection_types")
  .addEventListener("change", chooseChart);
