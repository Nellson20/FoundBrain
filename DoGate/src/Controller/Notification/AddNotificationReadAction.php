<?php

namespace App\Controller\Notification;

use App\Entity\Post;
use App\Entity\User;
use App\Entity\Image;
use App\Entity\Contact;
use App\Entity\Notification;
use App\Entity\PostEvaluation;
use App\Entity\ImageEvaluation;
use App\Entity\PostNotification;
use App\Entity\PostCommentNotification;
use App\Exception\UnauthorizedException;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use App\Entity\Author;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;

class AddNotificationReadAction extends AbstractController
{

    public function __construct(private Security $security, private IriConverterInterface $iriConverter)
    {
    }

    public function __invoke(Request $request, Notification $notification, EntityManagerInterface $entityManager): Notification
    {
        $currentUser = $this->security->getUser();
        if ($currentUser instanceof User) {
            if ($notification->getReceivers()->contains($currentUser) && !$notification->getReadBy()->contains($currentUser)) {
                $notification->addReadBy($currentUser);
                $entityManager->flush();
            }
        }

        return $notification;
    }
}
