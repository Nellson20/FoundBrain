<?php
namespace App\Controller;

use App\Entity\UserVisibilitySettings;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class UserVisibilitySettingsController extends AbstractController
{
    #[Route('/api/me/visibility-settings-private', name: 'update_visibility_settings', methods: ['PATCH'])]
    #[IsGranted('ROLE_USER')]
    public function update(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $settings = $user->getVisibilitySettings();
        if (!$settings) {
            $settings = new UserVisibilitySettings();
            $settings->setUser($user);
            $settings->setPrivate((bool)$data['private']);
            $user->setVisibilitySettings($settings);
        }

        

        if (isset($data['private'])) {
            $settings->setPrivate((bool)$data['private']);
        }

        $em->flush();

        return $this->json([
            'id' => $settings->getId(),
            'private' => $settings->getPrivate(),
        ]);
    }

    #[Route('/api/me/visibility-settings-searchEngine', name: 'update_visibility_settings_searchEngine', methods: ['PATCH'])]
    #[IsGranted('ROLE_USER')]
    public function updateSearch(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);
        $settings = $user->getVisibilitySettings();
        if (!$settings) {
            $settings = new UserVisibilitySettings();
            $settings->setUser($user);
            $settings->setPrivate((bool)$data['searchEngine']);
            $user->setVisibilitySettings($settings);
        }

        

        if (isset($data['searchEngine'])) {
            $settings->setSearchEngine((bool)$data['searchEngine']);
        }

        $em->flush();

        return $this->json([
            'id' => $settings->getId(),
             'searchEngine' => $settings->getSearchEngine(),
        ]);
    }

    #[Route('/api/me/visibility-settings', name: 'get_visibility_settings', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function get(EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $settings = $user->getVisibilitySettings();
        
        if (!$settings) {
            return $this->json([
                'private' => false,
                'searchEngine' => true,
            ]);
        }

        return $this->json([
            'id' => $settings->getId(),
            'private' => $settings->getPrivate(),
            'searchEngine' => $settings->getSearchEngine(),
        ]);
    }

    #[Route('/api/users/{userId}/is-private', name: 'check_user_is_private', methods: ['GET'])]
    public function checkIfPrivate(string $userId, EntityManagerInterface $em): JsonResponse
    {
        $user = $em->getRepository(User::class)->find($userId);
        
        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }

        $settings = $user->getVisibilitySettings();
        
        if (!$settings) {
            return $this->json([
                'isPrivate' => false,
                'userId' => $userId
            ]);
        }

        return $this->json([
            'isPrivate' => $settings->getPrivate(),
            'userId' => $userId
        ]);
    }
}