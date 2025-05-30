FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libonig-dev libxml2-dev zip \
    nodejs npm

COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Si tienes frontend tipo Vite/React:
WORKDIR /var/www/html/frontend
RUN [ -f yarn.lock ] && yarn install --production || npm install --production
RUN npm run build || yarn build || true
RUN if [ -d "dist" ]; then cp -r dist/* /var/www/html/public/; fi

WORKDIR /var/www/html

# --- Aquí va la solución clave ---
RUN mkdir -p database && touch database/database.sqlite && chmod -R 777 database
RUN php artisan migrate --seed --force

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]