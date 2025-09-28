<?php

namespace App\Repository;

use App\Entity\CountryThumbnail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CountryThumbnail>
 *
 * @method CountryThumbnail|null find($id, $lockMode = null, $lockVersion = null)
 * @method CountryThumbnail|null findOneBy(array $criteria, array $orderBy = null)
 * @method CountryThumbnail[]    findAll()
 * @method CountryThumbnail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CountryThumbnailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CountryThumbnail::class);
    }

//    /**
//     * @return CountryThumbnail[] Returns an array of CountryThumbnail objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CountryThumbnail
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
