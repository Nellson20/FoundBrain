<?php

namespace App\Repository;

use App\Entity\PostCommentNotification;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PostCommentNotification>
 *
 * @method PostCommentNotification|null find($id, $lockMode = null, $lockVersion = null)
 * @method PostCommentNotification|null findOneBy(array $criteria, array $orderBy = null)
 * @method PostCommentNotification[]    findAll()
 * @method PostCommentNotification[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PostCommentNotificationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PostCommentNotification::class);
    }

//    /**
//     * @return PostCommentNotification[] Returns an array of PostCommentNotification objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PostCommentNotification
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
