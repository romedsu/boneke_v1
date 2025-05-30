FROM php:8.2-fpm

# Instala dependencias del sistema y Node.js
RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libonig-dev libxml2-dev zip \
    npm

# Copia Composer desde imagen oficial
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copia solo composer files y instala dependencias PHP (incluye dev para seeders y pruebas)
COPY composer.json composer.lock ./
RUN composer install --prefer-dist --no-interaction

# Copia solo package files y instala dependencias JS
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Compila assets con Vite (usa configuración de Laravel Vite)
RUN npm run build

# Permisos (importante para Laravel)
RUN chown -R www-data:www-data storage bootstrap/cache

# Si usas SQLite local, asegúrate de crearla y dar permisos (ya lo hacías bien)
RUN mkdir -p database && touch database/database.sqlite && chmod -R 777 database

EXPOSE 8000

# Migra y sirve la app (NO para producción real, solo demos/desarrollo)
CMD php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=8000