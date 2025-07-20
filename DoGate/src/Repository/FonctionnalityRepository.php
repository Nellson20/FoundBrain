<?php

namespace App\Repository;

use App\Entity\Fonctionnality;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Fonctionnality>
 *
 * @method Fonctionnality|null find($id, $lockMode = null, $lockVersion = null)
 * @method Fonctionnality|null findOneBy(array $criteria, array $orderBy = null)
 * @method Fonctionnality[]    findAll()
 * @method Fonctionnality[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FonctionnalityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Fonctionnality::class);
    }

//    /**
//     * @return Fonctionnality[] Returns an array of Fonctionnality objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Fonctionnality
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
