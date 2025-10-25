<?php

namespace App\Controller;

use App\Entity\Desactivation;
use App\Entity\User;
use App\Repository\DesactivationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class DesactivationController extends AbstractController
{
    #[Route('/user/desactivate', name: 'user_desactivate', methods: ['POST'])]
    public function desactivateUser(Request $request, EntityManagerInterface $em): JsonResponse
    {
        // 1️⃣ Récupérer l'id du user envoyé depuis le front
        $data = json_decode($request->getContent(), true);
        $userId = $data['userId'] ?? null;

        if (!$userId) {
            return new JsonResponse(['error' => 'User ID manquant'], 400);
        }

        
        $user = $em->getRepository(User::class)->find($userId);

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non trouvé'], 404);
        }

        
        $desactivation = new Desactivation();
        $desactivation->setUser($user);

        
        $timezone = new \DateTimeZone('Africa/Nairobi'); 
        $now = new \DateTimeImmutable('now', $timezone);

        $desactivation->setDeactivateDate($now);

        // Date de suppression : +30 jours
        $deletedAt = $now->modify('+2 minute');
        $desactivation->setDeleteDate($deletedAt);

        // 4️⃣ Persister en base
        $em->persist($desactivation);
        $em->flush();

        return new JsonResponse([
            'success' => true,
            'userId' => $user->getId(),
            'deactivatedAt' => $desactivation->getDeactivateDate()->format('Y-m-d H:i:s'),
            'deletedAt' => $desactivation->getDeleteDate()->format('Y-m-d H:i:s')
        ]);
    }
}