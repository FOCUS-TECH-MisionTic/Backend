import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllProducts = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Productos').find({}).limit(50).toArray(callback);
};

const crearProducto = async (datosProducto, callback) => {
  if (
    Object.keys(datosProducto).includes('codigo') &&
    Object.keys(datosProducto).includes('producto') &&
    Object.keys(datosProducto).includes('modelo') &&
    Object.keys(datosProducto).includes('nucleos') &&
    Object.keys(datosProducto).includes('frecuencia') &&
    Object.keys(datosProducto).includes('stock') &&
    Object.keys(datosProducto).includes('precio')
  ) {
    const baseDeDatos = getDB();
    // implementar código para crear Productos en la BD
    await baseDeDatos.collection('Productos').insertOne(datosProducto, callback);
  } else {
    return 'error';
  }
};

const consultarProducto = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Productos').findOne({ _id: new ObjectId(id) }, callback);
};

const editarProducto = async (id, edicion, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('Productos')
    .findOneAndUpdate(filtroProducto, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarProducto = async (id, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Productos').deleteOne(filtroProducto, callback);
};

export { queryAllProducts, crearProducto, consultarProducto, editarProducto, eliminarProducto };
