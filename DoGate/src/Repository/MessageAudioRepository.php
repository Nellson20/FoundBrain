<?php

namespace App\Repository;

use App\Entity\MessageAudio;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MessageAudio>
 *
 * @method MessageAudio|null find($id, $lockMode = null, $lockVersion = null)
 * @method MessageAudio|null findOneBy(array $criteria, array $orderBy = null)
 * @method MessageAudio[]    findAll()
 * @method MessageAudio[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageAudioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MessageAudio::class);
    }

//    /**
//     * @return MessageAudio[] Returns an array of MessageAudio objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?MessageAudio
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
