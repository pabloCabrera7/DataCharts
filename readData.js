
console.log('Reading and processing file data');
var Chart = require('chart.js');
const dataFromJson = require('./data.json');

let get = post = head = delet = put = 0;
let http200 = http302 = http304 = http400 = http403 = http404 = http500 = http501 = 0;
let total250 = total500 = total750 = total1000 = 0;
let minActual, hourActual;
let requestPerMinuts = [];
let requestPerHour = [];
let counter = 0;
let counterHour = 0;
let optionsChart = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

getInformation(dataFromJson);
showCharts();

function showCharts() {
    let ctx = document.getElementById('methodChart');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Get', 'Post', 'Head'],
            datasets: [{
                label: 'Number of Methods',
                data: [get, post, head],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: optionsChart
    });

    ctx = document.getElementById('requestsPerHourChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
            datasets: [{
                label: '# of Request per hour',
                data: requestPerHour,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',

                    'rgba(124, 233, 175, 0.2)',
                    'rgba(159, 194, 1, 0.2)',
                    'rgba(65, 106, 64, 0.2)',
                    'rgba(237, 158, 38, 0.2)',
                    'rgba(190, 133, 184, 0.2)',
                    'rgba(240, 122, 76, 0.2)',
                    'rgba(193, 203, 149, 0.2)',
                    'rgba(28, 24, 129, 0.2)',
                    'rgba(43, 168, 138, 0.2)',
                    'rgba(33, 67, 131, 0.2)',
                    'rgba(169, 161, 199, 0.2)',
                    'rgba(119, 169, 30, 0.2)',
                    'rgba(49, 51, 169, 0.2)',
                    'rgba(23, 86, 195, 0.2)',
                    'rgba(85, 254, 231, 0.2)',
                    'rgba(92, 191, 206, 0.2)',
                    'rgba(133, 213, 24, 0.2)',
                    'rgba(122, 76, 108, 0.2)',
                    'rgba(134, 190, 203, 0.2)',
                    'rgba(237, 19, 8, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',

                    'rgba(124, 233, 175, 1)',
                    'rgba(159, 194, 1, 1)',
                    'rgba(65, 106, 64, 1)',
                    'rgba(237, 158, 38, 1)',
                    'rgba(190, 133, 184, 1)',
                    'rgba(240, 122, 76, 1)',
                    'rgba(193, 203, 149, 1)',
                    'rgba(28, 24, 129, 1)',
                    'rgba(43, 168, 138, 1)',
                    'rgba(33, 67, 131, 1)',
                    'rgba(169, 161, 199, 1)',
                    'rgba(119, 169, 30, 1)',
                    'rgba(49, 51, 169, 1)',
                    'rgba(23, 86, 195, 1)',
                    'rgba(85, 254, 231, 1)',
                    'rgba(92, 191, 206, 1)',
                    'rgba(133, 213, 24, 1)',
                    'rgba(122, 76, 108, 1)',
                    'rgba(134, 190, 203, 1)',
                    'rgba(237, 19, 8, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: optionsChart
    });

    ctx = document.getElementById('responseCodeChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['http200', 'http302', 'http304', 'http400', 'http403', 'http404', 'http500', 'http501'],
            datasets: [{
                label: 'Number of type response',
                data: [http200, http302, http304, http400, http403, http404, http500, http501],
                backgroundColor: [
                    'rgba(0, 0, 0, 0)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',

                    'rgba(124, 233, 175, 1)',
                    'rgba(159, 194, 1, 1)',
                    'rgba(65, 106, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: optionsChart
    });

    ctx = document.getElementById('documentSizeChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['<250B', '<500B', '<750B', '<1000B',],
            datasets: [{
                label: 'Size of requests',
                data: [total250, total500, total750, total1000,],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: optionsChart
    });
}

function getInformation(lines) {
    lines.forEach((element) => {
        let minute = element.datetime.minute;
        let hour = element.datetime.hour;
        let method = element.request.method;
        let response_code = element.response_code;
        let document_size = element.document_size;
        // We count how many request we have per method
        switch (method) {
            case 'GET':
                get++;
                break;
            case 'PUT':
                put++;
                break;
            case 'POST':
                post++;
                break;
            case 'DELETE':
                delet++;
                break;
            case 'HEAD':
                head++;
                break;
            default:
                break;
        }
        // We count how many code response we have
        switch (response_code) {
            case '200':
                http200++;
                break;
            case '302':
                http302++;
                break;
            case '304':
                http304++;
                break;
            case '400':
                http400++;
                break;
            case '403':
                http403++;
                break;
            case '404':
                http404++;
                break;
            case '500':
                http500++;
                break;
            case '501':
                http501++;
                break;
            default:
                break;
        }
        // I decided to separate the size distribution in 4 range of 250
        if (response_code === '200' && document_size < 1000) {
            if (document_size < 250) {
                total250++;
            } else if (document_size < 500) {
                total500++;
            } else if (document_size < 750) {
                total750++;
            } else {
                total1000++
            }
        }
        // To count hoy many request per minute, at the end request per minutes is going to be all the request divided by the number of minuts: ~1440 (24hours*60min)
        if (minActual !== minute) {
            if (counter != 0) {
                requestPerMinuts.push(counter);
                counter = 0;
            }
            minActual = minute;
            counter++;
        } else {
            counter++;
        }
        // To count hoy many request per hour, this is the one I used, seem more valuable
        if (hourActual !== hour) {
            if (counterHour != 0) {
                requestPerHour.push(counterHour);
                counterHour = 0;
            }
            hourActual = hour;
            counterHour++;
        } else {
            counterHour++;
        }
    });
}