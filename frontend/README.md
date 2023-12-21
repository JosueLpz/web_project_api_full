## Nota

- Por Tiempo y retrazo en el curso decidi omitir esta tarea pero tengo los conocimientos para hacer web responsi con mediaqueries y tailwind css

Como tarea adicional, también puedes implementar una versión móvil. Puedes repasar las lecciones sobre HTML y CSS para ayudarte, así que, si te sobra algo de tiempo, te recomendamos que lo hagas.

## 1. Creación de Rutas y Redirección

El proyecto establece que toda la funcionalidad está disponible en la ruta raíz (/) solo para usuarios autorizados. Se implementan dos rutas adicionales en el archivo `auth.js`:

- `/signup`: Para el registro de usuarios.
- `/signin`: Para la autorización de usuarios.

Si un usuario no autorizado visita la aplicación, será redirigido a la página de inicio de sesión, independientemente de la ruta de acceso.

## 2. Creación de Componentes de React

Se propone revisar y ajustar el código JSX y CSS para crear la interfaz de usuario. Los nuevos componentes incluyen:

- `Login`: Para la autorización de usuarios con variables de estado.
- `Register`: Para el registro de usuarios con variables de estado.
- `ProtectedRoute`: Protege la ruta `/` para evitar el acceso no autorizado.
- `InfoTooltip`: Una ventana modal que informa al usuario sobre el éxito del registro.

## 3. Conexión con el Backend de TripleTen

La funcionalidad principal se conecta al backend de TripleTen utilizando la URL base `https://register.nomoreparties.co`. Se protegen todas las URLs con autorización, excepto `/signup` y `/signin`. Se crea un módulo `auth.js` para contener los métodos necesarios de registro y autorización, importándolo en `App.js` según sea necesario.

## 4. Implementación de la Autenticación del Usuario

### Registro (/signup)

- Método: POST
- Encabezados: `"Content-Type": "application/json"`
- Body: `"password": "somepassword", "email": "email@email.com"`
- Respuesta exitosa: `{"data": {"_id": "5f5204c577488bcaa8b7bdf2", "email": "email@email.com"}}`
- Códigos de error: `400` si uno de los campos se rellenó incorrectamente.

### Autorización (/signin)

- Método: POST
- Encabezados: `"Content-Type": "application/json"`
- Body: `{"password": "dsfsdfsdfsdf", "email": "email@email.com"}`
- Ejemplo de respuesta exitosa: `{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}`
- Códigos de error: `400` si no se proporcionaron campos, `401` si no se encontró al usuario con el correo especificado.

### Comprobar Validez del Token (/users/me)

- Método: GET
- Encabezados: `{"Content-Type": "application/json", "Authorization": "Bearer {Your JWT}"}`

Ejemplo de respuesta exitosa: `{"data": {"_id":"1f525cf06e02630312f3fed7", "email":"email@email.com"}}`
Códigos de error: `400` si el token no se proporcionó o se proporcionó en formato incorrecto, `401` si el token es inválido.

## 5. Implementación de Almacenamiento Local y Manipulación de Tokens

Se emplea localStorage para almacenar y acceder al token, permitiendo a los usuarios evitar iniciar sesión en visitas repetidas. Se verifica la validez del token al enviar solicitudes a `/users/me`.

## 6. Análisis de Seguridad del Sitio

Se realiza un análisis de seguridad según la lista de control del sprint correspondiente, con planes para mejoras en el próximo sprint.

## 7. Lista de Métodos Utilizados en la Aplicación

Al completar el proyecto, se genera una lista de todos los métodos utilizados en la aplicación de React. Se identifican aquellos que deben modificarse para crear una nueva API unificada en el próximo sprint.
