<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Company;
use App\Entity\Contact;
use ApiPlatform\Doctrine\Orm\Paginator;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator as DoctrinePaginator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @extends ServiceEntityRepository<Contact>
 *
 * @method Contact|null find($id, $lockMode = null, $lockVersion = null)
 * @method Contact|null findOneBy(array $criteria, array $orderBy = null)
 * @method Contact[]    findAll()
 * @method Contact[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContactRepository extends ServiceEntityRepository
{
    const ITEMS_PER_PAGE = 10;


    public function __construct(
        private ManagerRegistry $registry,
        private TokenStorageInterface $tokenStorage
    ) {
        parent::__construct($registry, Contact::class);
    }

    public function getOnlineContacts(int $pg = 1): Paginator
    {
        $firstResult = ($pg - 1) * self::ITEMS_PER_PAGE;

        $user = $this->tokenStorage->getToken()->getUser();
        if (!$user instanceof User && !$user instanceof Company) {
            throw new \InvalidArgumentException('User must be an instance of User or Company.');
        }

        $queryBuilder = $this->createQueryBuilder('c');

        $queryBuilder->leftJoin('c.requester', 'requester')
        ->leftJoin('c.receiver', 'receiver')
        ->addSelect('requester', 'receiver')
        ->andWhere(
            $queryBuilder->expr()->orX(
                $queryBuilder->expr()->andX(
                    $queryBuilder->expr()->eq('requester', ':user'),
                    $queryBuilder->expr()->eq('receiver.isOnline', ':is_online')
                ),
                $queryBuilder->expr()->andX(
                    $queryBuilder->expr()->eq('receiver', ':user'),
                    $queryBuilder->expr()->eq('requester.isOnline', ':is_online')
                )
            )
        )
        ->setParameters([
            'user' => $user,
            'is_online' => true,
        ]);

        $query = $queryBuilder->getQuery();
        $query->setFirstResult($firstResult)->setMaxResults(self::ITEMS_PER_PAGE);
// Créer un Paginator avec la requête
$doctrinePaginator = new DoctrinePaginator($query);
$paginator = new Paginator($doctrinePaginator);

// Obtenir les résultats paginés
// $currentResults = $paginator->getQuery()->getArrayResult();

// dd($currentResults);


        // $query = $queryBuilder->getQuery()
        //     ->setFirstResult($firstResult)
        //     ->setMaxResults(self::ITEMS_PER_PAGE);

        // $doctrinePaginator = new DoctrinePaginator($query);
        // $paginator = new Paginator($doctrinePaginator);


        return $paginator;
    }
}
