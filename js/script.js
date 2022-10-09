let listaAfiliados = [], listaUsers = [],
    selectTipoDocumento, campoNumeroDocumento, campoNombre, selectAfiliacion, campoPassword,
    selectTipoDocumentoAfiliado, campoNumeroDocumentoAfiliado, campoNombreAfiliado, campoFechaAfiliado,
    ultimoElementoContador, registroEncontrado, registroEditar,
    usuarioLogueado = null

const TIPO_DOCUMENTO = [
    "Cédula de Ciudadanía",     //0
    "Cédula de Extranjería",    //1
    "Tarjeta de Identidad0",    //2
    "Registro Civíl",           //3
    "Otro"                      //4
], ESPECIALIDAD = [
    "MÉDICO GENERAL",           //0
    "OFTALMOLOGÍA",             //1
    "PEDIATRÍA",                //2
    "GINECOLOGÍA",              //3
    "ODONTOLOGÍA"               //4
]

// 0
function leerLocalStorage() {
    listaUsers = []

    JSON.parse(localStorage.getItem('0')) !== null ?
        listaUsers = JSON.parse(localStorage.getItem('0'))
        :
        console.log("No hay localStorage en el momento");

    return listaUsers
}

// 1
function leerLocalStorageAfiliados() {
    listaAfiliados = []

    JSON.parse(localStorage.getItem('1')) !== null ?
        listaAfiliados = JSON.parse(localStorage.getItem('1'))
        :
        console.log("No hay localStorage en el momento");

    return listaAfiliados
}

//ALERTA
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message) =>{
    Swal.fire({
        icon: 'success',
        title:`${message}`,
        showConfirmButton: false,
        timerProgressBar:true,
        timer: 1000
      })
}

const alertT = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

/* const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
} */

function inicioSesion() {
    event.preventDefault()

    inicioUser = document.getElementById('inicioUser').value
    inicioPassword = document.getElementById('inicioPassword').value

    if (inicioUser != "" && inicioPassword != "") {
        listaUsers = leerLocalStorage()

        registroEncontrado = listaUsers.find(elemento => elemento.numeroDocumento == inicioUser)

        if (registroEncontrado) {
            if (registroEncontrado.numeroDocumento == inicioUser && registroEncontrado.password == inicioPassword) {
                usuarioLogueado = {
                    id: registroEncontrado.numeroDocumento,
                    user: registroEncontrado.nombre
                }
                sessionStorage.setItem('sesion', JSON.stringify(usuarioLogueado))

                Swal.fire({
                    icon: 'success',
                   title:'Bienvenido a nuestra plataforma',
                   showConfirmButton: false,
                   timer: 1500
             }),
             setTimeout(() => {
                window.location.href="index.html"
              }, "1000");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Datos incorrectos',
                  })
            }
        }else
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Datos incorrectos',
          })
    } else  Swal.fire({
          icon: 'info',
          title: 'Debes llenar ambos campos para ingresar',
        })
}

function limpiarFormulario() {
    try {
        document.getElementById('formularioRegistro').reset()
    } catch (error) { }
    try {
        document.getElementById('formularioRegistroAfiliados').reset()
    } catch (error) { }
    try {
        document.getElementById('').reset()
    } catch (error) { }
    try {
        document.getElementById('').reset()
    } catch (error) { }
}

function registrarUsuario() {
    event.preventDefault()

    selectTipoDocumento = document.getElementById('selectTipoDocumento').value
    campoNumeroDocumento = document.getElementById('campoNumeroDocumento').value
    campoNombre = document.getElementById('campoNombre').value.toUpperCase()
    campoPassword = document.getElementById('campoPassword').value

    if (campoNumeroDocumento != "" && campoNombre != "" && campoPassword != "") {
        listaUsers = leerLocalStorage()

        if (listaUsers.find(elemento => elemento.numeroDocumento == campoNumeroDocumento) == undefined) {
            listaUsers.push({
                tipoDocumento: selectTipoDocumento,
                numeroDocumento: campoNumeroDocumento,
                nombre: campoNombre,
                password: campoPassword
            },)
            localStorage.removeItem('0')
            localStorage.setItem('0', JSON.stringify(listaUsers))

            Swal.fire({
                icon: 'success',
               title:'Registro realizado con exito',
               showConfirmButton: false,
               timer: 1500
         })
        } else {
           Swal.fire({
                icon: 'warning',
               title:'El usuario ya existe y no puede ser agregado nuevamente',
               showConfirmButton: false,
               timer: 1500
         })
        }

        limpiarFormulario()
    } else Swal.fire({
        icon: 'info',
        title: 'Debes llenar todos los campos para continuar',
      })
      limpiarFormulario()
}

function registrarCitaAfiliado() {
    event.preventDefault()

    selectTipoDocumentoAfiliado = document.getElementById('selectTipoDocumentoAfiliado').options
    textoTipoDocumentoAfiliado = selectTipoDocumentoAfiliado[selectTipoDocumentoAfiliado.selectedIndex].text

    campoNumeroDocumentoAfiliado = document.getElementById('campoNumeroDocumentoAfiliado').value
    campoNombreAfiliado = document.getElementById('campoNombreAfiliado').value.toUpperCase()
    campoFechaAfiliado = document.getElementById('campoFechaAfiliado').value

    selectEspecialidadAfiliado = document.getElementById('selectEspecialidadAfiliado').options
    textoEspecialidadAfiliado = selectEspecialidadAfiliado[selectEspecialidadAfiliado.selectedIndex].text

    if (campoNumeroDocumentoAfiliado != "" && campoNombreAfiliado != "" && campoFechaAfiliado != "") {
        listaAfiliados = leerLocalStorageAfiliados()

        if (listaAfiliados.find(elemento => elemento.numeroDocumento == campoNumeroDocumentoAfiliado) == undefined) {
            listaAfiliados.push({
                tipoDocumento: textoTipoDocumentoAfiliado,
                numeroDocumento: campoNumeroDocumentoAfiliado,
                nombre: campoNombreAfiliado,
                fecha: campoFechaAfiliado,
                especialista: textoEspecialidadAfiliado
            },)
            localStorage.removeItem('1')
            localStorage.setItem('1', JSON.stringify(listaAfiliados))

            location.reload()
            
        } else {
            Swal.fire({
                icon: 'warning',
               title:'El afiliado ya existe y no puede ser agregado nuevamente',
               showConfirmButton: false,
               timer: 1500
         })
        }

        limpiarFormulario()
    } else Swal.fire({
        icon: 'warning',
       title:'Debes llenar cada uno de los campos',
       showConfirmButton: false,
       timer: 1500
 })
}

//COMPROBADOR DE SESIÓN
(function () {
    usuarioLogueado = JSON.parse(sessionStorage.getItem('sesion'))

    if (window.location.pathname != "/login.html" && usuarioLogueado == null) {
        window.location.href = "/login.html"
    } else { 
        document.getElementById('usuarioActivo').innerText = "Hola, "+usuarioLogueado.user
    }
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

    alertT("Registro eliminado.", "danger");

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

        registroEncontrado.numeroDocumento = campoNumeroDocumentoAfiliado
        registroEncontrado.nombre = campoNombreAfiliado
        registroEncontrado.fecha = campoFechaAfiliado

        selectEspecialidadAfiliadoUpdate = document.getElementById('selectEspecialidadAfiliadoUpdate').options
        console.log(selectEspecialidadAfiliadoUpdate[selectEspecialidadAfiliadoUpdate.selectedIndex].text);
        registroEncontrado.especialista = selectEspecialidadAfiliadoUpdate[selectEspecialidadAfiliadoUpdate.selectedIndex].text


        localStorage.removeItem('1')
        localStorage.setItem('1', JSON.stringify(listaAfiliados))

        location.reload()
    } else alert("Se deben llenar todos los campos para hacer una actualización","warning")
}