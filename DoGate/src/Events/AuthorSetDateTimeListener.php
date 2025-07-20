<?php

namespace App\Events;

use App\Entity\Author;
use DateTimeImmutable;
use Doctrine\ORM\Events;
use Doctrine\Common\EventSubscriber;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class AuthorSetDateTimeListener implements EventSubscriber
{
    public function getSubscribedEvents()
    {
        return[ Events::prePersist];
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        
        // $entity = $args->getObject();
        
        // if ($entity instanceof Author)
        //     $entity->setCreatedAt(new DateTimeImmutable());
    }
}