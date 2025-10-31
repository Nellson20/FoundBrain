<?php

namespace App\Controller;

use App\Entity\UserNotificationSettings;
use App\Enum\EventType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class UserNotificationSettingsController extends AbstractController
{
    #[Route('/api/me/notification-settings', name: 'update_notification_settings', methods: ['PATCH'])]
    #[IsGranted('ROLE_USER')]
    public function update(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        if (!isset($data['eventType'])) {
            return $this->json(['error' => 'eventType is required'], 400);
        }

        try {
            $eventType = EventType::from($data['eventType']);
        } catch (\ValueError $e) {
            return $this->json(['error' => 'Invalid eventType'], 400);
        }

        $settings = $em->getRepository(UserNotificationSettings::class)->findOneBy([
            'user' => $user,
            'eventType' => $eventType
        ]);

        if (!$settings) {
            $settings = new UserNotificationSettings();
            $settings->setUser($user);
            $settings->setEventType($eventType);
            $em->persist($settings);
        }

        
        if (isset($data['notificationPush'])) {
            $settings->setNotificationPush((bool)$data['notificationPush']);
        }

        if (isset($data['notificationInAPP'])) {
            $settings->setNotificationInAPP((bool)$data['notificationInAPP']);
        }

        $em->flush();

        return $this->json([
            'id' => $settings->getId(),
            'eventType' => $settings->getEventType()->value,
            'notificationPush' => $settings->getNotificationPush(),
            'notificationInAPP' => $settings->getNotificationInAPP(),
        ]);
    }

    #[Route('/api/me/notification-settings', name: 'get_notification_settings', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function getAll(EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $settings = $em->getRepository(UserNotificationSettings::class)->findBy(['user' => $user]);

        $result = [];
        foreach ($settings as $setting) {
            $result[] = [
                'id' => $setting->getId(),
                'eventType' => $setting->getEventType()->value,
                'notificationPush' => $setting->getNotificationPush(),
                'notificationInAPP' => $setting->getNotificationInAPP(),
            ];
        }

        return $this->json($result);
    }
}
