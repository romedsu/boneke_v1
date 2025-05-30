# Imagen base PHP
FROM php:8.2-fpm

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    npm \
    nodejs

# Instala Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copia el código fuente de Laravel y el frontend
COPY . .

# Instala dependencias PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Instala dependencias y compila el frontend
WORKDIR /var/www/html/frontend
RUN [ -f yarn.lock ] && yarn install --production || npm install --production
RUN npm run build || yarn build || true

# (Opcional) Copia el build a public si tu build lo genera en /frontend/dist
RUN if [ -d "dist" ]; then cp -r dist/* /var/www/html/public/; fi

# Vuelve al directorio principal para continuar con Laravel
WORKDIR /var/www/html

# Permisos para Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]