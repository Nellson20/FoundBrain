<?php

namespace App\Controller;

use App\Entity\Picture;
use App\Entity\Penthouse;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PenthousePutController extends AbstractController
{
    public function __invoke(Penthouse $penthouse,Request $request, EntityManagerInterface $entityManager, IriConverterInterface $iriConverter) : Penthouse
    {
        if (!$penthouse)
            throw new HttpException(422,"Room not found");

        $requestData = $request->request->all();


        if (isset($requestData['type']))
            $penthouse->setType($requestData['type']);

        if (isset($requestData['size']))
            $penthouse->setSize($requestData['size']);

        if (isset($requestData['view'])) 
            $penthouse->setView($requestData['view']);
        
        if (isset($requestData['balcony']))
            $penthouse->setBalcony($requestData['balcony']);
    
        if (isset($requestData['numberOfBeds']))
            $penthouse->setNumberOfBeds($requestData['numberOfBeds']);
        
        if (isset($requestData['numberOfBeds']))
            $penthouse->setNumberOfRooms($requestData['numberOfBeds']);
        
        if (isset($requestData['petsAllowed']))
            $penthouse->setPetsAllowed($requestData['petsAllowed']);

        if (isset($requestData['numberOfBeds']))
            $penthouse->setNumberOfBeds($requestData['numberOfBeds']);
            
        if (isset($requestData['description']))
            $penthouse->setDescription($requestData['description']);

        if (isset($requestData['equipments'])) 
        {
            $equipmentData = json_decode($requestData["equipments"], true);
    
            if (isset($equipmentData['equipments'])) 
            {
                $oldEquipment = $penthouse->getAccomodationEquipments();
                foreach($oldEquipment as $deletableEquipment)
                    $penthouse->removeAccomodationEquipment($deletableEquipment);
                
                    $equipmentIris = $equipmentData["equipments"];
                foreach ($equipmentIris as $equipmentIri) 
                {   
                    $equipment = $iriConverter->getResourceFromIri($equipmentIri);
                    $penthouse->addAccomodationEquipment($equipment);
                }
            }
        }

        if (isset($requestData['services'])) 
        {
            $serviceData = json_decode($requestData["services"], true);
    
            if (isset($serviceData['services'])) 
            {
                $oldService = $penthouse->getAccomodationServices();
                foreach($oldService as $deletableService)
                    $penthouse->removeAccomodationService($deletableService);
                
                    $serviceIris = $serviceData["services"];
                foreach ($serviceIris as $serviceIri) 
                {   
                    $service = $iriConverter->getResourceFromIri($serviceIri);
                    $penthouse->addAccomodationService($service);
                }
            }
        }
        
        if ($request->files->get('file')) 
        {
            $uploadedFile = $request->files->get('file');

            if ($penthouse->getPictures()->first())
            {
                $oldPicture = $penthouse->getPictures()->first();
                $penthouse->removePicture($oldPicture);
            }
            
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $entityManager->persist($picture);
            $penthouse->addPicture($picture);
        }

        return $penthouse;
    }   
}