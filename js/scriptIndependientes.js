let listaEmpleador = [],
    //Select
    selectTipoDocumentoEmpleador, selectCiudadEmpleador, selectRegimenEmpleador,
    selectTipoDocumentoEmpleadorUpdate, selectCiudadEmpleadorUpdate, selectRegimenEmpleadorUpdate,
    //Auxiliar Select
    textoTipoDocumentoEmpleador, textoCiudadEmpleador, textoRegimenEmpleador,
    //Campo
    campoNumeroDocumentoEmpleador, campoDireccionEmpleador, campoEmailEmpleador, campoCodigoPostalEmpleador,
    campoNumeroDocumentoEmpleadorUpdate, campoEmpresaEmpleadorUpdate, campoDireccionEmpleadorUpdate, campoEmailEmpleadorUpdate, campoCodigoPostalEmpleadorUpdate,
    //Variables Auxiliares de información temporal
    checkFormulario, registroEncontrado, registroEditar, usuarioLogueado = null

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
], SEDE = [
    "NORTE",    //0
    "SUR",      //1
    "ESTE",     //2
    "OESTE",    //3
    "CENTRO"    //4
]

// 1
function leerLocalStorageAEmpleador() {
    listaEmpleador = []

    JSON.parse(localStorage.getItem('3')) !== null ?
        listaEmpleador = JSON.parse(localStorage.getItem('3'))
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

    checkFormulario = document.getElementById('checkEmpleador').checked
    console.log(checkFormulario);


    if (checkFormulario == true && 
        campoNumeroDocumentoEmpleador != "" &&
        campoEmpresaEmpleador != "" &&
        campoDireccionEmpleador != "" &&
        campoCodigoPostalEmpleador != "" &&
        campoEmailEmpleador != "") {

        listaEmpleador = leerLocalStorageAEmpleador()

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
            localStorage.removeItem('3')
            localStorage.setItem('3', JSON.stringify(listaEmpleador))

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
    //console.log(usuarioLogueado.user);

    if (window.location.pathname != "/login.html" && usuarioLogueado == null) {
        window.location.href = "/login.html"
    } else { 
        document.getElementById('usuarioActivo').innerText = "Hola, "+ usuarioLogueado.user
    }
})()

function destruirSesion() {
    sessionStorage.clear()
    window.location.href = "login.html"
}

//RECARGAR TABLAS
(function () {

    listaEmpleador = leerLocalStorageAEmpleador()

    //Imprime cada registro del LocalStorage en el <tbody> de la página index.html
    let tbodyAfiliados = document.getElementById('tbodyEmpleador')
    let tableRow, tdTipoDocumentoEmpleador, tdEmpresa, tdCiudadEmpleador, tdDireccionEmpleador, tdEmail, tdCodigoPostal, tdRegimen

    listaEmpleador.forEach(element => {
        tableRow = document.createElement('tr')

        tdTipoDocumentoEmpleador = document.createElement('td')
        tdTipoDocumentoEmpleador.innerText = element.tipoDocumento

        tdNumeroDocumentoEmpleador = document.createElement('td')
        tdNumeroDocumentoEmpleador.innerText = element.numeroDocumento

        tdEmpresa = document.createElement('td')
        tdEmpresa.innerText = element.empresa

        tdCiudadEmpleador = document.createElement('td')
        tdCiudadEmpleador.innerText = element.ciudad

        tdDireccionEmpleador = document.createElement('td')
        tdDireccionEmpleador.innerText = element.direccion

        tdEmail = document.createElement('td')
        tdEmail.innerText = element.email

        tdCodigoPostal = document.createElement('td')
        tdCodigoPostal.innerText = element.codigoPostal

        tdRegimen = document.createElement('td')
        tdRegimen.innerText = element.regimen

        accionEspecial = document.createElement('td')
        accionEspecial.innerHTML = `<button class='btn btn-warning click' id='${element.numeroDocumento}' onclick='cargarListaEmpleador(this.id)' data-bs-toggle='modal' data-bs-target='#modalRegistroEmpleador'>Editar/Eliminar</button>`

        tableRow.appendChild(tdTipoDocumentoEmpleador)
        tableRow.appendChild(tdNumeroDocumentoEmpleador)
        tableRow.appendChild(tdEmpresa)
        tableRow.appendChild(tdCiudadEmpleador)
        tableRow.appendChild(tdDireccionEmpleador)
        tableRow.appendChild(tdEmail)
        tableRow.appendChild(tdCodigoPostal)
        tableRow.appendChild(tdRegimen)
        tableRow.appendChild(accionEspecial)

        try {
            tbodyAfiliados.appendChild(tableRow)
        } catch (error) { }
    })

})()

function eliminarAfiliado() {
    event.preventDefault()

    listaEmpleador = leerLocalStorageAEmpleador()

    listaEmpleador = listaEmpleador.filter(registro => registro.numeroDocumento != registroEditar)

    localStorage.removeItem('3')
    localStorage.setItem('3', JSON.stringify(listaEmpleador))

    alert("Registro eliminado.", "danger");

    location.reload()
}

function cargarListaEmpleador(id) {
    event.preventDefault()

    listaEmpleador = leerLocalStorageAEmpleador()

    registroEncontrado = listaEmpleador.find(elemento => elemento.numeroDocumento == id)

    document.getElementById('selectTipoDocumentoEmpleadorUpdate').value = TIPO_DOCUMENTO.indexOf(registroEncontrado.tipoDocumento)

    document.getElementById('campoNumeroDocumentoEmpleadorUpdate').value = registroEncontrado.numeroDocumento
    document.getElementById('campoEmpresaEmpleadorUpdate').value = registroEncontrado.empresa

    document.getElementById('selectCiudadEmpleadorUpdate').value = CIUDAD.indexOf(registroEncontrado.ciudad)

    document.getElementById('campoDireccionEmpleadorUpdate').value = registroEncontrado.direccion
    document.getElementById('campoEmailEmpleadorUpdate').value = registroEncontrado.email
    document.getElementById('campoCodigoPostalEmpleadorUpdate').value = registroEncontrado.codigoPostal

    document.getElementById('selectRegimenEmpleadorUpdate').value = SEDE.indexOf(registroEncontrado.regimen)

    registroEditar = id
}

function actualizarEmpleador() {
    event.preventDefault()

    selectTipoDocumentoEmpleadorUpdate = document.getElementById('selectTipoDocumentoEmpleadorUpdate').options

    campoNumeroDocumentoEmpleadorUpdate = document.getElementById('campoNumeroDocumentoEmpleadorUpdate').value
    campoEmpresaEmpleadorUpdate = document.getElementById('campoEmpresaEmpleadorUpdate').value

    selectCiudadEmpleadorUpdate = document.getElementById('selectCiudadEmpleadorUpdate').options

    campoDireccionEmpleadorUpdate = document.getElementById('campoDireccionEmpleadorUpdate').value
    campoEmailEmpleadorUpdate = document.getElementById('campoEmailEmpleadorUpdate').value
    campoCodigoPostalEmpleadorUpdate = document.getElementById('campoCodigoPostalEmpleadorUpdate').value

    selectRegimenEmpleadorUpdate = document.getElementById('selectRegimenEmpleadorUpdate').options


    if (campoNumeroDocumentoEmpleadorUpdate != "" &&
        campoEmpresaEmpleadorUpdate != "" &&
        campoDireccionEmpleadorUpdate != "" &&
        campoEmailEmpleadorUpdate != "" &&
        campoCodigoPostalEmpleadorUpdate != "") {

        listaEmpleador = leerLocalStorageAEmpleador()

        registroEncontrado = listaEmpleador.find(elemento => elemento.numeroDocumento == registroEditar)

        registroEncontrado.tipoDocumento = selectTipoDocumentoEmpleadorUpdate[selectTipoDocumentoEmpleadorUpdate.selectedIndex].text

        registroEncontrado.numeroDocumento = campoNumeroDocumentoEmpleadorUpdate
        registroEncontrado.empresa = campoEmpresaEmpleadorUpdate.toUpperCase()

        registroEncontrado.ciudad = selectCiudadEmpleadorUpdate[selectCiudadEmpleadorUpdate.selectedIndex].text

        registroEncontrado.direccion = campoDireccionEmpleadorUpdate
        registroEncontrado.email = campoEmailEmpleadorUpdate
        registroEncontrado.codigoPostal = campoCodigoPostalEmpleadorUpdate

        registroEncontrado.regimen = selectRegimenEmpleadorUpdate[selectRegimenEmpleadorUpdate.selectedIndex].text


        localStorage.removeItem('3')
        localStorage.setItem('3', JSON.stringify(listaEmpleador))

        location.reload()
    } else alert("Se deben llenar todos los campos para hacer una actualización", "warning")
}