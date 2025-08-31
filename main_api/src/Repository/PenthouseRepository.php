<?php

namespace App\Repository;

use App\Entity\Penthouse;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Penthouse>
 *
 * @method Penthouse|null find($id, $lockMode = null, $lockVersion = null)
 * @method Penthouse|null findOneBy(array $criteria, array $orderBy = null)
 * @method Penthouse[]    findAll()
 * @method Penthouse[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PenthouseRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Penthouse::class);
    }

//    /**
//     * @return Penthouse[] Returns an array of Penthouse objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Penthouse
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
