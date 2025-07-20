<?php

// src/EventSubscriber/CompanyAccessSubscriber.php
namespace App\Events;

use App\Config\AccessTypes;
use App\Entity\Access;
use App\Entity\CompanyAccess;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class CompanyAccessSubscriber implements EventSubscriberInterface
{
    private $currentUser;

    public function __construct(private EntityManagerInterface $entityManager, private Security $security)
    {
        $this->currentUser=$security->getUser();
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['preAddAccess', EventPriorities::PRE_VALIDATE],
            ],
        ];
    }

    public function preAddAccess(ViewEvent $e)
    {
        $entity=$e->getControllerResult();
        $method = $e->getRequest()->getMethod();
        
        if($entity instanceof CompanyAccess){
            $access = $this->entityManager->getRepository(CompanyAccess::class)->findOneBy([
                'user' => $this->currentUser,
                'company' => $entity->getCompany(),
                'type' => AccessTypes::ADMIN,
            ]);

            if(!$access){
                throw new AccessDeniedException('Vous ne pouvez pas effectuer cette action !');
            }
        }
        
    }
}
