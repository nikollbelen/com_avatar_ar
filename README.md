# AR GPS Avatar

Este proyecto es una experiencia de Realidad Aumentada basada en ubicación (Location-Based WebAR) que utiliza **AR.js**, **A-Frame** y **Vite**. Permite visualizar un modelo 3D en coordenadas GPS específicas desde el navegador de un dispositivo móvil, sin necesidad de instalar ninguna aplicación.

## 🚀 Características

- 🌍 **Ubicación GPS**: El modelo 3D (`dino.glb`) se ancla a coordenadas físicas precisas usando la API de geolocalización.
- 📏 **Torre de Calibración**: Integra una herramienta de medición visual (bloques de 1 metro) para ayudar a identificar la altura (altitud) correcta del modelo en la realidad.
- 🎮 **Controles D-Pad**: Permite ajustar con precisión la latitud, longitud y altitud del modelo 3D en tiempo real mediante botones en pantalla.
- 🎨 **Interfaz Glassmorphism**: Interfaz de usuario translúcida y moderna superpuesta en la cámara.
- ⚡ **Vite**: Entorno de desarrollo rápido.

## 🛠️ Instalación y Uso Local

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   *(Nota: Para probar AR en dispositivos móviles localmente, es necesario usar un túnel HTTPS como ngrok, o acceder mediante la IP local si se tiene un certificado confiable).*

## 🌐 Despliegue (Vercel)

El proyecto está listo para producción y es 100% compatible con **Vercel**.
1. Sube este código a un repositorio de GitHub.
2. Inicia sesión en Vercel y selecciona "Add New Project".
3. Importa el repositorio. Vercel detectará automáticamente Vite y configurará el despliegue.
4. Abre la URL generada en tu teléfono móvil, concede los permisos de GPS y Cámara, ¡y busca el avatar a tu alrededor!
