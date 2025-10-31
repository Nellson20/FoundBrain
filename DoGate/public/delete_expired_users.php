<?php
/**
 * Script web pour supprimer les utilisateurs expirés
 * Accessible via: http://localhost/delete_expired_users.php
 */

require_once __DIR__ . '/../vendor/autoload.php';

use App\Entity\Desactivation;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Dotenv\Dotenv;

// Charger les variables d'environnement
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/../.env.local');

// Créer le kernel Symfony
$kernel = new \App\Kernel('prod', false);
$kernel->boot();

// Obtenir l'EntityManager
$container = $kernel->getContainer();
$em = $container->get('doctrine.orm.entity_manager');

function deleteExpiredUsers(EntityManagerInterface $em): array
{
    $timezone = new \DateTimeZone('Africa/Nairobi'); 
    $now = new \DateTimeImmutable('now', $timezone); 

    // Récupérer les désactivations expirées avec leurs utilisateurs
    $qb = $em->createQueryBuilder();
    $qb->select('d.id, u.id as userId, u.email, d.delete_date')
       ->from(Desactivation::class, 'd')
       ->join('d.user', 'u')
       ->where('d.delete_date <= :now')
       ->setParameter('now', $now);

    $results = $qb->getQuery()->getArrayResult();
    
    if (empty($results)) {
        return [
            'success' => true,
            'message' => 'Aucun utilisateur à supprimer.',
            'deleted_count' => 0,
            'users' => []
        ];
    }

    $desactivationIds = array_column($results, 'id');
    $userIds = array_column($results, 'userId');

    // Supprimer les entrées dans Desactivation
    $qbDesact = $em->createQueryBuilder();
    $qbDesact->delete(Desactivation::class, 'd')
             ->where($qbDesact->expr()->in('d.id', ':desactivationIds'))
             ->setParameter('desactivationIds', $desactivationIds)
             ->getQuery()
             ->execute();

    // Supprimer les utilisateurs
    $qbUser = $em->createQueryBuilder();
    $qbUser->delete(User::class, 'u')
           ->where($qbUser->expr()->in('u.id', ':userIds'))
           ->setParameter('userIds', $userIds)
           ->getQuery()
           ->execute();

    return [
        'success' => true,
        'message' => count($userIds) . ' utilisateurs et désactivations supprimés.',
        'deleted_count' => count($userIds),
        'users' => $results
    ];
}

// Définir le type de contenu JSON
header('Content-Type: application/json');

try {
    $result = deleteExpiredUsers($em);
    echo json_encode($result, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erreur lors de l\'exécution: ' . $e->getMessage(),
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}


