<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Artist;
use App\Entity\Author;
use App\Entity\Company;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Author>
 *
 * @method Author|null find($id, $lockMode = null, $lockVersion = null)
 * @method Author|null findOneBy(array $criteria, array $orderBy = null)
 * @method Author[]    findAll()
 * @method Author[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AuthorRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Author::class);
    }

    /**
     * @return Author[] Returns an array of Author objects
     */
    public function findByAuthorType($authorType)
    {
        switch ($authorType) {
            case 'user':
                return $this->getEntityManager()->getRepository(User::class)->findAll();
            case 'company':
                return $this->getEntityManager()->getRepository(Company::class)->findAll();
            case 'artist':
                return $this->getEntityManager()->getRepository(Artist::class)->findAll();
            default:
                return []; // or throw an exception for invalid type
        }
    }

    /**
     * @param int $month
     * @return Author[]
     */
    public function findByAuthorDateTime($month)
    {
        $query = $this->getEntityManager()->createQuery(
            'SELECT a FROM App\Entity\Author a WHERE MONTH(a.createdAt) = :month'
        )->setParameter('month', $month);
    
        return $query->getResult();
    }
    
    
//    /**
//     * @return Author[] Returns an array of Author objects
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

//    public function findOneBySomeField($value): ?Author
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
