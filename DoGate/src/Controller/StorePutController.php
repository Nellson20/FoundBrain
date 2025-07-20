<?php

namespace App\Controller;

use App\Entity\Store;
use App\Entity\Picture;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class StorePutController extends AbstractController
{
    public function __invoke(Request $request, Store $store): Store
    {
        $requestData=$request->request->all();

        if(isset($requestData['nameStore']))
        {
            $store->setNameStore($requestData['nameStore']);
        }
        if(isset($requestData['storeType']))
        {
            $store->setStoreType($requestData['storeType']);
        }
        if(isset($requestData['description']))
        {
            $store->setDescription($requestData['description']);
        }

        return $store;
    }
}
?>