import React, { Fragment, useState } from 'react';
import clienteAxios from '../../config/axios';
import alertify from 'alertifyjs';
import { withRouter } from 'react-router-dom'


const NuevoCliente = ({history}) => {

    const [cliente, guardarcliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    //Leer los datos del form
    const actualizarState = e => {

        //Almacenar lo que el usuario escribe en el state
        guardarcliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
        // console.log(cliente);
    }

    //Añade en la API un cliente nuevo
    const agregarCliente = e => {
        e.preventDefault();

        //Enviar peticion axios
        clienteAxios.post('/clientes', cliente)
            .then(res => {
                // validar si hay errores de mongo
                if (res.data.code === 11000) {
                    alertify.error('Ese cliente ya existe');
                } else {
                    alertify.success(res.data.mensaje);
                }
                //Redireccionar
                history.push('/')
            })
    }

    //Validar el formulario
    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono } = cliente;

        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return valido;
    }

    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>
            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Cliente"
                        disabled={validarCliente()}
                    />
                </div>

            </form>
        </Fragment>
    )
}
export default withRouter(NuevoCliente);