import React, { Fragment, useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import alertify from 'alertifyjs';
import { withRouter } from 'react-router-dom'


const EditarCliente = (props) => {
    //obtener el id
    const { id } = props.match.params;
    //  console.log(id);

    const [cliente, datoscliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    //query a la API
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        // console.log(clienteConsulta.data);
        datoscliente(clienteConsulta.data);
    }

    //useEffect cuando el componente carga
    useEffect(() => {
        consultarAPI();
    }, []);

    //Leer los datos del form
    const actualizarState = e => {

        //Almacenar lo que el usuario escribe en el state
        datoscliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
        // console.log(cliente);
    }

    //Envia peticion axios para aactualizarCliente
    const actualizarCliente = e => {
        e.preventDefault();

        //Enviar por peticion axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                // validar si hay errores de mongo
                if (res.data.code === 11000) {
                    alertify.error('Ese cliente ya existe');
                } else {
                    alertify.success('Se actualizo correctamente');
                }
                //Redireccionar
                props.history.push('/')
            })
    }

    //Validar el formulario
    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono } = cliente;

        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return valido;
    }

    const { nombre, apellido, email, empresa, telefono } = cliente;

    return (
        <Fragment>
            <h2>Editar Cliente</h2>
            <form
                onSubmit={actualizarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={actualizarState}
                        value={nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={actualizarState}
                        value={apellido}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={actualizarState}
                        value={empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={actualizarState}
                        value={email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={actualizarState}
                        value={telefono}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarCliente()}
                    />
                </div>

            </form>
        </Fragment>
    )
}
export default withRouter(EditarCliente);