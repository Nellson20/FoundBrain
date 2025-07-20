<?php

namespace App\Events;

use App\Entity\Accomodation;
use App\Entity\Hotel;
use Doctrine\ORM\Events;
use Doctrine\Common\EventSubscriber;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class RoomDeleteListener  implements EventSubscriber
{
    public function getSubscribedEvents()
    {
        return[ Events::preRemove];
    }
    public function preRemove(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if ($entity instanceof Accomodation) {
            $hotel = $entity->getHotel();
            
            if ($hotel instanceof Hotel) {
                $hotel->setNumberOfRooms($hotel->getNumberOfRooms() - 1);
            }
        }
    }

}