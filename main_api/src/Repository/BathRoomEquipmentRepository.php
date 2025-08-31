<?php

namespace App\Repository;

use App\Entity\BathRoomEquipment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BathRoomEquipment>
 *
 * @method BathRoomEquipment|null find($id, $lockMode = null, $lockVersion = null)
 * @method BathRoomEquipment|null findOneBy(array $criteria, array $orderBy = null)
 * @method BathRoomEquipment[]    findAll()
 * @method BathRoomEquipment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BathRoomEquipmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BathRoomEquipment::class);
    }

//    /**
//     * @return BathRoomEquipment[] Returns an array of BathRoomEquipment objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('b.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?BathRoomEquipment
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}