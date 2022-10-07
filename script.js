let listaAfiliados = [], selectTipoDocumento, campoNumeroDocumento, campoNombre, selectAfiliacion, campoPassword, ultimoElementoContador, registroEncontrado, usuarioLogueado

function leerLocalStorage() {
    listaAfiliados = []

    JSON.parse(localStorage.getItem(0)) !== null ?
        listaAfiliados = JSON.parse(localStorage.getItem(0))
        :
        console.log("No hay localStorage en el momento");

    return listaAfiliados
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

function inicioSesion() {
    event.preventDefault()

    inicioUser = document.getElementById('inicioUser').value
    inicioPassword = document.getElementById('inicioPassword').value

    if (inicioUser != "" && inicioPassword != "") {
        listaAfiliados = leerLocalStorage()

        registroEncontrado = listaAfiliados.find(elemento => elemento.numeroDocumento == inicioUser)

        if (registroEncontrado) {
            if (registroEncontrado.numeroDocumento == inicioUser && registroEncontrado.password == inicioPassword) {
                usuarioLogueado = {
                    id: registroEncontrado.numeroDocumento,
                    user: registroEncontrado.nombre
                }
                sessionStorage.setItem('sesion', JSON.stringify(usuarioLogueado))

                console.log(registroEncontrado.nombre);
                window.location.href = "index.html"
            } else {
                alert("Datos incorrectos.", "danger")
            }
        }
    } else alert("Debe llenar ambos campos para ingresar.", "info")
}

function registrarAfiliado() {
    event.preventDefault()

    selectTipoDocumento = document.getElementById('selectTipoDocumento').value
    campoNumeroDocumento = document.getElementById('campoNumeroDocumento').value
    campoNombre = document.getElementById('campoNombre').value.toUpperCase()
    selectAfiliacion = document.getElementById('selectAfiliacion').value
    campoPassword = document.getElementById('campoPassword').value

    if (campoNumeroDocumento != "" && campoNombre != "" && campoPassword != "") {
        listaAfiliados = leerLocalStorage()

        if (listaAfiliados.find(elemento => elemento.numeroDocumento == campoNumeroDocumento) == undefined) {
            listaAfiliados.push({
                tipoDocumento: selectTipoDocumento,
                numeroDocumento: campoNumeroDocumento,
                nombre: campoNombre,
                tipoAfiliacion: selectAfiliacion,
                password: campoPassword
            },)
            localStorage.clear()
            localStorage.setItem(0, JSON.stringify(listaAfiliados))

            alert("Registro realizado con exito.", "success")
        } else {
            alert("El afiliado ya existe y no puede ser añadido nuevamente", "danger")
        }

        document.getElementById('formularioRegistroAfiliados').reset()
    } else alert('Debes llenar cada uno de los campos', 'warning')
}

//COMPROBADOR DE SESIÓN
(function name() {

    if (window.location.pathname != "/login.html") {
        usuarioLogueado = JSON.parse(sessionStorage.getItem('sesion'))

        if (usuarioLogueado != null) {
            document.getElementById('usuarioActivo').innerText = "Hola, "+usuarioLogueado.user
        } else window.location.href = "login.html"
    }
})()

function destruirSesion() {
    sessionStorage.clear()
    window.location.href = "login.html"
}




// function eliminarCliente() {
//     event.preventDefault()

//     campoCedula = document.getElementById('campoCedula').value

//     if (campoCedula !== "") {
//         listaClientes = leerLocalStorage()

//         let registroEncontrado = listaClientes.find(elemento => elemento.cedula == campoCedula)

//         if (registroEncontrado !== undefined) {
//             listaClientes = listaClientes.filter(registro => registro.cedula !== registroEncontrado.cedula)

//             localStorage.clear()
//             localStorage.setItem(0, JSON.stringify(listaClientes))

//             alert(registroEncontrado.nombre + " fue eliminado.");
//         } else {
//             document.getElementById('campoNombre').value = ""
//             alert("Este cliente No existe.")
//         }
//     } else alert("Debe digitar una cédula existente para eliminar.")

//     document.getElementById('formularioClientes').reset()
// }

// function actualizarCliente() {
//     event.preventDefault()

//     campoCedula = document.getElementById('campoCedula').value

//     if (campoCedula !== "") {
//         listaClientes = leerLocalStorage()

//         let registroEncontrado = listaClientes.find(elemento => elemento.cedula == campoCedula)

//         if (registroEncontrado !== undefined) {

//             campoNombre = document.getElementById('campoNombre').value

//             alert(registroEncontrado.nombre + " fue actualizado a: " + campoNombre);
//             registroEncontrado.nombre = campoNombre

//             console.log(registroEncontrado);
//             console.log(listaClientes);

//             localStorage.clear()
//             localStorage.setItem(0, JSON.stringify(listaClientes))

//         } else {
//             document.getElementById('campoNombre').value = ""
//             alert("Este cliente No existe.")
//         }
//     } else alert("Debe llenar ambos campos para Actualizar.")

//     document.getElementById('formularioClientes').reset()
// }

// (function () {
//     listaClientes = leerLocalStorage()

//     //Imprime cada registro del LocalStorage en el <select> de la página ventas.html
//     let selectClientes = document.getElementById('selectClientes')
//     let clienteVenta
//     listaClientes.forEach((element) => {

//         clienteVenta = document.createElement('option')
//         clienteVenta.value = element.cedula
//         clienteVenta.text = element.nombre
//         try {
//             selectClientes.appendChild(clienteVenta)
//         } catch (error) { }
//     });




//     //Imprime cada registro del LocalStorage en el <tbody> de la página index.html
//     let tbodyClientes = document.getElementById('tbody')
//     let tableRow, clienteCedula, clienteNombre, clienteVentas, totalVentas, temporal = 0

//     listaClientes.forEach(element => {
//         tableRow = document.createElement('tr')

//         clienteCedula = document.createElement('td')
//         clienteCedula.innerText = element.cedula

//         clienteNombre = document.createElement('td')
//         clienteNombre.innerText = element.nombre

//         clienteVentas = document.createElement('td')

//         totalVentas = document.createElement('td')

//         element.ventas.forEach(element2 => {
//             clienteVentas.innerText += JSON.stringify(element2.producto) + ", "

//             //Se hace la sumatoria de las ventas por Cliente
//             temporal += parseInt(element2.valor)
//         });
//         totalVentas.innerText = temporal
//         temporal = 0

//         tableRow.appendChild(clienteCedula)
//         tableRow.appendChild(clienteNombre)
//         tableRow.appendChild(clienteVentas)
//         tableRow.appendChild(totalVentas)

//         try {
//             tbodyClientes.appendChild(tableRow)
//         } catch (error) { }
//     });

// })()


//Aqui se esconde como imprimir todas las ventas por 1 cliente
// function buscarVenta() {
//     event.preventDefault()

//     selectCliente = document.getElementById('selectClientes').value
//     //console.log(selectCliente);

//     campoID = document.getElementById('idVentas').value

//     if (campoID !== "") {
//         listaClientes = leerLocalStorage()

//         let registroEncontrado = listaClientes.find(elemento => elemento.cedula == selectCliente)
//         //console.log(registroEncontrado);
//         let ventaEncontrada = registroEncontrado.ventas.find(element => element.id == campoID)
//         //console.log(ventaEncontrada);

//         if (ventaEncontrada != undefined) {
//             campoProducto = document.getElementById('producto').value = ventaEncontrada.producto
//             campoFecha = document.getElementById('fecha').value = ventaEncontrada.fecha
//             campoValor = document.getElementById('valor').value = ventaEncontrada.valor
//         } else {
//             campoID = document.getElementById('idVentas').value = ""
//             alert("Ese registro no existe")
//         }
//     } else alert("El campo ID es requerido.")
// }

// function registrarVenta() {
//     event.preventDefault()

//     selectCliente = document.getElementById('selectClientes').value
//     //console.log(selectCliente);

//     //campoID = document.getElementById('idVentas').value
//     campoProducto = document.getElementById('producto').value
//     campoFecha = document.getElementById('fecha').value
//     campoValor = document.getElementById('valor').value

//     if (campoProducto !== "" && campoFecha !== "" && campoValor !== "") {
//         listaClientes = leerLocalStorage()

//         let registroEncontrado = listaClientes.find(elemento => elemento.cedula == selectCliente)
//         //console.log(registroEncontrado);

//         let cantidadElementosVentas = registroEncontrado.ventas.length
//         console.log("Cantidad de ventas: ", cantidadElementosVentas + 1);

//         try {
//             ultimoElementoContador = registroEncontrado.ventas[cantidadElementosVentas - 1].id
//             console.log("Ultimo id: " + ultimoElementoContador);
//         } catch (error) { }

//         if (cantidadElementosVentas <= 0) {
//             registroEncontrado.ventas.push({
//                 id: 0,
//                 producto: campoProducto,
//                 fecha: campoFecha,
//                 valor: campoValor
//             },)
//         } else if (cantidadElementosVentas > 0) {
//             registroEncontrado.ventas.push({
//                 id: ultimoElementoContador + 1,
//                 producto: campoProducto,
//                 fecha: campoFecha,
//                 valor: campoValor
//             },)
//         }

//         localStorage.clear()
//         localStorage.setItem(0, JSON.stringify(listaClientes))
//         alert("Se ha registrado la venta.")

//         //console.log(listaClientes);

//         document.getElementById('formularioVentas').reset()
//     } else alert("Debe llenar los campos para registrar una venta.")
// }

// function actualizarVenta() {
//     event.preventDefault()

//     selectCliente = document.getElementById('selectClientes').value
//     //console.log(selectCliente);

//     campoID = document.getElementById('idVentas').value

//     if (campoID !== "") {
//         listaClientes = leerLocalStorage()

//         let registroEncontrado = listaClientes.find(elemento => elemento.cedula == selectCliente)
//         //console.log(registroEncontrado);
//         let ventaEncontrada = registroEncontrado.ventas.find(element => element.id == campoID)
//         //console.log(ventaEncontrada);

//         if (ventaEncontrada != undefined) {
//             ventaEncontrada.producto = document.getElementById('producto').value
//             ventaEncontrada.fecha = document.getElementById('fecha').value
//             ventaEncontrada.valor = document.getElementById('valor').value

//             localStorage.clear()
//             localStorage.setItem(0, JSON.stringify(listaClientes))
//             alert("Se ha realizado la actualización.")
//         } else {
//             campoID = document.getElementById('idVentas').value = ""
//             alert("Ese registro no existe")
//         }
//     } else alert("El campo ID es requerido.")
// }

// function eliminarVenta() {
//     event.preventDefault()

//     selectCliente = document.getElementById('selectClientes').value
//     //console.log(selectCliente);

//     campoID = document.getElementById('idVentas').value

//     if (campoID !== "") {
//         listaClientes = leerLocalStorage()

//         let registroEncontrado = listaClientes.find(elemento => elemento.cedula == selectCliente)
//         //console.log(registroEncontrado);
//         if (registroEncontrado) {

//             registroEncontrado.ventas = registroEncontrado.ventas.filter(element => element.id != campoID)

//             localStorage.clear()
//             localStorage.setItem(0, JSON.stringify(listaClientes))

//             document.getElementById('formularioVentas').reset()

//             alert("Se ha eliminado el registro.")
//         }
//     } else alert("El campo ID es requerido.")
// }