import React, { useState, useEffect, Fragment } from 'react'
import alertify from 'alertifyjs';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const EditarProducto = (props) => {

  // obtener el ID
  const { id } = props.match.params;

  // producto = state, y funcion para actualizar
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  });

  // archivo = state, guardarArchivo = setState
  const [archivo, guardarArchivo] = useState('');

  // cuando el componente carga
  useEffect(() => {
    // consultar la api para traer el producto a editar
    const consultarAPI = async () => {
      const productoConsulta = await clienteAxios.get(`/productos/${id}`);
      guardarProducto(productoConsulta.data);
      // console.log(productoConsulta.data);
    }

    consultarAPI();
  }, [])

  //Editar un producto en la BD
  const editarProducto = async e => {
    e.preventDefault();

    // crear un formdata
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    // almacenarlo en la BD
    try {
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Lanzar una alerta
      if (res.status === 200) {
        alertify.success('Actualizado correctamente');
      }

      // redireccionar
      props.history.push('/productos');

    } catch (error) {
      console.log(error);
      // lanzar alerta
      alertify.error('Hubo un error');
    }
  }

  // leer los datos del formulario
  const leerInformacionProducto = e => {
    guardarProducto({
      // obtener una copia del state y agregar el nuevo
      ...producto,
      [e.target.name]: e.target.value
    })
  }

  // coloca la imagen en el state
  const leerArchivo = e => {
    guardarArchivo(e.target.files[0]);
  }
  const { nombre, precio, imagen } = producto;

  if (!nombre) return <Spinner />
  return (
    <Fragment>
      <h2>Editar Producto</h2>
      <form
        onSubmit={editarProducto}
      >
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
            defaultValue={nombre}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={leerInformacionProducto}
            defaultValue={precio}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {imagen ? (
            <img
              src={`http:///localhost:5000/${imagen}`}
              alt="imagen"
              width="300"
            />
          ) : null}
          <input
            type="file"
            name="imagen"
            onChange={leerArchivo}

          />
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Guardar Cambios" />
        </div>
      </form>
    </Fragment>
  )
}
export default withRouter(EditarProducto);