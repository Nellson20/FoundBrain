<?php

namespace App\Controller;

use App\Entity\Street;
use App\Entity\Position;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class StreetPostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter): Street
    {
        $requestData = $request->request->all();
        $street = new Street;

        //name
        $street->setName($requestData['name']);

        //city
        $street->setCity($iriConverter->getResourceFromIri($requestData['city']));

        return $street;
    }
}