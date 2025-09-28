<?php

namespace App\Repository;

use App\Entity\CompanyAccess;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CompanyAccess>
 *
 * @method CompanyAccess|null find($id, $lockMode = null, $lockVersion = null)
 * @method CompanyAccess|null findOneBy(array $criteria, array $orderBy = null)
 * @method CompanyAccess[]    findAll()
 * @method CompanyAccess[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CompanyAccessRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CompanyAccess::class);
    }

//    /**
//     * @return CompanyAccess[] Returns an array of CompanyAccess objects
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

//    public function findOneBySomeField($value): ?CompanyAccess
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
