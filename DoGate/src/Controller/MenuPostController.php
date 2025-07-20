<?php

namespace App\Controller;

use ApiPlatform\Api\IriConverterInterface;
use App\Entity\Menu;
use App\Entity\Picture;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MenuPostController extends AbstractController
{
    public function __invoke(Request $request, EntityManager $entityManager, IriConverterInterface $iriConverter):Menu
    {
        $requestData = $request->request->all();

        if ($request->files->get('file')) 
            {
                $uploadedFile = $request->files->get('file');
                $picture = new Picture();
                $picture->setFile($uploadedFile);
                $picture->setFolder('pictures');
            }

        $menu = new Menu();
        $menu->setName($requestData['name']);
        $menu->setDescription($requestData['description']);
        $menu->setPrice($requestData['price']);
        $menu->setAllergens($requestData['allergen']);
        $menu->setPreparationTime($requestData['preparationTime']);
        $menu->setAccompaniments($requestData['accompaniments']);
        $menu->setMenuCategory($iriConverter->getResourceFromIri($requestData['menuCategory']));


        if ($picture !== null) 
        {
            $entityManager->persist($picture);
            $menu->addPicture($picture);
        }

        return $menu;
    }
}