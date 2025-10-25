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

class DeleteAccountController extends AbstractController
{
    #[Route('/user/delete', name: 'user_delete', methods: ['POST'])]
    public function deleteDesactivation(Request $request, EntityManagerInterface $em): JsonResponse
    {
        // Récupérer l'ID envoyé depuis le front
        $data = json_decode($request->getContent(), true);
        $userId = $data['userId'] ?? null;
        if (!$userId) {
            return new JsonResponse(['error' => 'ID manquant'], 400);
        }

        $desactivation = $em->getRepository(Desactivation::class)->find($userId);
        $user = $em->getRepository(User::class)->find($userId);

        

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur introuvable'], 404);
        }

        // Supprimer l'utilisateur
        $em->remove($user);
        
        // Supprimer la désactivation si elle existe
        if ($desactivation) {
            $em->remove($desactivation);
        }
        
        $em->flush();

        return new JsonResponse([
            'success' => true,
            'message' => "L'enregistrement a été supprimé"
        ]);
    }
}
