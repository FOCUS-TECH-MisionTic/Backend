import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';
import jwt_decode from 'jwt-decode';

const queryAllUsers = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').find({}).limit(50).toArray(callback);
};

// const crearUsuario = async (datosUsuario, callback) => {
//   if (
    
//     Object.keys(datosUsuario).includes('nombre') &&
//     Object.keys(datosUsuario).includes('apellido') &&
//     Object.keys(datosUsuario).includes('correo') &&
//     Object.keys(datosUsuario).includes('rol') &&
//     Object.keys(datosUsuario).includes('estado')
//   ) {
//     const baseDeDatos = getDB();
//     await baseDeDatos.collection('Usuarios').insertOne(datosUsuario, callback);
//   } else {
//     return 'error';
//   }
// };

const crearUsuario = async (datosUsuario, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').insertOne(datosUsuario, callback);
};

const consultarUsuario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').findOne({ _id: new ObjectId(id) }, callback);
};

const consultarOCrearUsuario = async (req, callback) => {
  // 6.1. obtener los datos del usuario desde el token
  const token = req.headers.authorization.split('Bearer ')[1];
  const user = jwt_decode(token)['http://localhost/userData'];
  console.log(user);

  // 6.2. con el correo del usuario o con el id de auth0, verificar si el usuario ya esta en la bd o no
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').findOne({ email: user.email }, async (err, response) => {
    console.log('response consulta bd', response);
    if (response) {
      // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
      callback(err, response);
    } else {
      // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
      user.auth0ID = user._id;
      delete user._id;
      user.rol = 'Sin Rol';
      user.estado = 'Pendiente';
      await crearUsuario(user, (err, respuesta) => callback(err, user));
    }
  });
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

export { queryAllUsers, crearUsuario, consultarUsuario, editarUsuario, eliminarUsuario, consultarOCrearUsuario };
