<?php

namespace App\Repository;

use App\Entity\Chalet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Chalet>
 *
 * @method Chalet|null find($id, $lockMode = null, $lockVersion = null)
 * @method Chalet|null findOneBy(array $criteria, array $orderBy = null)
 * @method Chalet[]    findAll()
 * @method Chalet[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChaletRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Chalet::class);
    }

//    /**
//     * @return Chalet[] Returns an array of Chalet objects
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

//    public function findOneBySomeField($value): ?Chalet
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
