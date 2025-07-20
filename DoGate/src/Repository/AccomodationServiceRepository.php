<?php

namespace App\Repository;

use App\Entity\AccomodationService;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AccomodationService>
 *
 * @method AccomodationService|null find($id, $lockMode = null, $lockVersion = null)
 * @method AccomodationService|null findOneBy(array $criteria, array $orderBy = null)
 * @method AccomodationService[]    findAll()
 * @method AccomodationService[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AccomodationServiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AccomodationService::class);
    }

//    /**
//     * @return AccomodationService[] Returns an array of AccomodationService objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?AccomodationService
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
