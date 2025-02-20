FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git unzip libicu-dev zip libpq-dev wget \
    && docker-php-ext-install intl pdo pdo_pgsql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN wget https://get.symfony.com/cli/installer -O - |bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

WORKDIR /var/www/html

CMD ["php-fpm"]