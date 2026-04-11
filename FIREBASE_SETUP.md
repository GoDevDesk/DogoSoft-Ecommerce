# Configuración de Firebase para DogoSoft E-commerce

## Pasos para configurar Firebase

### 1. Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Ingresa el nombre del proyecto: `dogosoft-ecommerce`
4. Habilita Google Analytics (opcional)
5. Haz clic en "Crear proyecto"

### 2. Configurar Authentication

1. En el panel lateral, ve a "Authentication"
2. Haz clic en "Comenzar"
3. Ve a la pestaña "Sign-in method"
4. Habilita "Correo electrónico/contraseña"
5. Haz clic en "Guardar"

### 3. Configurar Firestore Database

1. En el panel lateral, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (para desarrollo)
4. Elige una ubicación para tu base de datos
5. Haz clic en "Siguiente" y luego "Habilitar"

### 4. Configurar Storage

1. En el panel lateral, ve a "Storage"
2. Haz clic en "Comenzar"
3. Revisa las reglas de seguridad (puedes usar las reglas por defecto para desarrollo)
4. Elige la misma ubicación que tu base de datos
5. Haz clic en "Siguiente" y luego "Crear"

### 5. Obtener configuración del proyecto

1. En el panel lateral, ve a "Configuración del proyecto" (ícono de engranaje)
2. Desplázate hacia abajo hasta "Tus aplicaciones"
3. Haz clic en el ícono de web (</>)
4. Ingresa un nombre para tu app: `dogosoft-ecommerce-web`
5. Haz clic en "Registrar app"
6. Copia la configuración de Firebase

### 6. Actualizar la configuración en el proyecto

Reemplaza la configuración en `src/environments/environment.ts` y `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "tu-api-key-aqui",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu-app-id"
  }
};
```

### 7. Configurar reglas de seguridad (Opcional)

#### Reglas de Firestore (para desarrollo):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Reglas de Storage (para desarrollo):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 8. Estructura de datos esperada

#### Colección: products
```javascript
{
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  downloadUrl: string,
  category: string,
  version: string,
  size: string,
  createdAt: timestamp
}
```

#### Colección: orders
```javascript
{
  userId: string,
  products: array,
  total: number,
  status: string,
  createdAt: timestamp
}
```

## Comandos para ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir para producción
npm run build
```

## Notas importantes

- Asegúrate de configurar las reglas de seguridad apropiadas antes de ir a producción
- Los archivos de software deben subirse manualmente a Firebase Storage
- Considera implementar un sistema de pagos real (Stripe, PayPal, etc.) para producción
- Configura un dominio personalizado para tu proyecto Firebase
