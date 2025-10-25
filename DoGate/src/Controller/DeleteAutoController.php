<?php

namespace App\Controller;

use App\Entity\Desactivation;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:delete-expired-users',
    description: 'Supprime les utilisateurs dont la delete_date est dépassée'
)]
class DeleteAutoController extends Command
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $timezone = new \DateTimeZone('Africa/Nairobi');
        $now = new \DateTimeImmutable('now', $timezone);

        // 🔹 1. Récupérer les désactivations expirées avec jointure
        $qb = $this->em->createQueryBuilder();
        $qb->select('d', 'u')
            ->from(Desactivation::class, 'd')
            ->join('d.user', 'u')
            ->where('d.deleteDate <= :now')
            ->setParameter('now', $now);

        $desactivations = $qb->getQuery()->getResult();

        if (empty($desactivations)) {
            $output->writeln('Aucun utilisateur à supprimer.');
            return Command::SUCCESS;
        }

        $count = 0;
        foreach ($desactivations as $desactivation) {
            $user = $desactivation->getUser();
            
            // Supprimer la désactivation
            $this->em->remove($desactivation);
            
            // Supprimer l'utilisateur
            if ($user) {
                $this->em->remove($user);
                $count++;
            }
        }

        // Exécuter toutes les suppressions
        $this->em->flush();

        $output->writeln($count . ' utilisateur(s) supprimé(s) avec succès.');
        return Command::SUCCESS;
    }
}
