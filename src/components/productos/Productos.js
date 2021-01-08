import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios'
import Producto from './Producto';
import Spinner from '../layout/Spinner';

const Productos = () => {

    //Productos = state, guardarProductos = funcion para guardar en el state
    const [productos, Guardarproductos] = useState([]);

    //useEffect para consultar api cuando cargue
    useEffect(() => {
        const consultarApi = async () => {
            const productosConsulta = await clienteAxios.get('/productos');
            Guardarproductos(productosConsulta.data);
        }
        consultarApi();
    }, [productos]);

    //Spinner de carga
    if(!productos.length) return <Spinner/>


    return (
        <Fragment>
            <h1>Productos</h1>
            <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map(producto => (
                    <Producto
                        key={producto._id}
                        producto={producto}
                    />
                ))}

            </ul>
        </Fragment>
    )
}
export default Productos;