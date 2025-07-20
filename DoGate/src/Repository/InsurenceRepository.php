<?php

namespace App\Repository;

use App\Entity\Insurence;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Insurence>
 *
 * @method Insurence|null find($id, $lockMode = null, $lockVersion = null)
 * @method Insurence|null findOneBy(array $criteria, array $orderBy = null)
 * @method Insurence[]    findAll()
 * @method Insurence[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InsurenceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Insurence::class);
    }

//    /**
//     * @return Insurence[] Returns an array of Insurence objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Insurence
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
