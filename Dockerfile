FROM php:8.2-fpm

# Instala dependencias del sistema y Node
RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libonig-dev libxml2-dev zip \
    npm

# Copia composer desde imagen oficial (opcional pero recomendado)
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copia primero los archivos de dependencias para aprovechar cache si no cambian
COPY composer.json composer.lock ./
COPY package.json package-lock.json ./

# Instala dependencias de PHP y JS
RUN composer install --prefer-dist --no-interaction
RUN npm install

# Copia el resto del código de la app (Laravel y frontend)
COPY . .

# Compila los assets de Vite
RUN npm run build

# Permisos para Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# (Opcional) Prepara base de datos sqlite para pruebas locales
RUN mkdir -p database && touch database/database.sqlite && chmod -R 777 database

EXPOSE 8000

# Comando de inicio del contenedor (puedes adaptarlo según tu entorno)
CMD php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=8000