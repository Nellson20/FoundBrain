<?php

namespace App\Events;

use App\Entity\Post;
use App\Entity\Comment;
use App\Entity\Company;
use App\Entity\Message;
use App\Entity\Discussion;
use App\Entity\CommentReply;
use App\Entity\Invest;
use App\Entity\PostEvaluation;
use App\Entity\ProfilePicture;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Uid\Uuid;
use App\Entity\AuthorTypeRelation;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class DeletionListener implements EventSubscriberInterface
{

    public function __construct(private Security $security)
    {
    }

    public static function getSubscribedEvents()
    {
        return [
            Events::preRemove => 'preRemove',
        ];
    }
    public function preRemove(LifecycleEventArgs $args)
    {

        $entity=$args->getEntity();

        if($entity instanceof Post){
            $currentUser = $this->security->getUser();

            if($currentUser===$entity->getAuthor() || ($entity->getAuthor() instanceof Company && $entity->getAuthor()->getAuthor() === $currentUser)){
                
            }else{
                throw new AccessDeniedHttpException('Vous n\'êtes pas autorisé à supprimer ce post !');
            }
        }
        
    }
}
