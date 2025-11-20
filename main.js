

/* 
*********************
******* ARUCO *******
*********************
*/

const idsAruco = [100, 200, 250, 300];

Protobject.Core.onReceived((order) => {
    if(order == 100)
    {
        updateBarChart(1.0);
    }
    else if(order == 200)
    {
        updateBarChart(2.0);
    }
    else if(order == 250)
    {
        updateBarChart(2.5);
    }
    else if(order == 300)
    {
        updateBarChart(3.0);
    }
})



const Q_START_MONTH = { 1: '01', 2: '04', 3: '07', 4: '10' };
const info_text = document.getElementById('click_porcentaje');

function yearQToDateStr(Year_Q) {
    const [yStr, qStr] = Year_Q.split('-Q');
    const y = Number(yStr);
    const q = Number(qStr);
    const mm = Q_START_MONTH[q] || '01';
    return `${y}-${mm}-01`;
}

let currentView = 'original'; // 'original', 'porcentaje'
let globalRows = [];

fetch('Dataset/avg_viewers_delta.json')
    .then(r => r.json())
    .then(rows => {
        rows.sort((a, b) => {
            const [ya, qa] = a.Year_Q.split('-Q').map(Number);
            const [yb, qb] = b.Year_Q.split('-Q').map(Number);
            return ya - yb || qa - qb;
        });

        globalRows = rows;
        renderChart('original');

        // Event listeners para los botones
        document.getElementById('btn_original').addEventListener('click', () => renderChart('original'));
        document.getElementById('btn_porcentaje').addEventListener('click', () => renderChart('porcentaje'));
    })
    .catch(err => {
        console.error(err);
        document.getElementById('chart').innerHTML = 'Error cargando Dataset/avg_viewers_delta.json';
    });

function renderChart(view) {
    
    if (view === 'porcentaje') info_text.style.display = 'block';
    else info_text.style.display = 'none';

    currentView = view;
    const rows = globalRows;

    const x = rows.map(d => yearQToDateStr(d.Year_Q));
    const quarterLabel = rows.map(d => d.Year_Q);

    let y, yAxisTitle, hoverTemplate, tickvals, ticktext;

    // Configuración según la vista
    if (view === 'original') {
        y = rows.map(d => Number(d.Avg_viewers));
        yAxisTitle = 'Millones de espectadores';
        hoverTemplate = 'Periodo: %{customdata}<br>Valor: %{y:,.0f} espectadores<extra></extra>';
        tickvals = [1000000, 2000000, 3000000, 4000000, 5000000];
        ticktext = ['1', '2', '3', '4', '5'];
    } else { // porcentaje
        y = rows.map(d => Number(d.Pct_change));
        yAxisTitle = 'Cambio porcentual (%)';
        hoverTemplate = 'Periodo: %{customdata}<br>Cambio: %{y:.2f}%<extra></extra>';
        tickvals = [-20, 0, 20, 40, 60, 80];
        ticktext = ['-20%', '0%', '20%', '40%', '60%', '80%'];
    }

    // Traza principal
    const traceMain = {
        type: 'scatter',
        mode: 'lines',
        x,
        y,
        hoverinfo: 'none',
        line: { width: 3, color: '#0a0a0ac8' },
        marker: { size: 7, color: '#0a0a0ac8' },
        customdata: quarterLabel,
        hovertemplate: hoverTemplate,
        name: ''
    };

    // Índices para highlights
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
            line: { width: 4, color: '#a340f7' },
            marker: { size: [9, 0, 0, 0, 9], color: '#a340f7', opacity: 1, line: { width: 0 } },
            hoverinfo: 'none',
            customdata: [quarterLabel[idx17Q3], quarterLabel[idx17Q4], quarterLabel[idx18Q1], quarterLabel[idx18Q2], quarterLabel[idx18Q3]],
            hovertemplate: hoverTemplate,
            name: 'Fortnite'
        };
    }

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
            hoverinfo: 'none',
            hovertemplate: hoverTemplate,
            name: 'covid'
        };
    }

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
            marker: { size: [9, 0, 9], color: '#a340f7', opacity: 1, line: { width: 0 } },
            customdata: [quarterLabel[idxQ4], quarterLabel[idx21Q1], quarterLabel[idx21Q2]],
            hoverinfo: 'none',
            hovertemplate: hoverTemplate,
            name: 'covid_max'
        };
    }

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
            line: { width: 4, color: '#b858a3ff' },
            marker: { size: [9, 0, 0, 9], color: '#b858a3ff', opacity: 1, line: { width: 0 } },
            customdata: [quarterLabel[idx22Q1], quarterLabel[idx22Q2], quarterLabel[idx22Q3], quarterLabel[idx22Q4]],
            hovertemplate: hoverTemplate,
            name: 'covid_end'
        };
    }

    const idx24Q1 = rows.findIndex(d => d.Year_Q === "2024-Q1");
    const idx24Q2 = rows.findIndex(d => d.Year_Q === "2024-Q2");

    let traceHighlight4 = null;
    if (idx24Q1 !== -1 && idx24Q2 !== -1) {
        traceHighlight4 = {
            type: 'scatter',
            mode: 'lines+markers',
            x: [x[idx24Q1], x[idx24Q2]],
            y: [y[idx24Q1], y[idx24Q2]],
            line: { width: 4, color: '#b858a3ff' },
            marker: { size: [9, 9], color: '#b858a3ff', opacity: 1, line: { width: 0 } },
            customdata: [quarterLabel[idx24Q1], quarterLabel[idx24Q2]],
            hovertemplate: hoverTemplate,
            name: 'kick'
        };
    }

    const layout = {
        hovermode: false,
        xaxis: {
            type: 'date',
            tickformat: '%Y',
            dtick: 'M12',
            ticks: 'outside',
            showgrid: false
        },
        yaxis: {
            rangemode: view === 'porcentaje' ? 'normal' : 'tozero',
            showgrid: false,
            showline: true,
            tickvals: tickvals,
            ticktext: ticktext,
            title: yAxisTitle,
            ticks: 'outside',
            zeroline: view === 'porcentaje' | 'original'
        },
        margin: { l: 70, r: 20, t: 80, b: 80 },
        showlegend: false
    };

    // Anotaciones con valores actualizados según la vista
    const arrowMultiplier = view === 'original' ? 1 : 3.2;
    layout.annotations = [
        { 
            x: x[idx17Q4], 
            y: y[idx17Q4] + (view === 'original' ? 20000 : 2), 
            text: 'Tendencia por los juegos<br><b>Battle Royale</b> y las<br><b>competiciones en vivo</b>', 
            showarrow: true, 
            arrowhead: 2, 
            ax: 0, 
            ay: -100 * arrowMultiplier, 
            font: { size: 14 }
        },
        { 
            x: x[idxQ1], 
            y: y[idxQ1] - (view === 'original' ? 40000 : 4), 
            text: 'Inicio del confinamiento<br>por <b>COVID-19</b> a nivel global', 
            showarrow: true, 
            arrowhead: 2, 
            ax: 0, 
            ay: 120 * arrowMultiplier, 
            font: { size: 14 }
        },
        { 
            x: x[idx21Q1], 
            y: y[idx21Q1] + (view === 'original' ? 20000 : 2), 
            text: '<b>Punto máximo del confinamiento</b><br>y auge de videojuegos como<br>Among Us y GTA Online', 
            showarrow: true, 
            arrowhead: 2, 
            ax: 0, 
            ay: -80 * arrowMultiplier, 
            font: { size: 14 }
        },
        { 
            x: x[idx22Q2], 
            y: y[idx22Q2] - (view === 'original' ? 20000 : 2), 
            text: 'Vuelta a la <b>presencialidad</b> en<br>diversas partes del mundo', 
            showarrow: true, 
            arrowhead: 2, 
            ax: 0, 
            ay: 85 * arrowMultiplier, 
            font: { size: 14 }
        },
        { 
            x: x[idx24Q1], 
            y: y[idx24Q1] + (view === 'original' ? 60000 : 1), 
            text: 'Lanzamiento de <b>Kick</b> y<br>sus contratos con los streamers<br>más populares de Twitch', 
            showarrow: true, 
            arrowhead: 2, 
            ax: 0, 
            ay: -80 * arrowMultiplier, 
            font: { size: 14 }
        }
    ];

    const data = [traceMain];
    if (traceHighlight1) data.push(traceHighlight1);
    if (traceHighlight2) data.push(traceHighlight2);
    if (traceHighlight3) data.push(traceHighlight3);
    if (traceHighlight4) data.push(traceHighlight4);
    if (traceFortnite) data.push(traceFortnite);

    Plotly.newPlot('chart', data, layout, {
        scrollZoom: false,
        doubleClick: false,
        displaylogo: false,
        responsive: true,
        staticPlot: true,
        modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d']
    });

    const chart = document.getElementById('chart');
    const infoPanel = document.getElementById('infoPanel');
    const infoAudio = document.getElementById('infoAudio');
    let eventsAttached = false;

    const ANNOTATION_DATA = {
        'Battle Royale': {
            imageSrc: 'media/images/Fortnite.jpg',
            audioSrc: 'media/sounds/FortniteOGLobbyMusic.mp3',
            title: 'Fortnite',
            text: 'El lanzamiento de Fortnite marcó un auge en los juegos tipo battle royale, popularizando las competencias en línea y los eventos en vivo, impulsando el crecimiento del gaming competitivo y el streaming.'
        },
        'COVID-19': {
            imageSrc: 'media/images/covid.jpg',
            audioSrc: 'media/sounds/sonido_tos_plague_inc.mp3',
            title: 'Inicio del Confinamiento',
            text: 'La pandemia global por COVID-19 forzó a millones de personas a quedarse en casa, disparando el consumo de entretenimiento digital y plataformas de streaming como Twitch.'
        },
        'Punto máximo': {
            imageSrc: 'media/images/Among_Us_art.jpg',
            audioSrc: 'media/sounds/Among Us Drip Theme Song.mp3',
            title: 'Auge de los "Party Games"',
            text: 'En el pico de la pandemia, juegos sociales como Among Us, Fall Guys y las series de GTA Online en Twitch se convirtieron en un fenómeno cultural, rompiendo récords de audiencia.'
        },
        'presencialidad': {
            imageSrc: 'media/images/vacuna.jpg',
            audioSrc: 'media/sounds/cafeteria.mp3',
            title: 'Vuelta a la Normalidad',
            text: 'A medida que las restricciones sanitarias se levantaron, eventos presenciales como conciertos y deportes volvieron, diversificando de nuevo las opciones de ocio y reduciendo el tiempo en pantalla.'
        },
        'Kick': {
            imageSrc: 'media/images/kick-vs-twitch.jpg',
            audioSrc: 'media/sounds/twitch_bits.mp3',
            title: 'La Competencia por los Creadores',
            text: 'La plataforma Kick irrumpió en el mercado ofreciendo contratos millonarios a grandes streamers de Twitch, iniciando una nueva "guerra del streaming" y fragmentando la audiencia.'
        }
    };

    function showInfoPanel(key) {
        const data = ANNOTATION_DATA[key];
        if (!data || !infoPanel) return;

        const infoTitle = infoPanel.querySelector('.info-title');
        const infoImage = infoPanel.querySelector('.info-image');
        const infoText = infoPanel.querySelector('.info-text');

        infoImage.src = data.imageSrc;
        infoTitle.textContent = data.title;
        infoText.textContent = data.text;
        infoPanel.style.display = 'block';

        if (infoAudio && data.audioSrc) {
            infoAudio.src = data.audioSrc;
            infoAudio.play().catch(e => console.error("Error al reproducir audio:", e));
        }
    }

    function hideInfoPanel() {
        if (infoPanel) {
            infoPanel.style.display = 'none';
        }
        if (infoAudio) {
            infoAudio.pause();
            infoAudio.currentTime = 0;
        }
    }

    function findAndAttachHoverEvents() {
        if (eventsAttached) return;

        const annotations = chart.querySelectorAll('.annotation-text');
        
        annotations.forEach(anno => {
            for (const key in ANNOTATION_DATA) {
                if (anno.textContent.includes(key)) {
                    anno.addEventListener('mouseover', (event) => {
                        event.stopPropagation();
                        showInfoPanel(key);
                    });
                    anno.addEventListener('mouseout', hideInfoPanel);
                }
            }
        });

        eventsAttached = true;
        if (eventsAttached) {
            chart.removeListener('plotly_afterplot', findAndAttachHoverEvents);
        }
    }

    chart.on('plotly_afterplot', findAndAttachHoverEvents);
    chart.on('plotly_hover', findAndAttachHoverEvents);
}

const buttons = document.querySelectorAll('#buttons_row button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active')); // quitamos "active" de todos
    btn.classList.add('active'); // activamos el botón clickeado
  });
});

// --- FISCALIZACIÓN (Gráfico de Barras) ---
const chartBarraDiv = document.getElementById('chart-barra');
const twitchColor = '#9146FF';

// Configuración inicial del gráfico de barras
var barData = [{
    x: ['Espectadores'], 
    y: [0],
    type: 'bar',
    width: 0.5,
    marker: {
        color: twitchColor
    },
    hoverinfo: 'none' 
}];

var barLayout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 50, b: 50, l: 60, r: 20 },
    yaxis: {
        range: [0, 3.5],
        tickvals: [1, 2, 3],
        ticktext: ['1M', '2M', '3M'],
        showgrid: false,
        zeroline: true,
        zerolinecolor: '#333',
        zerolinewidth: 2,
        tickfont: { family: 'Segoe UI', size: 14, color: '#666' },
        fixedrange: true
    },
    xaxis: {
        showgrid: false,
        zeroline: false,
        fixedrange: true,
        tickfont: {
            family: 'Segoe UI',
            size: 16,
            color: '#333',
            weight: 'bold'
        }
    },
    hovermode: false,
    transition: { duration: 800, easing: 'cubic-in-out' }
};

var barConfig = { 
    displayModeBar: false, 
    responsive: true,
    staticPlot: false
};

// Inicializar el gráfico de barras
Plotly.newPlot(chartBarraDiv, barData, barLayout, barConfig);

// Función para actualizar el gráfico de barras (accesible desde HTML)
window.updateBarChart = function(nuevoValor) {
    Plotly.animate(chartBarraDiv, {
        data: [{ y: [nuevoValor] }],
        traces: [0],
        layout: {}
    }, {
        transition: { duration: 800, easing: 'cubic-in-out' },
        frame: { duration: 800, redraw: false }
    });
};

// Event listener para el botón de Fiscalización
document.getElementById('btn_fiscalizacion').addEventListener('click', () => {
    document.querySelector('.charts-container').style.display = 'none';
    document.getElementById('fiscalizacion-container').style.display = 'flex';
    document.getElementById('click').style.display = 'none';
    document.getElementById('click_porcentaje').style.display = 'none';
});

// Modificar los event listeners originales para ocultar fiscalización
document.getElementById('btn_original').addEventListener('click', () => {
    document.querySelector('.charts-container').style.display = 'flex';
    document.getElementById('fiscalizacion-container').style.display = 'none';
    renderChart('original');
});

document.getElementById('btn_porcentaje').addEventListener('click', () => {
    document.querySelector('.charts-container').style.display = 'flex';
    document.getElementById('fiscalizacion-container').style.display = 'none';
    renderChart('porcentaje');
});