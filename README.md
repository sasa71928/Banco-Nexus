# Banco-Nexus


1. Clonar o hacer pull del repositorio
2. Ejecutar `npm install`
3. Levantar MongoDB con Docker:
   `docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest`
4. Ejecutar el script de inicialización:
   `node crearBaseDeDatos.js`

# Banco Nexus — Replica Set MongoDB con 3 Nodos

## Objetivo

Implementar un sistema distribuido utilizando MongoDB Replica Set con 3 nodos distribuidos en distintos equipos para demostrar:

* Replicación de datos
* Alta disponibilidad
* Tolerancia a fallos
* Elección automática de PRIMARY
* Comunicación distribuida real

---

# Arquitectura

| Nodo     | Equipo                  | Rol                 | IP Ejemplo    |
| -------- | ----------------------- | ------------------- | ------------- |
| mongo1   | PC 1                    | PRIMARY / SECONDARY | 192.168.0.101 |
| mongo2   | PC 2                    | PRIMARY / SECONDARY | 192.168.0.102 |
| mongo3   | PC 3                    | PRIMARY / SECONDARY | 192.168.0.103 |
| backend  | PC 4 o cualquier equipo | API Node.js         | 192.168.0.104 |
| frontend | PC 4 o cualquier equipo | React / App         | 192.168.0.104 |

---

# Requisitos

## Software requerido

En cada equipo:

* Docker Desktop
* MongoDB Image
* Node.js (solo backend)
* npm
* Git

---

# Paso 1 — Configurar IP fija

Cada equipo debe tener una IP fija dentro de la red local.

Ejemplo:

| Equipo  | IP            |
| ------- | ------------- |
| PC1     | 192.168.0.101 |
| PC2     | 192.168.0.102 |
| PC3     | 192.168.0.103 |
| Backend | 192.168.0.104 |

IMPORTANTE:

Las IPs no deben cambiar.

---

# Paso 2 — Abrir firewall

En Windows:

1. Abrir “Firewall de Windows Defender”
2. Configuración avanzada
3. Reglas de entrada
4. Nueva regla
5. Puerto
6. TCP
7. Puerto:

```txt
27017
```

8. Permitir conexión
9. Aplicar a:

* Dominio
* Privado
* Público

10. Guardar

---

# Paso 3 — Verificar conectividad

Desde cualquier equipo:

```bash
ping 192.168.0.101
ping 192.168.0.102
ping 192.168.0.103
```

También:

```powershell
Test-NetConnection 192.168.0.102 -Port 27017
```

Debe mostrar:

```txt
TcpTestSucceeded : True
```

---

# Paso 4 — Levantar MongoDB en cada equipo

## Equipo 1

```bash
docker run -d ^
--name mongo1 ^
--hostname 172.17.217.56 ^
-p 27017:27017 ^
-v mongo1_data:/data/db ^
mongo ^
mongod --replSet rs0 --bind_ip_all
```

---

## Equipo 2

```bash
docker run -d ^
--name mongo2 ^
--hostname 172.17.214.60 ^
-p 27017:27017 ^
-v mongo2_data:/data/db ^
mongo ^
mongod --replSet rs0 --bind_ip_all
```

---

## Equipo 3

```bash
docker run -d ^
--name mongo3 ^
--hostname 172.17.217.223 ^
-p 27017:27017 ^
-v mongo3_data:/data/db ^
mongo ^
mongod --replSet rs0 --bind_ip_all
```

---

# Paso 5 — Inicializar Replica Set

Entrar a mongosh desde cualquier nodo:

```bash
docker exec -it mongo1 mongosh
```

Ejecutar:

```js
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "172.17.217.223:27017" },
    { _id: 1, host: "172.17.214.60:27017" },
    { _id: 2, host: "172.17.217.56:27017" }
  ]
})
```

---

# Paso 6 — Verificar Replica Set

Ejecutar:

```js
rs.status()
```

Debe aparecer:

```txt
1 PRIMARY
2 SECONDARY
```

Ejemplo:

```txt
mongo1 -> PRIMARY
mongo2 -> SECONDARY
mongo3 -> SECONDARY
```

---

# Paso 7 — Configurar backend

## URI de conexión

```env
MONGO_URI=mongodb://192.168.0.101:27017,192.168.0.102:27017,192.168.0.103:27017/nexus_banca?replicaSet=rs0
```

IMPORTANTE:

NO usar:

```txt
directConnection=true
```

porque desactiva el failover.

---

# Paso 8 — Configurar servidor Express

## server.js

```js
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor iniciado`);
});
```

---

# Paso 9 — Configurar frontend

## React

```js
const API_BASE = "http://192.168.0.104:3000";
```

---

# Paso 10 — Prueba de replicación

Insertar un documento:

```js
db.clientes.insertOne({
  nombre: "Juan",
  saldo: 1000
})
```

Consultar desde otro nodo:

```js
db.clientes.find()
```

El documento debe existir.

---

# Paso 11 — Prueba de tolerancia a fallos

## Ver PRIMARY actual

```js
rs.status()
```

Ejemplo:

```txt
mongo1 -> PRIMARY
```

---

## Apagar PRIMARY

```bash
docker stop mongo1
```

---

## Esperar elección automática

MongoDB elegirá automáticamente otro PRIMARY.

Verificar:

```js
rs.status()
```

Ejemplo:

```txt
mongo2 -> PRIMARY
mongo3 -> SECONDARY
```

---

## Verificar backend

La aplicación debe seguir funcionando:

```txt
http://192.168.0.104:3000/api/cuenta/1002003001
```

---

# Paso 12 — Recuperación automática

Volver a levantar nodo:

```bash
docker start mongo1
```

MongoDB lo sincronizará automáticamente.

Verificar:

```js
rs.status()
```

Resultado esperado:

```txt
mongo1 -> SECONDARY
mongo2 -> PRIMARY
mongo3 -> SECONDARY
```

---

# Consideraciones importantes

## No usar localhost

Incorrecto:

```txt
localhost:27017
```

Correcto:

```txt
192.168.X.X:27017
```

---

## No usar nombres Docker entre equipos

Incorrecto:

```txt
mongo1
mongo2
mongo3
```

Correcto:

```txt
192.168.X.X
```

---

# Comandos útiles

## Ver contenedores

```bash
docker ps
```

---

## Ver logs

```bash
docker logs mongo1
```

---

## Entrar a mongosh

```bash
docker exec -it mongo1 mongosh
```

---

## Estado del Replica Set

```js
rs.status()
```

---

## Ver PRIMARY actual

```js
rs.isMaster()
```

---

# Resultado esperado

El sistema debe:

* Replicar datos automáticamente
* Elegir PRIMARY automáticamente
* Mantener disponibilidad al caer un nodo
* Recuperar nodos automáticamente
* Mantener consistencia distribuida

---
