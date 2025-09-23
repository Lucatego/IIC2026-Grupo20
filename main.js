const Q_START_MONTH = { 1: '01', 2: '04', 3: '07', 4: '10' };

function yearQToDateStr(Year_Q) {
    const [yStr, qStr] = Year_Q.split('-Q');
    const y = Number(yStr);
    const q = Number(qStr);
    const mm = Q_START_MONTH[q] || '01';
    return `${y}-${mm}-01`;
}

const SCALE = 1e9;
const UNIT_LABEL = 'Miles de años';

//fetch('Dataset/datos_limpios.json')
fetch('Dataset/datos_limpios_años.json')
    .then(r => r.json())
    .then(rows => {
    rows.sort((a,b) => {
        const [ya, qa] = a.Year_Q.split('-Q').map(Number);
        const [yb, qb] = b.Year_Q.split('-Q').map(Number);
        return ya - yb || qa - qb;
    });

    const x = rows.map(d => yearQToDateStr(d.Year_Q));
    //const y = rows.map(d => Number(d.Hours_watched) / SCALE);
    const y = rows.map(d => Number(d.Years_watched) / 1e3);
    const quarterLabel = rows.map(d => d.Year_Q);

    // Serie principal (negra)
    const traceMain = {
        type: 'scatter',
        mode: 'lines',
        x, y,
        line: { width: 3, color: '#0a0a0ac8' },
        marker: { size: 7, color: '#0a0a0ac8' },
        customdata: quarterLabel,
        hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.2f} ' + UNIT_LABEL + '<extra></extra>',
        name: ''
    };

    // --- Tramo resaltado Fortnite 2017Q3–2018Q3 ---
    const idx17Q3 = rows.findIndex(d => d.Year_Q === "2017-Q3");
    const idx17Q4 = rows.findIndex(d => d.Year_Q === "2017-Q4");
    const idx18Q1 = rows.findIndex(d => d.Year_Q === "2018-Q1");
    const idx18Q2 = rows.findIndex(d => d.Year_Q === "2018-Q2");
    const idx18Q3 = rows.findIndex(d => d.Year_Q === "2018-Q3");

    let traceFortnite = null;
    if (idx17Q3 !== -1 && idx17Q4 !== -1 && idx18Q1 !== -1 && idx18Q2 !== -1 && idx18Q3 !== -1) {
        traceFortnite = {
        type: 'scatter',
        mode: 'lines+markers',
        x: [x[idx17Q3], x[idx17Q4], x[idx18Q1], x[idx18Q2], x[idx18Q3]],
        y: [y[idx17Q3], y[idx17Q4], y[idx18Q1], y[idx18Q2], y[idx18Q3]],
        line: { width: 4, color: '#a340f7' }, // color naranja para Fortnite
        marker: {
            size: [9, 0, 0, 0, 9],   // solo inicio y fin visibles
            color: '#a340f7',
            opacity: 1,
            line: { width: 0 }
        },
        customdata: [quarterLabel[idx17Q3], quarterLabel[idx17Q4], quarterLabel[idx18Q1], quarterLabel[idx18Q2], quarterLabel[idx18Q3]],
        hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.2f} ' + UNIT_LABEL + '<extra></extra>',
        name: 'Fortnite'
        };
    }

    // --- Tramo resaltado 2020Q1–2020Q2 ---
    const idxQ1 = rows.findIndex(d => d.Year_Q === "2020-Q1");
    const idxQ2 = rows.findIndex(d => d.Year_Q === "2020-Q2");
    let traceHighlight1 = null;
    if (idxQ1 !== -1 && idxQ2 !== -1) {
        traceHighlight1 = {
        type: 'scatter',
        mode: 'lines+markers',
        x: [x[idxQ1], x[idxQ2]],
        y: [y[idxQ1], y[idxQ2]],
        line: { width: 4, color: '#a340f7' },
        marker: { size: 9, color: '#a340f7' },
        customdata: [quarterLabel[idxQ1], quarterLabel[idxQ2]],
        hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.2f} ' + UNIT_LABEL + '<extra></extra>',
        name: ''
        };
    }

    // --- Tramo resaltado 2020Q4–2021Q1–2021Q2 ---
    const idxQ4 = rows.findIndex(d => d.Year_Q === "2020-Q4");
    const idx21Q1 = rows.findIndex(d => d.Year_Q === "2021-Q1");
    const idx21Q2 = rows.findIndex(d => d.Year_Q === "2021-Q2");
    let traceHighlight2 = null;
    if (idxQ4 !== -1 && idx21Q1 !== -1 && idx21Q2 !== -1) {
        traceHighlight2 = {
        type: 'scatter',
        mode: 'lines+markers',
        x: [x[idxQ4], x[idx21Q1], x[idx21Q2]],
        y: [y[idxQ4], y[idx21Q1], y[idx21Q2]],
        line: { width: 4, color: '#a340f7' },
        marker: {
            size: [9, 0, 9],   // invisible en el medio (2021Q1)
            color: '#a340f7',
            opacity: 1,
            line: { width: 0 }
        },
        customdata: [quarterLabel[idxQ4], quarterLabel[idx21Q1], quarterLabel[idx21Q2]],
        hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.2f} ' + UNIT_LABEL + '<extra></extra>',
        name: ''
        };
    }

    // --- Tramo resaltado 2022Q4–2023Q1–2023Q2 ---
    const idx22Q1 = rows.findIndex(d => d.Year_Q === "2022-Q1");
    const idx22Q2 = rows.findIndex(d => d.Year_Q === "2022-Q2");
    const idx22Q3 = rows.findIndex(d => d.Year_Q === "2022-Q3");
    const idx22Q4 = rows.findIndex(d => d.Year_Q === "2022-Q4");
    let traceHighlight3 = null;
    if (idx22Q1 !== -1 && idx22Q2 !== -1 && idx22Q3 !== -1 && idx22Q4 !== -1) {
        traceHighlight3 = {
        type: 'scatter',
        mode: 'lines+markers',
        x: [x[idx22Q1], x[idx22Q2], x[idx22Q3], x[idx22Q4]],
        y: [y[idx22Q1], y[idx22Q2], y[idx22Q3], y[idx22Q4]],
        line: { width: 4, color: '#a340f7' }, // verde
        marker: {
            size: [9, 0, 0, 9],   // igual que en el tramo morado (oculta el punto intermedio)
            color: '#a340f7',
            opacity: 1,
            line: { width: 0 }
        },
        customdata: [quarterLabel[idx22Q1], quarterLabel[idx22Q2], quarterLabel[idx22Q3]],
        hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.2f} ' + UNIT_LABEL + '<extra></extra>',
        name: ''
        };
    }

    // --- Tramo resaltado 2024Q1–2024Q2 ---
    const idx24Q1 = rows.findIndex(d => d.Year_Q === "2024-Q1");
    const idx24Q2 = rows.findIndex(d => d.Year_Q === "2024-Q2");
    let traceHighlight4 = null;
    if (idx24Q1 !== -1 && idx24Q2 !== -1) {
        traceHighlight4 = {
        type: 'scatter',
        mode: 'lines+markers',
        x: [x[idx24Q1], x[idx24Q2]],
        y: [y[idx24Q1], y[idx24Q2]],
        line: { width: 4, color: '#2ecc71' }, // mismo verde
        marker: {
            size: [9, 9],
            color: '#2ecc71',
            opacity: 1,
            line: { width: 0 }
        },
        customdata: [quarterLabel[idx24Q1], quarterLabel[idx24Q2]],
        hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.2f} ' + UNIT_LABEL + '<extra></extra>',
        name: ''
        };
    }

    const layout = {
        title: {
        // text: '<b>Horas vistas en Twitch por trimestre</b>',
        text: '<b>Tiempo visualizado en streams de Twitch (en miles de años)</b>',
        font: { family: 'Arial, sans-serif', size: 28, color: '#333' }
        },
        xaxis: {
        type: 'date',
        tickformat: '%Y',
        dtick: 'M12',
        ticks: 'outside',
        showgrid: false
        },
        yaxis: {
        rangemode: 'tozero',
        tickformat: ',.0f',
        showgrid: false,
        showline: true,
        },
        margin: { l: 70, r: 20, t: 80, b: 80 },
        showlegend: false
    };

    const data = [traceMain];
    if (traceHighlight1) data.push(traceHighlight1);
    if (traceHighlight2) data.push(traceHighlight2);
    if (traceHighlight3) data.push(traceHighlight3);
    if (traceHighlight4) data.push(traceHighlight4);
    if (traceFortnite) data.push(traceFortnite)
    
    Plotly.newPlot('chart', data, layout, { staticPlot: true, responsive: true });
    })
    .catch(err => {
    console.error(err);
    document.getElementById('chart').innerHTML = 'Error cargando Dataset/datos_limpios.json';
    });