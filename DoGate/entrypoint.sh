#!/bin/bash
set -e

echo "Waiting for MySQL to be ready..."

# Attend que MySQL soit disponible
until nc -z db 3306; do
    echo "MySQL is unavailable - sleeping"
    sleep 1
done

echo "MySQL is up"

# Vérifie si la base de données est vide (pas de tables)
TABLE_COUNT=$(php -r "
\$host = getenv('DB_HOST') ?: 'db';
\$db = getenv('DB_NAME');
\$user = getenv('DB_USER');
\$pass = getenv('DB_PASSWORD');
\$pdo = new PDO(\"mysql:host=\$host;dbname=\$db\", \$user, \$pass);
echo \$pdo->query('SHOW TABLES')->rowCount();
")

echo "Table count: $TABLE_COUNT"

# Si aucune table, alors on lance migrations + fixtures
if [ "$TABLE_COUNT" -eq 0 ]; then
    echo "Empty database detected: running migrations and loading fixtures..."
    php bin/console doctrine:migrations:migrate --no-interaction
    php bin/console doctrine:fixtures:load --no-interaction
else
    echo "Database already has tables. Skipping migrations and fixtures."
fi

# Démarrer le service PHP
exec php-fpm
