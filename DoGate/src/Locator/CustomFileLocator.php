<?php declare(strict_types=1);

namespace App\Locator;

use Symfony\Component\Config\FileLocator as SymfonyFileLocator;

class CustomFileLocator extends SymfonyFileLocator
{
    /**
     * @param string $name
     * @param string|null $currentPath
     * @param bool $first
     * @return string|false
     */
    public function locate(string $name, ?string $currentPath = null, bool $first = true)
    {
        // Validation du chemin
        if (!is_string($name)) {
            throw new \InvalidArgumentException(
                sprintf('Le chemin doit être une chaîne de caractères, %s donné', 
                gettype($name))
            );
        }

        // Conversion et validation
        $name = (string)$name;
        if (empty($name)) {
            return false;
        }

        return parent::locate($name, $currentPath, $first);
    }
}