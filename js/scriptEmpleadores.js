let listaEmpleador = [],
    //Select
    selectTipoDocumentoEmpleador, selectCiudadEmpleador, selectRegimenEmpleador,
    //Auxiliar Select
    textoTipoDocumentoEmpleador, textoCiudadEmpleador, textoRegimenEmpleador,
    //Campo
    campoNumeroDocumentoEmpleador, campoDireccionEmpleador, campoEmailEmpleador, campoCodigoPostalEmpleador,

    ultimoElementoContador, registroEncontrado, registroEditar,
    usuarioLogueado = null

const TIPO_DOCUMENTO = [
    "Cédula de Ciudadanía",     //0
    "Cédula de Extranjería",    //1
    "Tarjeta de Identidad0",    //2
    "Registro Civíl",           //3
    "Otro"                      //4
], CIUDAD = [
    "CALI",         //0
    "MEDELLÍN",     //1
    "BOGOTÁ",       //2
    "BUGA",         //3
    "BUENAVENTURA"  //4
], REGIMEN = [
    "RESPONSABLE DE IVA",                   //0
    "PERSONA NATURAL RESPONSABLE DE IVA",   //1
    "ESPECIAL",                             //2
    "PERSONA NATURAL NO RESPONSABLE DE IVA" //3
]

// 1
function leerLocalStorageAfiliados() {
    listaEmpleador = []

    JSON.parse(localStorage.getItem('2')) !== null ?
        listaEmpleador = JSON.parse(localStorage.getItem('2'))
        :
        console.log("No hay localStorage en el momento");

    return listaEmpleador
}

//ALERTA
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}


function limpiarFormulario() {
    try {
        document.getElementById('formularioModificaEmpleador').reset()
    } catch (error) { }
    try {
        document.getElementById('formularioRegistroEmpleador').reset()
    } catch (error) { }
}

function registrarCitaEmpleador() {
    event.preventDefault()

    selectTipoDocumentoEmpleador = document.getElementById('selectTipoDocumentoEmpleador').options
    textoTipoDocumentoEmpleador = selectTipoDocumentoEmpleador[selectTipoDocumentoEmpleador.selectedIndex].text

    campoNumeroDocumentoEmpleador = document.getElementById('campoNumeroDocumentoEmpleador').value
    campoEmpresaEmpleador = document.getElementById('campoEmpresaEmpleador').value.toUpperCase()

    selectCiudadEmpleador = document.getElementById('selectCiudadEmpleador').options
    textoCiudadEmpleador = selectCiudadEmpleador[selectCiudadEmpleador.selectedIndex].text

    campoDireccionEmpleador = document.getElementById('campoDireccionEmpleador').value
    campoEmailEmpleador = document.getElementById('campoEmailEmpleador').value
    campoCodigoPostalEmpleador = document.getElementById('campoCodigoPostalEmpleador').value

    selectRegimenEmpleador = document.getElementById('selectRegimenEmpleador').options
    textoRegimenEmpleador = selectRegimenEmpleador[selectRegimenEmpleador.selectedIndex].text


    if (campoNumeroDocumentoEmpleador != "" &&
        campoEmpresaEmpleador != "" &&
        campoDireccionEmpleador != "" &&
        campoCodigoPostalEmpleador != "" &&
        campoEmailEmpleador != "") {

        listaEmpleador = leerLocalStorageAfiliados()

        if (listaEmpleador.find(elemento => elemento.numeroDocumento == campoNumeroDocumentoEmpleador) == undefined) {
            listaEmpleador.push({
                tipoDocumento: textoTipoDocumentoEmpleador,
                numeroDocumento: campoNumeroDocumentoEmpleador,
                empresa: campoEmpresaEmpleador,
                ciudad: textoCiudadEmpleador,
                direccion: campoDireccionEmpleador,
                email: campoEmailEmpleador,
                codigoPostal: campoCodigoPostalEmpleador,
                regimen: textoRegimenEmpleador
            },)
            localStorage.removeItem('2')
            localStorage.setItem('2', JSON.stringify(listaEmpleador))

            location.reload()
        } else {
            alert("El afiliado ya existe y no puede ser añadido nuevamente", "danger")
        }

        limpiarFormulario()
    } else alert('Debes llenar cada uno de los campos', 'warning')
}

//COMPROBADOR DE SESIÓN
(function () {
    usuarioLogueado = JSON.parse(sessionStorage.getItem('sesion'))

    if (window.location.pathname != "/login.html" && usuarioLogueado == null) {
        window.location.href = "/login.html"
    } else { }

})()

function destruirSesion() {
    sessionStorage.clear()
    window.location.href = "login.html"
}

//RECARGAR TABLAS
(function () {

    listaAfiliados = leerLocalStorageAfiliados()

    //Imprime cada registro del LocalStorage en el <tbody> de la página index.html
    let tbodyAfiliados = document.getElementById('tbodyAfiliados')
    let tableRow, tdTipoDocumentoAfiliado, tdNumeroDocumentoAfiliado, tdNombreAfiliado, tdFechaAfiliado, tdEspecialidadAfiliado, accionEspecial

    listaAfiliados.forEach(element => {
        tableRow = document.createElement('tr')

        tdTipoDocumentoAfiliado = document.createElement('td')
        tdTipoDocumentoAfiliado.innerText = element.tipoDocumento

        tdNumeroDocumentoAfiliado = document.createElement('td')
        tdNumeroDocumentoAfiliado.innerText = element.numeroDocumento

        tdNombreAfiliado = document.createElement('td')
        tdNombreAfiliado.innerText = element.nombre

        tdFechaAfiliado = document.createElement('td')
        tdFechaAfiliado.innerText = element.fecha

        tdEspecialidadAfiliado = document.createElement('td')
        tdEspecialidadAfiliado.innerText = element.especialista

        accionEspecial = document.createElement('td')
        accionEspecial.innerHTML = `<button class='btn btn-warning click' id='${element.numeroDocumento}' onclick='cargarListaAfiliados(this.id)' data-bs-toggle='modal' data-bs-target='#modalRegistroAfiliados'>Editar/Eliminar</button>`

        tableRow.appendChild(tdTipoDocumentoAfiliado)
        tableRow.appendChild(tdNumeroDocumentoAfiliado)
        tableRow.appendChild(tdNombreAfiliado)
        tableRow.appendChild(tdFechaAfiliado)
        tableRow.appendChild(tdEspecialidadAfiliado)
        tableRow.appendChild(accionEspecial)

        try {
            tbodyAfiliados.appendChild(tableRow)
        } catch (error) { }
    })

})()

function eliminarAfiliado() {
    event.preventDefault()

    listaAfiliados = leerLocalStorageAfiliados()

    listaAfiliados = listaAfiliados.filter(registro => registro.numeroDocumento != registroEditar)

    localStorage.removeItem('1')
    localStorage.setItem('1', JSON.stringify(listaAfiliados))

    alert("Registro eliminado.", "danger");

    location.reload()
}

function cargarListaAfiliados(id) {
    event.preventDefault()

    listaAfiliados = leerLocalStorageAfiliados()

    let registroEncontrado = listaAfiliados.find(elemento => elemento.numeroDocumento == id)

    //console.log(TIPO_DOCUMENTO.indexOf(registroEncontrado.tipoDocumento));
    document.getElementById('selectTipoDocumentoAfiliadoUpdate').value = TIPO_DOCUMENTO.indexOf(registroEncontrado.tipoDocumento)

    document.getElementById('campoNumeroDocumentoAfiliadoUpdate').value = registroEncontrado.numeroDocumento
    document.getElementById('campoNombreAfiliadoUpdate').value = registroEncontrado.nombre
    document.getElementById('campoFechaAfiliadoUpdate').value = registroEncontrado.fecha

    //console.log(TIPO_DOCUMENTO.indexOf(registroEncontrado.especialista));
    document.getElementById('selectEspecialidadAfiliadoUpdate').value = ESPECIALIDAD.indexOf(registroEncontrado.especialista)

    registroEditar = id
}

function actualizarAfiliado() {
    event.preventDefault()

    campoNumeroDocumentoAfiliado = document.getElementById('campoNumeroDocumentoAfiliadoUpdate').value
    campoNombreAfiliado = document.getElementById('campoNombreAfiliadoUpdate').value.toUpperCase()
    campoFechaAfiliado = document.getElementById('campoFechaAfiliadoUpdate').value

    if (campoNumeroDocumentoAfiliado != "" && campoNombreAfiliado != "" && campoFechaAfiliado != "") {
        listaAfiliados = leerLocalStorageAfiliados()

        let registroEncontrado = listaAfiliados.find(elemento => elemento.numeroDocumento == registroEditar)

        selectTipoDocumentoAfiliadoUpdate = document.getElementById('selectTipoDocumentoAfiliadoUpdate').options
        registroEncontrado.tipoDocumento = selectTipoDocumentoAfiliadoUpdate[selectTipoDocumentoAfiliadoUpdate.selectedIndex].text

        registroEncontrado.numeroDocumento = document.getElementById('campoNumeroDocumentoAfiliadoUpdate').value
        registroEncontrado.nombre = document.getElementById('campoNombreAfiliadoUpdate').value
        registroEncontrado.fecha = document.getElementById('campoFechaAfiliadoUpdate').value

        selectEspecialidadAfiliadoUpdate = document.getElementById('selectEspecialidadAfiliadoUpdate').options
        console.log(selectEspecialidadAfiliadoUpdate[selectEspecialidadAfiliadoUpdate.selectedIndex].text);
        registroEncontrado.especialista = selectEspecialidadAfiliadoUpdate[selectEspecialidadAfiliadoUpdate.selectedIndex].text


        localStorage.removeItem('1')
        localStorage.setItem('1', JSON.stringify(listaAfiliados))

        location.reload()
    } else alert("Se deben llenar todos los campos para hacer una actualización", "warning")
}