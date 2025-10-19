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
        rows.sort((a,b) => {
            const [ya, qa] = a.Year_Q.split('-Q').map(Number);
            const [yb, qb] = b.Year_Q.split('-Q').map(Number);
            return ya - yb || qa - qb;
        });

        const x = rows.map(d => yearQToDateStr(d.Year_Q));
        const y = rows.map(d => Number(d.Avg_viewers));    
        const quarterLabel = rows.map(d => d.Year_Q);

        const traceMain = { type: 'scatter', mode: 'lines', x, y, line: { width: 3, color: '#0a0a0ac8' }, marker: { size: 7, color: '#0a0a0ac8' }, customdata: quarterLabel, hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>', name: '' };
        
        const idx17Q3 = rows.findIndex(d => d.Year_Q === "2017-Q3");
        const idx17Q4 = rows.findIndex(d => d.Year_Q === "2017-Q4");
        const idx18Q1 = rows.findIndex(d => d.Year_Q === "2018-Q1");
        const idx18Q2 = rows.findIndex(d => d.Year_Q === "2018-Q2");
        const idx18Q3 = rows.findIndex(d => d.Year_Q === "2018-Q3");
        let traceFortnite = null;
        if (idx17Q3 !== -1 && idx17Q4 !== -1 && idx18Q1 !== -1 && idx18Q2 !== -1 && idx18Q3 !== -1) {
            traceFortnite = { type: 'scatter', mode: 'lines+markers', x: [x[idx17Q3], x[idx17Q4], x[idx18Q1], x[idx18Q2], x[idx18Q3]], y: [y[idx17Q3], y[idx17Q4], y[idx18Q1], y[idx18Q2], y[idx18Q3]], line: { width: 4, color: '#a340f7' }, marker: { size: [9, 0, 0, 0, 9], color: '#a340f7', opacity: 1, line: { width: 0 } }, customdata: [quarterLabel[idx17Q3], quarterLabel[idx17Q4], quarterLabel[idx18Q1], quarterLabel[idx18Q2], quarterLabel[idx18Q3]], hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>', name: 'Fortnite' };
        }

        // ... (resto de la creación de trazas no cambia)
        const idxQ1 = rows.findIndex(d => d.Year_Q === "2020-Q1");
        const idxQ2 = rows.findIndex(d => d.Year_Q === "2020-Q2");
        let traceHighlight1 = null;
        if (idxQ1 !== -1 && idxQ2 !== -1) {
            traceHighlight1 = { type: 'scatter', mode: 'lines+markers', x: [x[idxQ1], x[idxQ2]], y: [y[idxQ1], y[idxQ2]], line: { width: 4, color: '#a340f7' }, marker: { size: 9, color: '#a340f7' }, customdata: [quarterLabel[idxQ1], quarterLabel[idxQ2]], hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>', name: 'covid' };
        }
        const idxQ4 = rows.findIndex(d => d.Year_Q === "2020-Q4");
        const idx21Q1 = rows.findIndex(d => d.Year_Q === "2021-Q1");
        const idx21Q2 = rows.findIndex(d => d.Year_Q === "2021-Q2");
        let traceHighlight2 = null;
        if (idxQ4 !== -1 && idx21Q1 !== -1 && idx21Q2 !== -1) {
            traceHighlight2 = { type: 'scatter', mode: 'lines+markers', x: [x[idxQ4], x[idx21Q1], x[idx21Q2]], y: [y[idxQ4], y[idx21Q1], y[idx21Q2]], line: { width: 4, color: '#a340f7' }, marker: { size: [9, 0, 9], color: '#a340f7', opacity: 1, line: { width: 0 } }, customdata: [quarterLabel[idxQ4], quarterLabel[idx21Q1], quarterLabel[idx21Q2]], hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>', name: 'covid_max' };
        }
        const idx22Q1 = rows.findIndex(d => d.Year_Q === "2022-Q1");
        const idx22Q2 = rows.findIndex(d => d.Year_Q === "2022-Q2");
        const idx22Q3 = rows.findIndex(d => d.Year_Q === "2022-Q3");
        const idx22Q4 = rows.findIndex(d => d.Year_Q === "2022-Q4");
        let traceHighlight3 = null;
        if (idx22Q1 !== -1 && idx22Q2 !== -1 && idx22Q3 !== -1 && idx22Q4 !== -1) {
            traceHighlight3 = { type: 'scatter', mode: 'lines+markers', x: [x[idx22Q1], x[idx22Q2], x[idx22Q3], x[idx22Q4]], y: [y[idx22Q1], y[idx22Q2], y[idx22Q3], y[idx22Q4]], line: { width: 4, color: '#b858a3ff' }, marker: { size: [9, 0, 0, 9], color: '#b858a3ff', opacity: 1, line: { width: 0 } }, customdata: [quarterLabel[idx22Q1], quarterLabel[idx22Q2], quarterLabel[idx22Q3], quarterLabel[idx22Q4]], hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>', name: 'covid_end' };
        }
        const idx24Q1 = rows.findIndex(d => d.Year_Q === "2024-Q1");
        const idx24Q2 = rows.findIndex(d => d.Year_Q === "2024-Q2");
        let traceHighlight4 = null;
        if (idx24Q1 !== -1 && idx24Q2 !== -1) {
            traceHighlight4 = { type: 'scatter', mode: 'lines+markers', x: [x[idx24Q1], x[idx24Q2]], y: [y[idx24Q1], y[idx24Q2]], line: { width: 4, color: '#b858a3ff' }, marker: { size: [9, 9], color: '#b858a3ff', opacity: 1, line: { width: 0 } }, customdata: [quarterLabel[idx24Q1], quarterLabel[idx24Q2]], hovertemplate: 'Periodo: %{customdata}<br>Valor: %{y:,.0f} ' + UNIT_LABEL + '<extra></extra>', name: 'kick' };
        }
        
        const layout = { title: { text: '<b>Espectadores promedio en Twitch</b>', font: { family: 'Arial, sans-serif', size: 32, color: '#333' } }, xaxis: { type: 'date', tickformat: '%Y', dtick: 'M12', ticks: 'outside', showgrid: false }, yaxis: { rangemode: 'tozero', showgrid: false, showline: true, tickvals: [1000000, 2000000, 3000000, 4000000, 5000000], ticktext: ['1', '2', '3', '4', '5'], title: 'Millones de espectadores', ticks: 'outside' }, margin: { l: 70, r: 20, t: 80, b: 80 }, showlegend: false };
        layout.annotations = [
            { x: x[idx17Q4], y: y[idx17Q4] + 2, text: 'Tendencia por los juegos<br><b>Battle Royale</b> y las<br><b>competiciones en vivo</b>', showarrow: true, arrowhead: 2, ax: 0, ay: -100, font: { size: 12 } },
            { x: x[idxQ1], y: y[idxQ1] - 8, text: 'Inicio del confinamiento<br>por <b>COVID-19</b> a nivel global', showarrow: true, arrowhead: 2, ax: 0, ay: 85, font: { size: 12 } },
            { x: x[idx21Q1], y: y[idx21Q1] + 2, text: '<b>Punto máximo del confinamiento</b><br>y auge de videojuegos como<br>Among Us y GTA Online', showarrow: true, arrowhead: 2, ax: 0, ay: -60, font: { size: 12 } },
            { x: x[idx22Q2], y: y[idx22Q2] - 2, text: 'Vuelta a la <b>presencialidad</b> en<br>diversas partes del mundo', showarrow: true, arrowhead: 2, ax: 0, ay: 65, font: { size: 12 } },
            { x: x[idx24Q1], y: y[idx24Q1] + 6, text: 'Lanzamiento de <b>Kick</b> y<br>sus contratos con los streamers<br>más populares de Twitch', showarrow: true, arrowhead: 2, ax: 0, ay: -60, font: { size: 12 } }
        ];
        
        const data = [traceMain];
        if (traceHighlight1) data.push(traceHighlight1); if (traceHighlight2) data.push(traceHighlight2); if (traceHighlight3) data.push(traceHighlight3); if (traceHighlight4) data.push(traceHighlight4); if (traceFortnite) data.push(traceFortnite);
        
        Plotly.newPlot('chart', data, layout, { scrollZoom: false, doubleClick: false, displaylogo: false, responsive: true, modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d'] });

        const chart = document.getElementById('chart');
        const miniChart = document.getElementById('miniChart');

        // =================================================================================
        // =========== INICIO DEL CÓDIGO MEJORADO PARA LA INTERACTIVIDAD ===================
        // =================================================================================
        
        const fortniteInfoBox = document.getElementById('fortniteInfo');
        const fortniteAudio = document.getElementById('fortniteAudio'); // <<<--- NUEVO: Obtenemos el elemento de audio
        let fortniteEventsAttached = false;

        function showFortniteInfo() {
            if (!fortniteInfoBox) return;
            const fortniteInfoTitle = fortniteInfoBox.querySelector('.info-title');
            const fortniteInfoImage = fortniteInfoBox.querySelector('.info-image');
            const fortniteInfoText = fortniteInfoBox.querySelector('.info-text');

            fortniteInfoImage.src = 'media/images/Fortnite.jpg';
            fortniteInfoImage.alt = 'Logo de Fortnite';
            fortniteInfoTitle.textContent = 'Fortnite';
            fortniteInfoText.textContent = 'El lanzamiento de Fortnite marcó un auge en los juegos tipo battle royale, popularizando las competencias en línea y los eventos en vivo, donde millones de jugadores y espectadores participaron, impulsando el crecimiento del gaming competitivo y el streaming.';
            
            fortniteInfoBox.style.display = 'block';

            if (fortniteAudio) { // <<<--- NUEVO: Si el audio existe...
                fortniteAudio.play(); // ...lo reproducimos.
            }
        }

        function hideFortniteInfo() {
            if (fortniteInfoBox) {
                fortniteInfoBox.style.display = 'none';
            }
            if (fortniteAudio) { // <<<--- NUEVO: Si el audio existe...
                fortniteAudio.pause(); // ...lo pausamos.
                fortniteAudio.currentTime = 0; // ...y lo reiniciamos al principio.
            }
        }

        function findAndAttachHoverEvents() {
            if (fortniteEventsAttached) return;
            const annotations = chart.querySelectorAll('.annotation-text');
            let found = false;
            annotations.forEach(anno => {
                if (anno.textContent.includes('Battle Royale')) {
                    anno.addEventListener('mouseover', showFortniteInfo);
                    anno.addEventListener('mouseout', hideFortniteInfo);
                    found = true;
                    fortniteEventsAttached = true;
                }
            });
            if (found) {
                chart.removeListener('plotly_afterplot', findAndAttachHoverEvents);
            }
        }
        
        chart.on('plotly_afterplot', findAndAttachHoverEvents);
        
        // =================================================================================
        // ======================== FIN DEL CÓDIGO MEJORADO ================================
        // =================================================================================

        let hideTimeout = null;
        chart.on('plotly_hover', function(data) {
            const traceName = data.points[0].data.name;
            clearTimeout(hideTimeout);
            
            if (traceName === 'Fortnite') { }
            else if (traceName == "covid"){ }
            else if (traceName == "covid_max"){ }
            else if (traceName == "covid_end"){ }
            else if (traceName == "kick"){
                miniChart.style.display = 'block';
                const hoverPeriod = data.points[0].customdata;
                const miniData = [{ x: ['Twitch', 'YouTube', 'Kick'], y: [80, 50, 20], type: 'bar', marker: { color: ['#a340f7', '#b858a3', '#0a0a0a'] } }];
                const miniLayout = { title: `<b>Plataformas más vistas en ${hoverPeriod}</b>`, margin: { t: 50, b: 40, l: 40, r: 20 }, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)' };
                Plotly.newPlot('miniChart', miniData, miniLayout, {displayModeBar: false});
            }
            else {
                miniChart.style.display = 'none';
            }
        });

        chart.on('plotly_unhover', function() {
            hideTimeout = setTimeout(() => {
                miniChart.style.display = 'none';
            }, 60000);
        });
    })
    .catch(err => {
        console.error(err);
        document.getElementById('chart').innerHTML = 'Error cargando Dataset/datos_limpios.json';
    });