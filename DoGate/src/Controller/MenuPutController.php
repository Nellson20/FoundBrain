<?php

namespace App\Controller;

use App\Entity\Menu;
use App\Entity\Picture;
use Doctrine\ORM\EntityManager;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MenuPutController extends AbstractController
{
   public function __invoke(Menu $menu, Request $request, IriConverterInterface $iriConverter, EntityManager $entityManager):Menu
   {
        if (!$menu)
        throw new HttpException(422,"Menu not found");

        $requestData = $request->request->all();

        if (isset($requestData['name']))
            $menu->setName($requestData['name']);

        if (isset($requestData['description']))
        $menu->setDescription($requestData['description']);

        if (isset($requestData['price']))
        $menu->setPrice($requestData['price']);

        if (isset($requestData['allergen']))
        $menu->setAllergens($requestData['allergen']);

        if (isset($requestData['preparationTime']))
        $menu->setPreparationTime($requestData['preparationTime']);

        if (isset($requestData['accompaniments']))
        $menu->setAccompaniments($requestData['accompaniments']);

        if (isset($requestData['MenuCategory']))
        $menu->setMenuCategory($iriConverter->getResourceFromIri($requestData['menuCategory']));

        if ($request->files->get('file')) 
        {
            $uploadedFile = $request->files->get('file');

            if ($menu->getPictures()->first())
            {
                $oldPicture = $menu->getPictures()->first();
                $menu->removePicture($oldPicture);
            }
            
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $entityManager->persist($picture);
            $menu->addPicture($picture);
        }

        return $menu;
   }

}