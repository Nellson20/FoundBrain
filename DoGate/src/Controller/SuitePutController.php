<?php

namespace App\Controller;

use App\Entity\Suite;
use App\Entity\Picture;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SuitePutController extends AbstractController
{
    public function __invoke(Suite $suite,Request $request, EntityManagerInterface $entityManager, IriConverterInterface $iriConverter) : Suite
    {
        if (!$suite)
            throw new HttpException(422,"Room not found");

        $requestData = $request->request->all();


        if (isset($requestData['type']))
            $suite->setType($requestData['type']);

        if (isset($requestData['size']))
            $suite->setSize($requestData['size']);
        
        if (isset($requestData['view'])) 
            $suite->setView($requestData['view']);
        
        if (isset($requestData['balcony']))
            $suite->setBalcony($requestData['balcony']);
            
        if (isset($requestData['numberOfBeds']))
            $suite->setNumberOfBeds($requestData['numberOfBeds']);
        
        if (isset($requestData['numberOfRooms']))
            $suite->setNumberOfRooms($requestData['numberOfRooms']);
        
        if (isset($requestData['petsAllowed']))
            $suite->setPetsAllowed($requestData['petsAllowed']);

        if (isset($requestData['numberOfBeds']))
            $suite->setNumberOfBeds($requestData['numberOfBeds']);
            
        if (isset($requestData['description']))
            $suite->setDescription($requestData['description']);

        if (isset($requestData['equipments'])) 
        {
            $equipmentData = json_decode($requestData["equipments"], true);
    
            if (isset($equipmentData['equipments'])) 
            {
                $oldEquipment = $suite->getAccomodationEquipments();
                foreach($oldEquipment as $deletableEquipment)
                    $suite->removeAccomodationEquipment($deletableEquipment);
                
                    $equipmentIris = $equipmentData["equipments"];
                foreach ($equipmentIris as $equipmentIri) 
                {   
                    $equipment = $iriConverter->getResourceFromIri($equipmentIri);
                    $suite->addAccomodationEquipment($equipment);
                }
            }
        }

        if (isset($requestData['services'])) 
        {
            $serviceData = json_decode($requestData["services"], true);
    
            if (isset($serviceData['services'])) 
            {
                $oldService = $suite->getAccomodationServices();
                foreach($oldService as $deletableService)
                    $suite->removeAccomodationService($deletableService);
                
                    $serviceIris = $serviceData["services"];
                foreach ($serviceIris as $serviceIri) 
                {   
                    $service = $iriConverter->getResourceFromIri($serviceIri);
                    $suite->addAccomodationService($service);
                }
            }
        }
        
        if ($request->files->get('file')) 
        {
            $uploadedFile = $request->files->get('file');

            if ($suite->getPictures()->first())
            {
                $oldPicture = $suite->getPictures()->first();
                $suite->removePicture($oldPicture);
            }
            
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $entityManager->persist($picture);
            $suite->addPicture($picture);
        }

        return $suite;
    }   
}