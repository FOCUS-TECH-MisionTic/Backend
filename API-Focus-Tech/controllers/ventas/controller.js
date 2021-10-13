import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllSales = async (callback) => {
  const baseDeDatos = getDB();
  console.log('query');
  await baseDeDatos.collection('Ventas').find({}).limit(50).toArray(callback);
};

const crearVenta = async (datosVenta, callback) => {
  if (
    Object.keys(datosVenta).includes('fecha') &&
    Object.keys(datosVenta).includes('producto') &&
    Object.keys(datosVenta).includes('cantidad') &&
    Object.keys(datosVenta).includes('cliente') &&
    Object.keys(datosVenta).includes('vendedor') &&
    Object.keys(datosVenta).includes('estado') &&
    Object.keys(datosVenta).includes('total')
  ) {
    const baseDeDatos = getDB();
    // Código para crear Productos en la BD
    await baseDeDatos.collection('Ventas').insertOne(datosVenta, callback);
  } else {
    return 'error';
  }
};

const consultarVenta = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Ventas').findOne({ _id: new ObjectId(id) }, callback);
};

const editarVenta = async (id, edicion, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('Ventas')
    .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarVenta = async (id, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Ventas').deleteOne(filtroVenta, callback);
};

export { queryAllSales, crearVenta, consultarVenta, editarVenta, eliminarVenta };
