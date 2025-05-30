FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libonig-dev libxml2-dev zip \
    npm

COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copia primero composer.json y composer.lock para aprovechar el cache de dependencias
COPY composer.json composer.lock ./

# COPIA TODO EL RESTO DEL CÓDIGO ANTES DE COMPOSER INSTALL
COPY . .

# Ahora sí, composer install funcionará porque el archivo artisan ya existe
RUN composer install --prefer-dist --no-interaction

# Frontend (ajusta ruta si tu package.json está en /frontend)
WORKDIR /var/www/html/frontend
RUN npm install
RUN npm run build

# Copia los assets generados a public/ (ajusta si usas otra carpeta)
WORKDIR /var/www/html
RUN cp -r frontend/dist/* public/

# Permisos para Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# SQLite para pruebas
RUN mkdir -p database && touch database/database.sqlite && chmod -R 777 database

EXPOSE 8000

CMD php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=8000