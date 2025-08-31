<?php

namespace App\Repository;

use App\Entity\Citythumbnail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Citythumbnail>
 *
 * @method Citythumbnail|null find($id, $lockMode = null, $lockVersion = null)
 * @method Citythumbnail|null findOneBy(array $criteria, array $orderBy = null)
 * @method Citythumbnail[]    findAll()
 * @method Citythumbnail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CitythumbnailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Citythumbnail::class);
    }

//    /**
//     * @return Citythumbnail[] Returns an array of Citythumbnail objects
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

//    public function findOneBySomeField($value): ?Citythumbnail
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
