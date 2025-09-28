<?php

namespace App\Controller;

use App\Entity\Picture;
use App\Entity\Bungalow;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BungalowPutController extends AbstractController
{
    public function __invoke(Bungalow $bungalow, Request $request, EntityManagerInterface $entityManager, IriConverterInterface $iriConverter) : Bungalow
    {
        if (!$bungalow)
            throw new HttpException(422,"Room not found");

        $requestData = $request->request->all();

        if (isset($requestData['garden']))
            $bungalow->setGarden($requestData['garden']);

        if (isset($requestData['terrace']))
            $bungalow->setTerrace($requestData['terrace']);

        if (isset($requestData['type']))
            $bungalow->setType($requestData['type']);
        
        if (isset($requestData['size']))
            $bungalow->setSize($requestData['size']);
        
        if (isset($requestData['view'])) 
            $bungalow->setView($requestData['view']);
        
        if (isset($requestData['balcony']))
            $bungalow->setBalcony($requestData['balcony']);

        if (isset($requestData['numberOfBeds']))
            $bungalow->setNumberOfBeds($requestData['numberOfBeds']);
        
        if (isset($requestData['petsAllowed']))
            $bungalow->setPetsAllowed($requestData['petsAllowed']);
        
        if (isset($requestData['numberOfBeds']))
            $bungalow->setNumberOfBeds($requestData['numberOfBeds']);
            
        if (isset($requestData['description']))
            $bungalow->setDescription($requestData['description']);

        if (isset($requestData['equipments'])) 
        {
            $equipmentData = json_decode($requestData["equipments"], true);
    
            if (isset($equipmentData['equipments'])) 
            {
                $oldEquipment = $bungalow->getAccomodationEquipments();
                foreach($oldEquipment as $deletableEquipment)
                    $bungalow->removeAccomodationEquipment($deletableEquipment);
                
                 $equipmentIris = $equipmentData["equipments"];
                foreach ($equipmentIris as $equipmentIri) 
                {   
                    $equipment = $iriConverter->getResourceFromIri($equipmentIri);
                    $bungalow->addAccomodationEquipment($equipment);
                }
            }
        }

        if (isset($requestData['services'])) 
        {
            $serviceData = json_decode($requestData["services"], true);
    
            if (isset($serviceData['services'])) 
            {
                $oldService = $bungalow->getAccomodationServices();
                foreach($oldService as $deletableService)
                    $bungalow->removeAccomodationService($deletableService);
                
                 $serviceIris = $serviceData["services"];
                foreach ($serviceIris as $serviceIri) 
                {   
                    $service = $iriConverter->getResourceFromIri($serviceIri);
                    $bungalow->addAccomodationService($service);
                }
            }
        }

  
        if ($request->files->get('file')) 
        {
            $uploadedFile = $request->files->get('file');

            if ($bungalow->getPictures()->first())
            {
                $oldPicture = $bungalow->getPictures()->first();
                $bungalow->removePicture($oldPicture);
            }

            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $entityManager->persist($picture);
            $bungalow->addPicture($picture);
        }
        return $bungalow;
    }   
}