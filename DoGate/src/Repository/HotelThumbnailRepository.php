<?php

namespace App\Repository;

use App\Entity\HotelThumbnail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<HotelThumbnail>
 *
 * @method HotelThumbnail|null find($id, $lockMode = null, $lockVersion = null)
 * @method HotelThumbnail|null findOneBy(array $criteria, array $orderBy = null)
 * @method HotelThumbnail[]    findAll()
 * @method HotelThumbnail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HotelThumbnailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, HotelThumbnail::class);
    }

//    /**
//     * @return HotelThumbnail[] Returns an array of HotelThumbnail objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('h.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?HotelThumbnail
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
