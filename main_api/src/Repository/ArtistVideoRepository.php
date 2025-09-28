<?php

namespace App\Repository;

use App\Entity\ArtistVideo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ArtistVideo>
 *
 * @method ArtistVideo|null find($id, $lockMode = null, $lockVersion = null)
 * @method ArtistVideo|null findOneBy(array $criteria, array $orderBy = null)
 * @method ArtistVideo[]    findAll()
 * @method ArtistVideo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArtistVideoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ArtistVideo::class);
    }

//    /**
//     * @return ArtistVideo[] Returns an array of ArtistVideo objects
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

//    public function findOneBySomeField($value): ?ArtistVideo
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
