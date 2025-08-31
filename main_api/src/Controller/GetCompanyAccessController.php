<?php

namespace App\Controller;

use App\Entity\Author;
use App\Entity\Company;
use App\Config\AccessTypes;
use App\Entity\CompanyAccess;
use App\Repository\AccessRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CompanyAccessRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetCompanyAccessController extends AbstractController
{
    private $currentUser;
    public function __construct(private CompanyAccessRepository $accessRepository, private EntityManagerInterface $entityManager, Security $security)
    {
        $this->currentUser = $security->getUser();
    }
    public function __invoke(string $id): Array
    {
        $company = $this->entityManager->getRepository(Company::class)->find($id);
        if (!$company) {
            throw $this->createNotFoundException('Cette resource est introuvable !');
        }
        // Récupérer les Access liés au Company;
        $accesses = $this->accessRepository->findBy([
            'company' => $company,
            'user' => $this->currentUser,
            'type' => AccessTypes::ADMIN,
        ]);
        if (!$accesses) {
            throw $this->createAccessDeniedException('Vous ne pouvez pas acceder à cette resource !');
        }

        return $accesses;
    }
}