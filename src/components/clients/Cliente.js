import React from 'react'
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import clienteAxios from '../../config/axios';

const Cliente = ({ cliente }) => {
    //console.log(cliente.nombre);

    const { _id, nombre, apellido, empresa, email, telefono } = cliente;

    const eliminarCliente = id => {
        //llamado axios
        clienteAxios.delete(`/clientes/${_id}`)
            .then(res => {
                alertify.success(res.data.mensaje);
            })
    }

    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Tel: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
              Editar Cliente
          </Link>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCliente(_id)}
                >
                    <i className="fas fa-times"></i>
              Eliminar Cliente
          </button>
            </div>
        </li>
    )
}
export default Cliente;