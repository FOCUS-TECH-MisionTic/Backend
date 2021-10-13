import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllUsers = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').find({}).limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
  if (
    
    Object.keys(datosUsuario).includes('nombre') &&
    Object.keys(datosUsuario).includes('apellido') &&
    Object.keys(datosUsuario).includes('correo') &&
    Object.keys(datosUsuario).includes('rol') &&
    Object.keys(datosUsuario).includes('estado')
  ) {
    const baseDeDatos = getDB();
    // implementar código para crear Usuarios en la BD
    await baseDeDatos.collection('Usuarios').insertOne(datosUsuario, callback);
  } else {
    return 'error';
  }
};

const consultarUsuario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').findOne({ _id: new ObjectId(id) }, callback);
};

const editarUsuario = async (id, edicion, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('Usuarios')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true}, callback);
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').deleteOne(filtroUsuario, callback);
};

export { queryAllUsers, crearUsuario, consultarUsuario, editarUsuario, eliminarUsuario };
