<?php

namespace App\Controller\Contact;

use App\Entity\User;
use ApiPlatform\Doctrine\Orm\Paginator;
use App\Repository\ContactRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[AsController]
class GetOnlineContactsAction extends AbstractController
{
    public function __invoke(Request $request, ContactRepository $contactRepository): Paginator
    {
        
        $page = (int) $request->query->get('page', 1) ?? 1;

        return $contactRepository->getOnlineContacts($page);
    }
}