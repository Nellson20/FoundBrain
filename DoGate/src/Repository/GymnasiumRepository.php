<?php

namespace App\Repository;

use App\Entity\Gymnasium;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Gymnasium>
 *
 * @method Gymnasium|null find($id, $lockMode = null, $lockVersion = null)
 * @method Gymnasium|null findOneBy(array $criteria, array $orderBy = null)
 * @method Gymnasium[]    findAll()
 * @method Gymnasium[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GymnasiumRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Gymnasium::class);
    }

//    /**
//     * @return Gymnasium[] Returns an array of Gymnasium objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('g.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Gymnasium
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
