require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const clientes = [
  {
    nombre: "María",
    apellidoPaterno: "López",
    apellidoMaterno: "García",
    curp: "LOGM010203MSPRRNA4",
    telefono: "6121234567",
    correo: "maria.lopez@nexus.com",
    direccion: "La Paz, Baja California Sur",
    fechaRegistro: new Date("2026-01-15"),
    estatus: "activo"
  },
  {
    nombre: "José",
    apellidoPaterno: "Martínez",
    apellidoMaterno: "Ruiz",
    curp: "MARJ950714HBCXZS7",
    telefono: "6121234568", 
    correo: "jose.martinez@nexus.com",
    direccion: "Los Cabos, Baja California Sur",
    fechaRegistro: new Date("2026-01-16"),
    estatus: "activo"
  },
  {
    nombre: "Ana",
    apellidoPaterno: "Torres",
    apellidoMaterno: "Hernández",
    curp: "TOHA980621MPLRNN5",
    telefono: "6121234569",
    correo: "ana.torres@nexus.com",
    direccion: "Comondú, Baja California Sur",
    fechaRegistro: new Date("2026-01-17"),
    estatus: "activo"
  },
  {
    nombre: "Carlos",
    apellidoPaterno: "Sánchez",
    apellidoMaterno: "Pérez",
    curp: "SAPC920315HDFNRL8",
    telefono: "6121234570",
    correo: "carlos.sanchez@nexus.com",
    direccion: "La Paz, Baja California Sur",
    fechaRegistro: new Date("2026-01-18"),
    estatus: "activo"
  },
  {
    nombre: "Fernanda",
    apellidoPaterno: "Ramírez",
    apellidoMaterno: "Soto",
    curp: "RASF990808MBCMTR6",
    telefono: "6121234571",
    correo: "fernanda.ramirez@nexus.com",
    direccion: "Loreto, Baja California Sur",
    fechaRegistro: new Date("2026-01-19"),
    estatus: "activo"
  },
  {
    nombre: "Luis",
    apellidoPaterno: "Gómez",
    apellidoMaterno: "Navarro",
    curp: "GONL940127HSLVVR3",
    telefono: "6121234572",
    correo: "luis.gomez@nexus.com",
    direccion: "Mulegé, Baja California Sur",
    fechaRegistro: new Date("2026-01-20"),
    estatus: "activo"
  },
  {
    nombre: "Daniela",
    apellidoPaterno: "Cruz",
    apellidoMaterno: "Ortega",
    curp: "CUOD000411MBCRRG9",
    telefono: "6121234573",
    correo: "daniela.cruz@nexus.com",
    direccion: "La Paz, Baja California Sur",
    fechaRegistro: new Date("2026-01-21"),
    estatus: "activo"
  },
  {
    nombre: "Miguel",
    apellidoPaterno: "Herrera",
    apellidoMaterno: "Castro",
    curp: "HECM970922HJCNRS2",
    telefono: "6121234574",
    correo: "miguel.herrera@nexus.com",
    direccion: "Los Cabos, Baja California Sur",
    fechaRegistro: new Date("2026-01-22"),
    estatus: "activo"
  },
  {
    nombre: "Sofía",
    apellidoPaterno: "Mendoza",
    apellidoMaterno: "Flores",
    curp: "MEFS030115MBSNLR1",
    telefono: "6121234575",
    correo: "sofia.mendoza@nexus.com",
    direccion: "Comondú, Baja California Sur",
    fechaRegistro: new Date("2026-01-23"),
    estatus: "activo"
  },
  {
    nombre: "Ricardo",
    apellidoPaterno: "Vázquez",
    apellidoMaterno: "Molina",
    curp: "VAMR960530HPLZRC4",
    telefono: "6121234576",
    correo: "ricardo.vazquez@nexus.com",
    direccion: "Loreto, Baja California Sur",
    fechaRegistro: new Date("2026-01-24"),
    estatus: "activo"
  }
];

const cuentas = [
  {
    numeroCuenta: "1002003001",
    tipoCuenta: "debito",
    saldo: 12500,
    moneda: "MXN",
    fechaApertura: new Date("2026-01-15"),
    estatus: "activa",
    curpCliente: "LOGM010203MSPRRNA4"
  },
  {
    numeroCuenta: "1002003002",
    tipoCuenta: "ahorro",
    saldo: 18400,
    moneda: "MXN",
    fechaApertura: new Date("2026-01-16"),
    estatus: "activa",
    curpCliente: "MARJ950714HBCXZS7"
  },
  {
    numeroCuenta: "1002003003",
    tipoCuenta: "nomina",
    saldo: 9600,
    moneda: "MXN",
    fechaApertura: new Date("2026-01-17"),
    estatus: "activa",
    curpCliente: "TOHA980621MPLRNN5"
  },
  {
    numeroCuenta: "1002003004",
    tipoCuenta: "debito",
    saldo: 15000,
    moneda: "MXN",
    fechaApertura: new Date("2026-01-18"),
    estatus: "activa",
    curpCliente: "SAPC920315HDFNRL8"
  },
  {
    numeroCuenta: "1002003005",
    tipoCuenta: "ahorro",
    saldo: 22350,
    moneda: "MXN",
    fechaApertura: new Date("2026-01-19"),
    estatus: "activa",
    curpCliente: "RASF990808MBCMTR6"
  },
  {
    numeroCuenta: "1002003006",
    tipoCuenta: "nomina",
    saldo: 11750,
    moneda: "MXN",
    fechaApertura: new Date("2026-01-20"),
    estatus: "activa",
    curpCliente: "GONL940127HSLVVR3"
  },
  {
    numeroCuenta: "1002003007",
    tipoCuenta: "debito",
    saldo: 8750,
    moneda: "MXN",
    fechaApertura: new Date("2026-01-21"),
    estatus: "activa",
    curpCliente: "CUOD000411MBCRRG9"
  },
  {
    numeroCuenta: "1002003008",
    tipoCuenta: "ahorro",
    saldo: 30500,
    moneda: "MXN",
    fechaApertura: new Date("2026-01-22"),
    estatus: "activa",
    curpCliente: "HECM970922HJCNRS2"
  },
  {
    numeroCuenta: "1002003009",
    tipoCuenta: "nomina",
    saldo: 10200,
    moneda: "MXN",
    fechaApertura: new Date("2026-01-23"),
    estatus: "activa",
    curpCliente: "MEFS030115MBSNLR1"
  },
  {
    numeroCuenta: "1002003010",
    tipoCuenta: "debito",
    saldo: 13480,
    moneda: "MXN",
    fechaApertura: new Date("2026-01-24"),
    estatus: "activa",
    curpCliente: "VAMR960530HPLZRC4"
  }
];

const transacciones = [
  {
    numeroCuenta: "1002003001",
    tipo: "deposito",
    monto: 5000,
    fecha: new Date("2026-02-01T09:00:00"),
    descripcion: "Depósito inicial",
    saldoPosterior: 5000,
    sucursal: {
      codigo: "LPZ-001",
      nombre: "Sucursal La Paz Centro",
      ciudad: "La Paz",
      estado: "Baja California Sur",
      tipoOrigen: "matriz"
    }
  },
  {
    numeroCuenta: "1002003001",
    tipo: "deposito",
    monto: 7500,
    fecha: new Date("2026-02-05T11:30:00"),
    descripcion: "Depósito en ventanilla",
    saldoPosterior: 12500,
    sucursal: {
      codigo: "CSL-002",
      nombre: "Sucursal Cabo San Lucas",
      ciudad: "Los Cabos",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003002",
    tipo: "deposito",
    monto: 20000,
    fecha: new Date("2026-02-02T10:15:00"),
    descripcion: "Transferencia recibida",
    saldoPosterior: 20000,
    sucursal: {
      codigo: "LPZ-002",
      nombre: "Sucursal La Paz Forjadores",
      ciudad: "La Paz",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003002",
    tipo: "retiro",
    monto: 1600,
    fecha: new Date("2026-02-06T13:20:00"),
    descripcion: "Retiro en cajero",
    saldoPosterior: 18400,
    sucursal: {
      codigo: "CSL-002",
      nombre: "Sucursal Cabo San Lucas",
      ciudad: "Los Cabos",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003003",
    tipo: "deposito",
    monto: 12000,
    fecha: new Date("2026-02-03T08:45:00"),
    descripcion: "Depósito de nómina",
    saldoPosterior: 12000,
    sucursal: {
      codigo: "COM-004",
      nombre: "Sucursal Comondú",
      ciudad: "Comondú",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003003",
    tipo: "retiro",
    monto: 2400,
    fecha: new Date("2026-02-07T18:10:00"),
    descripcion: "Pago de servicios",
    saldoPosterior: 9600,
    sucursal: {
      codigo: "COM-004",
      nombre: "Sucursal Comondú",
      ciudad: "Comondú",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003004",
    tipo: "deposito",
    monto: 18000,
    fecha: new Date("2026-02-04T09:30:00"),
    descripcion: "Depósito inicial",
    saldoPosterior: 18000,
    sucursal: {
      codigo: "LPZ-001",
      nombre: "Sucursal La Paz Centro",
      ciudad: "La Paz",
      estado: "Baja California Sur",
      tipoOrigen: "matriz"
    }
  },
  {
    numeroCuenta: "1002003004",
    tipo: "retiro",
    monto: 3000,
    fecha: new Date("2026-02-08T15:00:00"),
    descripcion: "Compra en línea",
    saldoPosterior: 15000,
    sucursal: {
      codigo: "LPZ-002",
      nombre: "Sucursal La Paz Forjadores",
      ciudad: "La Paz",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003005",
    tipo: "deposito",
    monto: 25000,
    fecha: new Date("2026-02-02T12:00:00"),
    descripcion: "Transferencia bancaria",
    saldoPosterior: 25000,
    sucursal: {
      codigo: "LTO-005",
      nombre: "Sucursal Loreto",
      ciudad: "Loreto",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003005",
    tipo: "retiro",
    monto: 2650,
    fecha: new Date("2026-02-09T16:40:00"),
    descripcion: "Pago con tarjeta",
    saldoPosterior: 22350,
    sucursal: {
      codigo: "LTO-005",
      nombre: "Sucursal Loreto",
      ciudad: "Loreto",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003006",
    tipo: "deposito",
    monto: 13000,
    fecha: new Date("2026-02-05T08:00:00"),
    descripcion: "Depósito de nómina",
    saldoPosterior: 13000,
    sucursal: {
      codigo: "MUL-006",
      nombre: "Sucursal Mulegé",
      ciudad: "Mulegé",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003006",
    tipo: "retiro",
    monto: 1250,
    fecha: new Date("2026-02-10T14:15:00"),
    descripcion: "Retiro en cajero",
    saldoPosterior: 11750,
    sucursal: {
      codigo: "MUL-006",
      nombre: "Sucursal Mulegé",
      ciudad: "Mulegé",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003007",
    tipo: "deposito",
    monto: 10000,
    fecha: new Date("2026-02-06T10:10:00"),
    descripcion: "Depósito inicial",
    saldoPosterior: 10000,
    sucursal: {
      codigo: "LPZ-001",
      nombre: "Sucursal La Paz Centro",
      ciudad: "La Paz",
      estado: "Baja California Sur",
      tipoOrigen: "matriz"
    }
  },
  {
    numeroCuenta: "1002003007",
    tipo: "retiro",
    monto: 1250,
    fecha: new Date("2026-02-11T17:20:00"),
    descripcion: "Compra en supermercado",
    saldoPosterior: 8750,
    sucursal: {
      codigo: "LPZ-002",
      nombre: "Sucursal La Paz Forjadores",
      ciudad: "La Paz",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003008",
    tipo: "deposito",
    monto: 32000,
    fecha: new Date("2026-02-03T11:00:00"),
    descripcion: "Transferencia recibida",
    saldoPosterior: 32000,
    sucursal: {
      codigo: "CSL-002",
      nombre: "Sucursal Cabo San Lucas",
      ciudad: "Los Cabos",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003008",
    tipo: "retiro",
    monto: 1500,
    fecha: new Date("2026-02-12T09:50:00"),
    descripcion: "Pago de servicio",
    saldoPosterior: 30500,
    sucursal: {
      codigo: "CSL-002",
      nombre: "Sucursal Cabo San Lucas",
      ciudad: "Los Cabos",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003009",
    tipo: "deposito",
    monto: 11500,
    fecha: new Date("2026-02-04T08:20:00"),
    descripcion: "Depósito de nómina",
    saldoPosterior: 11500,
    sucursal: {
      codigo: "COM-004",
      nombre: "Sucursal Comondú",
      ciudad: "Comondú",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003009",
    tipo: "retiro",
    monto: 1300,
    fecha: new Date("2026-02-13T19:00:00"),
    descripcion: "Pago en restaurante",
    saldoPosterior: 10200,
    sucursal: {
      codigo: "SJC-003",
      nombre: "Sucursal San José del Cabo",
      ciudad: "Los Cabos",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003010",
    tipo: "deposito",
    monto: 15000,
    fecha: new Date("2026-02-05T10:45:00"),
    descripcion: "Depósito inicial",
    saldoPosterior: 15000,
    sucursal: {
      codigo: "LTO-005",
      nombre: "Sucursal Loreto",
      ciudad: "Loreto",
      estado: "Baja California Sur",
      tipoOrigen: "remota"
    }
  },
  {
    numeroCuenta: "1002003010",
    tipo: "retiro",
    monto: 1520,
    fecha: new Date("2026-02-14T12:30:00"),
    descripcion: "Pago con tarjeta",
    saldoPosterior: 13480,
    sucursal: {
      codigo: "LPZ-001",
      nombre: "Sucursal La Paz Centro",
      ciudad: "La Paz",
      estado: "Baja California Sur",
      tipoOrigen: "matriz"
    }
  }
];

async function crearBaseDeDatos() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");

    const db = client.db("nexus_banca");

    const coleccionClientes = db.collection("clientes");
    const coleccionCuentas = db.collection("cuentas");
    const coleccionTransacciones = db.collection("transacciones");

    await coleccionClientes.deleteMany({});
    await coleccionCuentas.deleteMany({});
    await coleccionTransacciones.deleteMany({});

    const resultadoClientes = await coleccionClientes.insertMany(clientes);
    const clientesInsertados = await coleccionClientes.find({}).toArray();

    const mapaClientes = {};
    clientesInsertados.forEach(cliente => {
      mapaClientes[cliente.curp] = cliente._id;
    });

    const cuentasConClienteId = cuentas.map(cuenta => ({
      clienteId: mapaClientes[cuenta.curpCliente],
      numeroCuenta: cuenta.numeroCuenta,
      tipoCuenta: cuenta.tipoCuenta,
      saldo: cuenta.saldo,
      moneda: cuenta.moneda,
      fechaApertura: cuenta.fechaApertura,
      estatus: cuenta.estatus
    }));

    await coleccionCuentas.insertMany(cuentasConClienteId);
    const cuentasInsertadas = await coleccionCuentas.find({}).toArray();

    const mapaCuentas = {};
    cuentasInsertadas.forEach(cuenta => {
      mapaCuentas[cuenta.numeroCuenta] = cuenta._id;
    });

    const transaccionesConCuentaId = transacciones.map(transaccion => ({
      cuentaId: mapaCuentas[transaccion.numeroCuenta],
      tipo: transaccion.tipo,
      monto: transaccion.monto,
      fecha: transaccion.fecha,
      descripcion: transaccion.descripcion,
      saldoPosterior: transaccion.saldoPosterior,
      sucursal: transaccion.sucursal
    }));

    await coleccionTransacciones.insertMany(transaccionesConCuentaId);

    await coleccionClientes.createIndex({ curp: 1 }, { unique: true });
    await coleccionCuentas.createIndex({ numeroCuenta: 1 }, { unique: true });
    await coleccionCuentas.createIndex({ clienteId: 1 });
    await coleccionTransacciones.createIndex({ cuentaId: 1 });
    await coleccionTransacciones.createIndex({ "sucursal.codigo": 1 });
    await coleccionTransacciones.createIndex({ fecha: 1 });

    console.log("Base de datos nexus_banca creada correctamente");
    console.log(`Clientes insertados: ${clientes.length}`);
    console.log(`Cuentas insertadas: ${cuentas.length}`);
    console.log(`Transacciones insertadas: ${transacciones.length}`);
  } catch (error) {
    console.error("Error al crear la base de datos:", error);
  } finally {
    await client.close();
  }
}

crearBaseDeDatos();