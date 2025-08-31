<?php

namespace App\Events;

use App\Entity\Post;
use App\Entity\Artist;
use App\Entity\Invest;
use App\Entity\Comment;
use App\Entity\Company;
use App\Entity\Message;
use App\Entity\CoverImage;
use App\Entity\Reservation;
use App\Entity\CommentReply;
use App\Entity\PostEvaluation;
use App\Entity\ProfilePicture;
use App\Entity\ImageEvaluation;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class PostUserSubscriber implements EventSubscriberInterface
{

    public function __construct(private Security $security)
    {
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setEntityAuthor', EventPriorities::PRE_VALIDATE],
            
        ];
    }
    public function setEntityAuthor(ViewEvent $event)
    {
        

        $currentUser = $this->security->getUser();
        $method = $event->getRequest()->getMethod();
        if ((($event->getControllerResult() instanceof Post && !($event->getControllerResult()->getAuthor() instanceof Company))
                || $event->getControllerResult() instanceof Comment
                || $event->getControllerResult() instanceof CommentReply
                || $event->getControllerResult() instanceof Company
                || $event->getControllerResult() instanceof Reservation
                || ($event->getControllerResult() instanceof Invest && !($event->getControllerResult()->getAuthor() instanceof Company))
                || $event->getControllerResult() instanceof Message
                || $event->getControllerResult() instanceof ImageEvaluation
                || ($event->getControllerResult() instanceof PostEvaluation))
            && ($method === 'POST')
        ) {
            $event->getControllerResult()->setAuthor($currentUser);
        }
        if ($event->getControllerResult() instanceof ProfilePicture && ($method === 'POST')) {
            $user = $event->getControllerResult()->getUser() instanceof User ? $event->getControllerResult()->getUser() : $this->security->getUser();
            $user->setActiveProfilePicture($event->getControllerResult());
            $event->getControllerResult()->setUser($user);
        }

        if ($event->getControllerResult() instanceof CoverImage && ($method === 'POST')) {
            $coverImageAuthor=$event->getControllerResult()->getAuthor();
            if ($coverImageAuthor instanceof Company) {
                if ($coverImageAuthor->getAuthor() !== $currentUser) {
                    throw new AccessDeniedException('Vous ne pouvez pas effectuer cette action !');
                }
            } else {
                $currentUser->setActiveCoverImage($event->getControllerResult());
                $event->getControllerResult()->setAuthor($currentUser);
            }
        }
        if($event->getControllerResult() instanceof Artist){
            $event->getControllerResult()->setUser($currentUser);
        }
        
    }
}
