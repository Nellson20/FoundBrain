<?php

namespace App\Controller;

use App\Entity\Store;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class StorePostController extends AbstractController
{
    
    public function __invoke(Request $request) : Store
    {
        $requestData = $request->request->all();


        $store = new Store ();

        $store->setNameStore($requestData['nameStore']);
        $store->setStoreType($requestData['storeType']);
        $store->setDescription($requestData['description']);

        return $store;
    }
}
?>