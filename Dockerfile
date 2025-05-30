FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libonig-dev libxml2-dev zip \
    npm

COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copia TODO el código antes de instalar dependencias
COPY . .

RUN composer install --prefer-dist --no-interaction
RUN npm install

RUN npm run build

RUN chown -R www-data:www-data storage bootstrap/cache

RUN mkdir -p database && touch database/database.sqlite && chmod -R 777 database

EXPOSE 8000

CMD php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=8000