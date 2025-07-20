<?php

namespace App\Controller;

use App\Entity\Villa;
use App\Entity\Picture;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class VillaPutController extends AbstractController
{
    public function __invoke(Villa $villa,Request $request, EntityManagerInterface $entityManager, IriConverterInterface $iriConverter) : Villa
    {
        if (!$villa)
            throw new HttpException(422,"Room not found");

        $requestData = $request->request->all();

        if (isset($requestData['garden']))
            $villa->setGarden($requestData['garden']);

        if (isset($requestData['terrace']))
            $villa->setTerrace($requestData['terrace']);

        if (isset($requestData['type']))
            $villa->setType($requestData['type']);
        
        if (isset($requestData['size']))
            $villa->setSize($requestData['size']);
        
        if (isset($requestData['view'])) 
            $villa->setView($requestData['view']);
        
        if (isset($requestData['balcony']))
            $villa->setBalcony($requestData['balcony']);
            
        if (isset($requestData['numberOfBeds']))
            $villa->setNumberOfBeds($requestData['numberOfBeds']);
        
        if (isset($requestData['numberOfRooms']))
            $villa->setNumberOfRooms($requestData['numberOfRooms']);
        
        if (isset($requestData['petsAllowed']))
            $villa->setPetsAllowed($requestData['petsAllowed']);

        if (isset($requestData['numberOfBeds']))
            $villa->setNumberOfBeds($requestData['numberOfBeds']);
            
        if (isset($requestData['description']))
            $villa->setDescription($requestData['description']);
        
        if (isset($requestData['garden']))
            $villa->setGarden($requestData['garden']);

        if (isset($requestData['terrace']))
            $villa->setTerrace($requestData['terrace']);
        
        if (isset($requestData['pool']))
            $villa->setPool($requestData['pool']);

        if (isset($requestData['equipments'])) 
        {
            $equipmentData = json_decode($requestData["equipments"], true);
    
            if (isset($equipmentData['equipments'])) 
            {
                $oldEquipment = $villa->getAccomodationEquipments();
                foreach($oldEquipment as $deletableEquipment)
                    $villa->removeAccomodationEquipment($deletableEquipment);
                
                    $equipmentIris = $equipmentData["equipments"];
                foreach ($equipmentIris as $equipmentIri) 
                {   
                    $equipment = $iriConverter->getResourceFromIri($equipmentIri);
                    $villa->addAccomodationEquipment($equipment);
                }
            }
        }

        if (isset($requestData['services'])) 
        {
            $serviceData = json_decode($requestData["services"], true);
    
            if (isset($serviceData['services'])) 
            {
                $oldService = $villa->getAccomodationServices();
                foreach($oldService as $deletableService)
                    $villa->removeAccomodationService($deletableService);
                
                    $serviceIris = $serviceData["services"];
                foreach ($serviceIris as $serviceIri) 
                {   
                    $service = $iriConverter->getResourceFromIri($serviceIri);
                    $villa->addAccomodationService($service);
                }
            }
        }
        
        if ($request->files->get('file')) 
        {
            $uploadedFile = $request->files->get('file');

            if ($villa->getPictures()->first())
            {
                $oldPicture = $villa->getPictures()->first();
                $villa->removePicture($oldPicture);
            }
            
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $entityManager->persist($picture);
            $villa->addPicture($picture);
        }

        return $villa;
    }   
}