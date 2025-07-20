<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Doctrine\Orm\Paginator;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Tools\Pagination\Paginator as DoctrinePaginator;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @extends ServiceEntityRepository<User>
 * @implements PasswordUpgraderInterface<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    const ITEMS_PER_PAGE = 10;
    public function __construct(private ManagerRegistry $registry,private TokenStorageInterface $tokenStorage)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }

    public function findOneByEmailOrNumber($identifier)
    {
        $qb = $this->createQueryBuilder('u');

        // Utilisation d'une sous-requête pour vérifier par email ou numéro de téléphone
        $qb
            ->select()
            ->where('u.email = :identifier')
            ->orWhere('u.phoneNumber = :identifier');

        // Utilisation de EXISTS avec la sous-requête
        $qb->setParameter('identifier', $identifier);

        // Récupération du résultat unique ou null
        try {
            $result = $qb->getQuery()->getSingleResult();
        } catch (\Doctrine\ORM\NoResultException | \Doctrine\ORM\NonUniqueResultException $e) {
            // Aucun résultat trouvé ou plusieurs résultats trouvés
            return null;
        }

        return $result;
    }

    public function findByDomainsSimilarity(array $domains)
    {
        return $this->createQueryBuilder('u')
            ->andWhere(':domains MEMBER OF u.domains')
            ->setParameter('domains', $domains)
            ->getQuery()
            ->getResult();
    }

}
