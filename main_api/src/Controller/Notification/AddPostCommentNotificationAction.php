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
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;

class AddPostCommentNotificationAction extends AbstractController
{

    public function __construct(private Security $security, private IriConverterInterface $iriConverter)
    {

    }

    public function __invoke(Request $request, EntityManagerInterface $entityManager): Notification
    {
        $currentUser=$this->security->getUser();
        $postedNotification = json_decode($request->getContent());
        $commentIri = $postedNotification->comment;
        $comment = $this->iriConverter->getResourceFromIri($commentIri);
        $authorDomains = $comment->getAuthor()->getDomains()->toArray();
        $userContacts=$entityManager->getRepository(Contact::class)->findAll();
        
        
        $notification = new PostCommentNotification();
        $notification->setType(3);
        $notification->setComment($comment);
        foreach ($userContacts as $contact) {
            if ($contact->getRequester() !== $currentUser) {
                $notification->addReceiver($contact->getRequester());
            }elseif ($contact->getReceiver() !== $currentUser) {
                $notification->addReceiver($contact->getReceiver());
            }
        }
        $notification->addReceiver($comment->getCommentable()->getAuthor());
        // foreach ($usersToNotify as $user) {
        //     $notification->addReceiver($user);
        // }
        return $notification;
    }
}
