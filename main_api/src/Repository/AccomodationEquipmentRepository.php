<?php

namespace App\Repository;

use App\Entity\AccomodationEquipment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AccomodationEquipment>
 *
 * @method AccomodationEquipment|null find($id, $lockMode = null, $lockVersion = null)
 * @method AccomodationEquipment|null findOneBy(array $criteria, array $orderBy = null)
 * @method AccomodationEquipment[]    findAll()
 * @method AccomodationEquipment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AccomodationEquipmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AccomodationEquipment::class);
    }

//    /**
//     * @return AccomodationEquipment[] Returns an array of AccomodationEquipment objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?AccomodationEquipment
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
