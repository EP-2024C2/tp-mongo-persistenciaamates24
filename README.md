# Estrategias de Persistencia - TP 2024

Este proyecto implementa una API REST en Node.js utilizando MongoDB como base de datos y Mongoose como ODM. Permite la gestión de productos, fabricantes y componentes, empleando diferentes enfoques de relaciones en MongoDB (referenciadas e incrustadas). La API está dockerizada para facilitar su despliegue.

## Enfoques de Relaciones en MongoDB

La API implementa dos tipos de relaciones en MongoDB:

- **Relación Incrustada**: Los componentes están incrustados en el documento `Producto`, ya que se consultan frecuentemente junto al producto y optimizan el rendimiento en consultas conjuntas.
  
- **Relación Referenciada**: Los fabricantes están referenciados en el documento `Producto` a través de su `_id`, permitiendo su existencia independiente, evitando duplicación y facilitando el mantenimiento.

## Descripción del Proyecto

Desarrollamos un sistema para una empresa de manufactura que centraliza la gestión de productos tecnológicos, sus componentes y fabricantes asociados. La API permite centralizar los datos de productos, fabricantes y componentes, mejorando la eficiencia en la consulta y mantenimiento de datos.

## Modelo Documental Implementado

Se ha migrado el modelo relacional proporcionado en la consigna a un modelo documental en MongoDB, considerando los enfoques de relación que optimizan las consultas:

- Un **Producto** tiene muchos **Fabricantes** (referencia).
- Un **Producto** tiene muchos **Componentes** (incrustados).

## Instalación de Dependencias

Instala las dependencias necesarias:

```bash
npm install
npm install -D nodemon
```

### Variables de Entorno

Configura el archivo `.env` en la raíz del proyecto con las siguientes variables:

```plaintext
MONGO_URL=mongodb://admin:admin1234@mongodb:27017/gestionProductos?authSource=admin
PORT=3000
```

## Ejecución del Proyecto

### Ejecución Local

```bash
npm run dev
```

### Ejecución con Docker

1. Levanta los servicios con Docker Compose:

   ```bash
   docker-compose up -d
   ```

2. La API estará disponible en [http://localhost:3000](http://localhost:3000).

3. Puedes visualizar la base de datos en Mongo Express en [http://localhost:8081](http://localhost:8081).

## Documentación de la API

| Método | Endpoint                         | Descripción                                           |
|--------|----------------------------------|-------------------------------------------------------|
| GET    | /productos                       | Obtener todos los productos                           |
| GET    | /productos/:id                   | Obtener un producto en particular                     |
| POST   | /productos                       | Crear un producto                                     |
| PUT    | /productos/:id                   | Modificar un producto en particular                   |
| DELETE | /productos/:id                   | Borrar un producto en particular                      |
| POST   | /productos/:id/fabricantes       | Asociar producto con 1 o N fabricantes                |
| GET    | /productos/:id/fabricantes       | Obtener todos los fabricantes de un producto          |
| DELETE | /productos/:id/fabricantes/:fid  | Desasociar un fabricante de un producto               |
| POST   | /productos/:id/componentes       | Asociar producto con 1 o N componentes                |
| GET    | /productos/:id/componentes       | Obtener todos los componentes de un producto          |
| DELETE | /productos/:id/componentes/:cid  | Desasociar un componente de un producto               |
| GET    | /fabricantes                     | Obtener todos los fabricantes                         |
| GET    | /fabricantes/:id                 | Obtener un fabricante en particular                   |
| POST   | /fabricantes                     | Crear un fabricante                                   |
| PUT    | /fabricantes/:id                 | Modificar un fabricante                               |
| DELETE | /fabricantes/:id                 | Borrar un fabricante                                  |
| GET    | /fabricantes/:id/productos       | Obtener todos los productos de un fabricante          |
| GET    | /componentes                     | Obtener todos los componentes                         |
| GET    | /componentes/:id                 | Obtener un componente en particular                   |
| POST   | /componentes                     | Crear un componente                                   |
| PUT    | /componentes/:id                 | Modificar un componente                               |
| DELETE | /componentes/:id                 | Borrar un componente                                  |
| GET    | /componentes/:id/productos       | Obtener todos los productos de un componente          |

## Ejemplos

### **Obtener todos los productos de un fabricante**

```json
{
  "id": 1,
  "nombre": "InnovacionSA",
  "productos": [
    {
      "id": 1,
      "nombre": "Notebook",
      "componentes": [
        { "id": 1, "nombre": "Procesador Intel i7 ULTRA" },
        { "id": 2, "nombre": "SSD 1TB" }
      ]
    },
    {
      "id": 2,
      "nombre": "Smartphone S5"
    }
  ]
}
```

### **Obtener todos los fabricantes de un producto**

```json
{
  "id": 1,
  "nombre": "Notebook",
  "fabricantes": [
    {
      "id": 1,
      "nombre": "InnovacionSA",
      "direccion": "1234 Cordoba, CABA"
    },
    {
      "id": 2,
      "nombre": "TecnologiaSA",
      "direccion": "4567 Colón, CABA"
    }
  ]
}
```

## Consideraciones Finales sobre la Entrega

1. **Justificación de Relaciones**: Se ha optado por una relación incrustada para `Componentes` en `Productos`, optimizando la consulta conjunta. Los `Fabricantes` se representan mediante referencias en `Productos`, facilitando la independencia de datos y evitando duplicación.
   
2. **Repositorio y Documentación**: Este archivo `README.md` incluye instrucciones completas para ejecutar la API, tanto localmente como en Docker.

3. **Comandos para Instalación y Ejecución**: Los comandos necesarios para instalar dependencias, configurar Docker y ejecutar la aplicación están claramente especificados.

4. **Puerto Configurable**: La API permite configurar el puerto y URL de MongoDB mediante variables de entorno (`PORT` y `MONGO_URL`).

## BONUS: Dockerización de la Aplicación Node.js

1. **Crear Imagen Docker**: Genera una imagen Docker con el comando:
   ```bash
   docker build -t nombre-imagen .
   ```

2. **Versionado**: Especifica un `tag` para versionar la imagen:
   ```bash
   docker build -t nombre-imagen:v1.0 .
   ```

3. **Ejecutar en un Contenedor**: Ejecuta la aplicación en un contenedor:
   ```bash
   docker run -d -p 3000:3000 --name nombre-contenedor nombre-imagen:v1.0
   ```
