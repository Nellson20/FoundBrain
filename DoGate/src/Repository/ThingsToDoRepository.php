<?php

namespace App\Repository;

use App\Entity\ThingsToDo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ThingsToDo>
 *
 * @method ThingsToDo|null find($id, $lockMode = null, $lockVersion = null)
 * @method ThingsToDo|null findOneBy(array $criteria, array $orderBy = null)
 * @method ThingsToDo[]    findAll()
 * @method ThingsToDo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ThingsToDoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ThingsToDo::class);
    }

//    /**
//     * @return ThingsToDo[] Returns an array of ThingsToDo objects
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

//    public function findOneBySomeField($value): ?ThingsToDo
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
