<?php

namespace App\Repository;

use App\Entity\JobAdvantage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<JobAdvantage>
 *
 * @method JobAdvantage|null find($id, $lockMode = null, $lockVersion = null)
 * @method JobAdvantage|null findOneBy(array $criteria, array $orderBy = null)
 * @method JobAdvantage[]    findAll()
 * @method JobAdvantage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class JobAdvantageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, JobAdvantage::class);
    }

//    /**
//     * @return JobAdvantage[] Returns an array of JobAdvantage objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('j')
//            ->andWhere('j.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('j.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?JobAdvantage
//    {
//        return $this->createQueryBuilder('j')
//            ->andWhere('j.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
