<?php

namespace App\Controller\Notification;

use App\Entity\Post;
use App\Entity\User;
use App\Entity\Image;
use App\Entity\Notification;
use App\Entity\PostEvaluation;
use App\Entity\ImageEvaluation;
use App\Entity\PostNotification;
use App\Exception\UnauthorizedException;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use App\Entity\Contact;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;

class AddPostNotificationAction extends AbstractController
{

    public function __construct(private Security $security, private IriConverterInterface $iriConverter)
    {

    }

    public function __invoke(Request $request, EntityManagerInterface $entityManager): Notification
    {
        $currentUser=$this->security->getUser();
        $postedNotification = json_decode($request->getContent());
        $postIri = $postedNotification->post;
        $post = $this->iriConverter->getResourceFromIri($postIri);
        $authorDomains = $post->getAuthor()->getDomains()->toArray();
        $userContacts=$entityManager->getRepository(Contact::class)->findAll();
        
        $usersToNotify = $entityManager->getRepository(User::class)->findByDomainsSimilarity($authorDomains);
        $notification = new PostNotification();
        $notification->setType(1);
        $notification->setPost($post);
        foreach ($userContacts as $contact) {
            if ($contact->getRequester() !== $currentUser) {
                $notification->addReceiver($contact->getRequester());
            }elseif ($contact->getReceiver() !== $currentUser) {
                $notification->addReceiver($contact->getReceiver());
            }
        }
        foreach ($usersToNotify as $user) {
            $notification->addReceiver($user);
        }
        return $notification;
    }
}
