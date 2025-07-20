<?php

namespace App\Repository;

use App\Entity\TypeBreakfast;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TypeBreakfast>
 *
 * @method TypeBreakfast|null find($id, $lockMode = null, $lockVersion = null)
 * @method TypeBreakfast|null findOneBy(array $criteria, array $orderBy = null)
 * @method TypeBreakfast[]    findAll()
 * @method TypeBreakfast[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TypeBreakfastRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TypeBreakfast::class);
    }

//    /**
//     * @return TypeBreakfast[] Returns an array of TypeBreakfast objects
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

//    public function findOneBySomeField($value): ?TypeBreakfast
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
