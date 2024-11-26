const listaPaises = document.getElementById('countries-list');

// Obtener los datos de los países
const obtenerDatos = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3/all');
        const datos = await response.json();
        const ordenarPaises = datos.sort((a, b) => a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase()));

        // Llamar a la función para renderizar las banderas
        renderizarBanderas(ordenarPaises);
    } catch (error) {
        console.error('Error al obtener los datos de países', error);
    }
};

// Función para renderizar las banderas de los países
const renderizarBanderas = (listaPaisesOrdenada) => {
    console.log('Lista ordenada de países', listaPaisesOrdenada);
    listaPaises.innerHTML = '';

    listaPaisesOrdenada.forEach(pais => {
        const divPais = document.createElement('div');
        divPais.classList.add('pais');

        // Obtener la URL de la bandera
        const banderaUrl = pais.flags[0]; // Usar la primera URL de la bandera
        console.log('URL de la bandera:', banderaUrl); // Imprimir la URL de la bandera

        const imgBandera = document.createElement('img');
        imgBandera.src = banderaUrl;
        imgBandera.alt = `Bandera de ${pais.name.common}`;
        imgBandera.classList.add('bandera');

        const nombrePais = document.createElement('h3');
        nombrePais.textContent = pais.name.common;

        divPais.appendChild(imgBandera);
        divPais.appendChild(nombrePais);

        // Añadir evento click a la bandera
        divPais.addEventListener('click', () => {
            console.log(`Clic en la bandera de ${pais.name.common}`);
            mostrarInformacionPais(pais);
        });

        listaPaises.appendChild(divPais);
    });
};

// Función para mostrar la información del país en una ventana flotante
const mostrarInformacionPais = (pais) => {
    console.log(`Mostrando información del país: ${pais.name.common}`);

    // Crear la ventana flotante
    const ventanaFlotante = document.createElement('div');
    ventanaFlotante.classList.add('ventana-flotante');

    // Crear el contenido de la ventana flotante
    ventanaFlotante.innerHTML = `
        <div class='bandera-boton'>
            <img src='${pais.flags[0]}' alt='Bandera de ${pais.name.common}' class='bandera-información' width='150'>
            <button class='btnCerrar'>Cerrar</button>
        </div>
        <div class='texto-flotante'>
            <h2>${pais.name.common}</h2>
            <p><strong>Capital:</strong> ${pais.capital ? pais.capital : 'No disponible'}</p>
            <p><strong>Población:</strong> ${pais.population} hab.</p>
            <p><strong>Lado de la carretera:</strong> ${pais.car?.side || 'No disponible'}</p>
        </div>
    `;

    // Verificar que la ventana flotante se ha creado correctamente
    console.log("Ventana flotante creada:", ventanaFlotante);

    // Añadir la ventana flotante al body para mostrarla
    document.body.appendChild(ventanaFlotante);

    // Añadir evento click al botón de cerrar
    const btnCerrar = ventanaFlotante.querySelector('.btnCerrar');
    btnCerrar.addEventListener('click', () => {
        console.log("Ventana flotante cerrada");
        ventanaFlotante.remove();
    });
};

obtenerDatos();
