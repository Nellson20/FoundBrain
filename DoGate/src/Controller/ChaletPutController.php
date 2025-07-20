<?php

namespace App\Controller;

use App\Entity\Chalet;
use App\Entity\Picture;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ChaletPutController extends AbstractController
{
    public function __invoke(Chalet $chalet,Request $request, EntityManagerInterface $entityManager,IriConverterInterface $iriConverter) : Chalet
    {
        if (!$chalet)
            throw new HttpException(422,"Room not found");

        $requestData = $request->request->all();

        if (isset($requestData['type']))
            $chalet->setType($requestData['type']);

        if (isset($requestData['size']))
            $chalet->setSize($requestData['size']);
        
        if (isset($requestData['view'])) 
            $chalet->setView($requestData['view']);
        
        if (isset($requestData['balcony']))
            $chalet->setBalcony($requestData['balcony']);

        if (isset($requestData['numberOfBeds']))
            $chalet->setNumberOfBeds($requestData['NumberOfBeds']);
        
        if (isset($requestData['petsAllowed']))
            $chalet->setPetsAllowed($requestData['petsAllowed']);
            
        if (isset($requestData['description']))
            $chalet->setDescription($requestData['description']);
            
        if (isset($requestData['description']))
            $chalet->setNumberOfBathrooms($requestData['description']);
            
        if (isset($requestData['numberOfRooms']))
            $chalet->setNumberOfRooms($requestData['numberOfRooms']);

        if (isset($requestData['garden']))
            $chalet->setGarden($requestData['garden']);

        if (isset($requestData['terrace']))
            $chalet->setTerrace($requestData['terrace']);
        
        if (isset($requestData['equipments'])) 
        {
            $equipmentData = json_decode($requestData["equipments"], true);
    
            if (isset($equipmentData['equipments'])) 
            {
                $oldEquipment = $chalet->getAccomodationEquipments();
                foreach($oldEquipment as $deletableEquipment)
                    $chalet->removeAccomodationEquipment($deletableEquipment);
                
                    $equipmentIris = $equipmentData["equipments"];
                foreach ($equipmentIris as $equipmentIri) 
                {   
                    $equipment = $iriConverter->getResourceFromIri($equipmentIri);
                    $chalet->addAccomodationEquipment($equipment);
                }
            }
        }

        if (isset($requestData['services']))
        {
            $serviceData = json_decode($requestData["services"], true);
    
            if (isset($serviceData['services'])) 
            {
                $oldService = $chalet->getAccomodationServices();
                foreach($oldService as $deletableService)
                    $chalet->removeAccomodationService($deletableService);
                
                    $serviceIris = $serviceData["services"];
                foreach ($serviceIris as $serviceIri) 
                {   
                    $service = $iriConverter->getResourceFromIri($serviceIri);
                    $chalet->addAccomodationService($service);
                }
            }
        }

        if ($request->files->get('file')) 
        {
            $uploadedFile = $request->files->get('file');

            if ($chalet->getPictures()->first())
            {
                $oldPicture = $chalet->getPictures()->first();
                $chalet->removePicture($oldPicture);
            }
            
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $entityManager->persist($picture);
            $chalet->addPicture($picture);
        }

        return $chalet;
    }   
}