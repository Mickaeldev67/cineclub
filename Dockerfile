FROM php:8.3-fpm

# 📦 Installation des dépendances système
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    zip \
    libpq-dev \
    wget \
    libxml2-dev \
    && docker-php-ext-install intl pdo pdo_pgsql dom \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 🎵 Installation de Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 🛠️ Installation du CLI Symfony
RUN wget https://get.symfony.com/cli/installer -O - | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# 📂 Définition du répertoire de travail
WORKDIR /var/www/html

# 🚀 Commande de démarrage
CMD ["php-fpm"]