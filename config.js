//
Protobject.Aruco.start(100, 1);
Protobject.Aruco.showPreview({ top: 0, left: 0, width: 1280 / 3, height: 720 / 3 })

Protobject.Aruco.onData((data) => {
    const ids = [100, 200, 250, 300];
    let detected = [];
    
    for (const id of ids) {
        if (data[id]) {
            // Si el marcador está presente, guarda su id y posición en el eje Y
            detected.push({ 
                id: id, 
                y: data[id].position.y 
            });

            // Ordena los marcadores detectados en función de su posición en el eje Y (de arriba hacia abajo)
            detected.sort((a, b) => b.y - a.y);

            // Crea un nuevo array que contiene solo los IDs de los marcadores en el orden determinado
            let orderPosition = markers.map(marker => marker.id);

            // Envía los IDs ordenados al sistema principal
            Protobject.Core.send(orderPosition).to('index.html');
        }
    }

});