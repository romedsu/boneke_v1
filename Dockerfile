FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libonig-dev libxml2-dev zip \
    npm

COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copia y resuelve dependencias PHP
COPY composer.json composer.lock ./
RUN composer install --prefer-dist --no-interaction

# Copia el resto del backend
COPY . .

# Instala dependencias y build del frontend
WORKDIR /var/www/html/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/. ./
RUN npm run build

# Copia los archivos generados por Vite a la carpeta pública de Laravel
WORKDIR /var/www/html
RUN cp -r frontend/dist/* public/

# Permisos para Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# (Opcional) SQLite local para pruebas
RUN mkdir -p database && touch database/database.sqlite && chmod -R 777 database

EXPOSE 8000

CMD php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=8000