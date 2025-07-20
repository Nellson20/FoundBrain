<?php

namespace App\Repository;

use App\Entity\CompanyVisit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CompanyVisit>
 *
 * @method CompanyVisit|null find($id, $lockMode = null, $lockVersion = null)
 * @method CompanyVisit|null findOneBy(array $criteria, array $orderBy = null)
 * @method CompanyVisit[]    findAll()
 * @method CompanyVisit[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CompanyVisitRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CompanyVisit::class);
    }

//    /**
//     * @return CompanyVisit[] Returns an array of CompanyVisit objects
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

//    public function findOneBySomeField($value): ?CompanyVisit
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
