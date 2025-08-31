<?php

namespace App\Events;

use App\Entity\Author;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
    public function __construct(private EntityManagerInterface $em) {
        
    }
    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {   
        $data=$event->getData();
        $user=$event->getUser();
        if(!$user instanceof UserInterface || !$user instanceof Author){
            return;
        }
        $user->setIsOnline(true);
        $this->em->persist($user);
        $this->em->flush();

        $data['user']=[
            "id"=>$event->getUser()->getId(),
            "firstName"=>$event->getUser()->getFirstName(),
            "lastName"=>$event->getUser()->getLastName(),
            "activeProfilePicture"=>$event->getUser()->getActiveProfilePicture(),
            "email"=>$event->getUser()->getEmail(),
            "roles"=>$event->getUser()->getRoles()
        ];

        $event->setData($data);
    }
}
