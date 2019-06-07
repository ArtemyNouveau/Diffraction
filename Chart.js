let myChart;
let delta = -3;
let isPortableDevice = true;

function diagram () {
    let ctx = document.getElementById("myChart");
    myChart = new Chart (ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'I(φ)',
                    data: [],
                    labels: [],
                    borderColor: '#007bff',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'I1(φ)',
                    data: [],
                    labels: [],
                    borderColor: '#563d7c',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0
                },
            ]
        },
        options: {
            responsive: false,
            title: {
                display: true,
                text: 'Зависимость интенсивности света при дифракции Фраунгофера',
                fontSize: 16,
                fontStyle: 'normal'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'cм',
                        fontSize: 16,
                        fontStyle: 'normal'
                    },
                    position: 'top'
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        callback: function (value, index, values) {
                            if (value < 10) {
                                return value.toFixed(2)
                            } else if (value < 100) {
                                return value.toFixed(1)
                            } else if (value < 1000) {
                                return value.toFixed(0)
                            }
                            return '000';
                        }
                    }
                }]
            },
            legend: {
                label: {
                    usePointStyle: true,
                }
            }
        }
    });
    update();
}



function update() {
    let lambda = Number(Lambda.value)*Math.pow(10, -9),
        n = Number(N.value),
        I0 = Number(I.value),
        aWidth = Number(A.value)*Math.pow(10, -6),
        bWidth = Number(B.value)*Math.pow(10, -6),
        d = Number(aWidth)+Number(bWidth),
        l = Number(L.value)/10,
        count = -496, multiplyer = -count;
    let ctx = Grad.getContext("2d");
    if (delta < 0) {
        for (let x = -displayWidth/2; x <= displayWidth/2; x+=displayWidth/991) {
            if (Idifr(sinfi(x))  > delta) delta =  Idifr(sinfi(x));
        }
    }
    I0 = I0/delta;
    /**
     * @return {number}
     */
    function Idifr(sinfi) {
        let u = Math.PI*(aWidth)*(sinfi)/lambda;

        return I0*Math.pow(sin(u)/u, 2);
    }
    /**
     * @return {number}
     */
    function Iinter(sinfi) {
        let delta = Math.PI*(d)*(sinfi)/lambda;
        return Math.pow(sin(n*delta)/sin(delta), 2);
    }
    /**
     * @return {number}
     */
    function Ifi(sinfi) {
        return Idifr(sinfi)*Iinter(sinfi);
    }
    function sinfi(x) {
        return x/Math.sqrt((Math.pow(x, 2) + Math.pow(l, 2)))
    }

    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];
    myChart.data.datasets[1].data = [];

    let Imax = Ifi(1.1054525350662203e-14);

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0,0,1000,50);
    ctx.lineWidth = 1;


    for (let x = -displayWidth/2; x <= displayWidth/2; x+=displayWidth/(2*991)) {
        if ((count < -(multiplyer-2)) || (count >= (multiplyer-2))) {
            myChart.data.labels.push('');
        } else {
            myChart.data.labels.push((10*x).toFixed(1));
        }

        ctx.strokeStyle = ''+wavelengthToColor(Lambda.value, Ifi(sinfi(x))/Imax);
        ctx.beginPath();
        ctx.moveTo(count+multiplyer, 0);
        ctx.lineTo((count+=0.5)+multiplyer, 50);
        ctx.stroke();

        myChart.data.datasets[0].data.push(Ifi(sinfi(x)).toFixed(14));
        myChart.data.datasets[1].data.push((Idifr(sinfi(x))*Math.pow(n, 2)).toFixed(14));
    }

    myChart.update();
}

N.onmousemove = function() {
    isPortableDevice = false;
    document.getElementById("labelN").innerText = "Количество щелей: " + N.value;
    update();
};

Lambda.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelLambda").innerText = "длина волны: " + Lambda.value + "нм";
    delta = -3;
    update();
};

A.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelA").innerText = "Ширина щели: " + A.value + "мкм";
    delta = -3;
    update();
};

B.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelB").innerText = "расстояние между краями соседних щелей: " + B.value + "мкм";
    delta = -3;
    update();
};

I.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelI").innerText = "Интенсивность в центре: " + I.value;
    delta = -3;
    update();
};

L.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelL").innerText = `Расстояние от решетки до экрана: ${L.value/10}м`;
    update();
};

N.onchange = function() {
    if (!isPortableDevice) return;
    document.getElementById("labelN").innerText = "Количество щелей: " + N.value;
    update();
};

Lambda.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelLambda").innerText = "длина волны: " + Lambda.value + "нм";
    delta = -3;
    update();
};

A.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelA").innerText = "Ширина щели: " + A.value + "мкм";
    delta = -3;
    update();
};

B.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelB").innerText = "Расстояние между центрами щелей: " + B.value + "мкм";
    delta = -3;
    update();
};

I.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelI").innerText = "Интенсивность в центре: " + I.value;
    delta = -3;
    update();
};

L.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelL").innerText = `Расстояние от решетки до экрана: ${L.value/10}м`;
    update();
};

window.onload = function () {
    diagram();
};