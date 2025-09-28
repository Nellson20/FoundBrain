<?php

namespace App\Repository;

use App\Entity\HotelService;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<HotelService>
 *
 * @method HotelService|null find($id, $lockMode = null, $lockVersion = null)
 * @method HotelService|null findOneBy(array $criteria, array $orderBy = null)
 * @method HotelService[]    findAll()
 * @method HotelService[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HotelServiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, HotelService::class);
    }

//    /**
//     * @return HotelService[] Returns an array of HotelService objects
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

//    public function findOneBySomeField($value): ?HotelService
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
