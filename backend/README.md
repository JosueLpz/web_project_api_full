# Servidor de Node.js con Express

Este es un servidor simple creado con Node.js y Express que maneja dos rutas GET para obtener información de usuarios y tarjetas. Puedes ejecutar el servidor en el puerto 3000.

## Requisitos previos

Asegúrate de tener Node.js y npm instalados en tu sistema. Si aún no los tienes instalados, puedes descargarlos e instalarlos desde [el sitio oficial de Node.js](https://nodejs.org/).

## Instalación

1. Clona este repositorio o descarga el código fuente.

2. Navega al directorio del proyecto.

3. Instala las dependencias utilizando npm.

## Ejecución

Para iniciar el servidor, ejecuta el siguiente comando: npm start

El servidor se ejecutará en el puerto 3000. Puedes acceder a él a través de tu navegador web o utilizando herramientas como [Postman](https://www.postman.com/).

## Rutas disponibles

Esta ruta devuelve una lista de usuarios en formato JSON.

GET http://localhost:3000/users

Esta ruta devuelve una lista de tarjetas en formato JSON.

GET http://localhost:3000/cards
