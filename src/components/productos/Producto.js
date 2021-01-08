import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import clienteAxios from '../../config/axios';

const Producto = ({ producto }) => {
   // console.log(producto);

   const eliminarProducto = id => {

      clienteAxios.delete(`/productos/${_id}`)
         .then(res => {
            if (res.status === 200) {
               alertify.success(res.data.mensaje);
            }
         })


   }
   const { _id, nombre, precio, imagen } = producto;
   return (
      <li className="producto">
         <div className="info-producto">
            <p className="nombre">{nombre}</p>
            <p className="precio">${precio} </p>
            {
               imagen ? (
                  <img src={`http://localhost:5000/${imagen}`} alt="Imagen" />
               ) : null
            }
         </div>
         <div className="acciones">
            <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
               <i className="fas fa-pen-alt"></i>
              Editar Producto
          </Link>

            <button
               type="button"
               className="btn btn-rojo btn-eliminar"
               onClick={() => eliminarProducto(_id)}
            >
               <i className="fas fa-times"></i>
              Eliminar Producto
          </button>
         </div>
      </li>
   )
}
export default Producto;