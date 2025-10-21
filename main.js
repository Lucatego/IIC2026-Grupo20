const Q_START_MONTH = { 1: '01', 2: '04', 3: '07', 4: '10' };

function yearQToDateStr(Year_Q) {
    const [yStr, qStr] = Year_Q.split('-Q');
    const y = Number(yStr);
    const q = Number(qStr);
    const mm = Q_START_MONTH[q] || '01';
    return `${y}-${mm}-01`;
}

const UNIT_LABEL = 'espectadores';

fetch('Dataset/avg_viewers.json')
    .then(r => r.json())
    .then(rows => {
        // Ordena los datos por año y trimestre
        rows.sort((a, b) => {
            const [ya, qa] = a.Year_Q.split('-Q').map(Number);
            const [yb, qb] = b.Year_Q.split('-Q').map(Number);
            return ya - yb || qa - qb;
        });

        const x = rows.map(d => yearQToDateStr(d.Year_Q));
        const y = rows.map(d => Number(d.Avg_viewers));    
        const quarterLabel = rows.map(d => d.Year_Q);

        // Trazas principales
        const traceMain = {
            type: 'scatter',
            mode: 'lines',
            x,
            y,
            hoverinfo: 'none',
            line: { width: 3, color: '#0a0a0ac8' },
            marker: { size: 7, color: '#0a0a0ac8' },
            customdata: quarterLabel,
            hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>',
            name: ''
        };

        // Definición de trazas destacadas
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
                hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>',
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
                hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>',
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
                hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>',
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
                hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>',
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
                hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>',
                name: 'kick'
            };
        }

        const layout = {
            title: {
                text: '<b>Espectadores promedio en Twitch</b>',
                font: { family: 'Arial, sans-serif', size: 32, color: '#333' }
            },
            hovermode: false,  // Desactiva el hover globalmente
            xaxis: {
                type: 'date',
                tickformat: '%Y',
                dtick: 'M12',
                ticks: 'outside',
                showgrid: false
            },
            yaxis: {
                rangemode: 'tozero',
                showgrid: false,
                showline: true,
                tickvals: [1000000, 2000000, 3000000, 4000000, 5000000],
                ticktext: ['1', '2', '3', '4', '5'],
                title: 'Millones de espectadores',
                ticks: 'outside'
            },
            margin: { l: 70, r: 20, t: 80, b: 80 },
            showlegend: false
        };

        layout.annotations = [
            { 
                x: x[idx17Q4], 
                y: y[idx17Q4] + 2, 
                text: 'Tendencia por los juegos<br><b>Battle Royale</b> y las<br><b>competiciones en vivo</b>', 
                showarrow: true, 
                arrowhead: 2, 
                ax: 0, 
                ay: -100, 
                font: { size: 12 }
            },
            { 
                x: x[idxQ1], 
                y: y[idxQ1] - 8, 
                text: 'Inicio del confinamiento<br>por <b>COVID-19</b> a nivel global', 
                showarrow: true, 
                arrowhead: 2, 
                ax: 0, 
                ay: 85, 
                font: { size: 12 }
            },
            { 
                x: x[idx21Q1], 
                y: y[idx21Q1] + 2, 
                text: '<b>Punto máximo del confinamiento</b><br>y auge de videojuegos como<br>Among Us y GTA Online', 
                showarrow: true, 
                arrowhead: 2, 
                ax: 0, 
                ay: -60, 
                font: { size: 12 }
            },
            { 
                x: x[idx22Q2], 
                y: y[idx22Q2] - 2, 
                text: 'Vuelta a la <b>presencialidad</b> en<br>diversas partes del mundo', 
                showarrow: true, 
                arrowhead: 2, 
                ax: 0, 
                ay: 65, 
                font: { size: 12 }
            },
            { 
                x: x[idx24Q1], 
                y: y[idx24Q1] + 6, 
                text: 'Lanzamiento de <b>Kick</b> y<br>sus contratos con los streamers<br>más populares de Twitch', 
                showarrow: true, 
                arrowhead: 2, 
                ax: 0, 
                ay: -60, 
                font: { size: 12 }
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

        // Base de datos centralizada para las anotaciones
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
                            event.stopPropagation();  // Esto evitará que el hover se dispare en elementos padre
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
    })
    .catch(err => {
        console.error(err);
        document.getElementById('chart').innerHTML = 'Error cargando Dataset/datos_limpios.json';
    });
