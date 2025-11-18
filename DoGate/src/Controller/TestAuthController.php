<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class TestAuthController extends AbstractController
{
    #[Route('/test-auth', name: 'test_auth', methods: ['POST'])]
    public function testAuth(
        Request $request, 
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $identifier = $data['identifier'] ?? null;
        $password = $data['password'] ?? null;

        // Chercher l'utilisateur
        $user = $userRepository->findOneByEmailOrNumber($identifier);

        if (!$user) {
            return new JsonResponse([
                'found' => false,
                'message' => 'Utilisateur non trouvé avec identifier: ' . $identifier
            ]);
        }

        // Vérifier le mot de passe
        $isPasswordValid = $passwordHasher->isPasswordValid($user, $password);

        return new JsonResponse([
            'found' => true,
            'email' => $user->getEmail(),
            'passwordValid' => $isPasswordValid,
            'hashedPassword' => substr($user->getPassword(), 0, 20) . '...',
            'message' => $isPasswordValid ? 'Mot de passe correct' : 'Mot de passe incorrect'
        ]);
    }
}
