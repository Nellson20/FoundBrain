<?php

namespace App\Repository;

use App\Entity\TransportThumbnails;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TransportThumbnails>
 *
 * @method TransportThumbnails|null find($id, $lockMode = null, $lockVersion = null)
 * @method TransportThumbnails|null findOneBy(array $criteria, array $orderBy = null)
 * @method TransportThumbnails[]    findAll()
 * @method TransportThumbnails[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TransportThumbnailsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TransportThumbnails::class);
    }

//    /**
//     * @return TransportThumbnails[] Returns an array of TransportThumbnails objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?TransportThumbnails
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
