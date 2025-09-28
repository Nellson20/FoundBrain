<?php

namespace App\Repository;

use App\Entity\SavingBank;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SavingBank>
 *
 * @method SavingBank|null find($id, $lockMode = null, $lockVersion = null)
 * @method SavingBank|null findOneBy(array $criteria, array $orderBy = null)
 * @method SavingBank[]    findAll()
 * @method SavingBank[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SavingBankRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SavingBank::class);
    }

//    /**
//     * @return SavingBank[] Returns an array of SavingBank objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?SavingBank
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
