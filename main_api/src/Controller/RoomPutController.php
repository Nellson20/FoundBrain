<?php

namespace App\Controller;

use App\Entity\Room;
use App\Entity\Picture;
use App\Entity\Capacity;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RoomPutController extends AbstractController
{
    public function __invoke(Room $room,Request $request, EntityManagerInterface $entityManager, IriConverterInterface $iriConverter) : Room
    {
        if (!$room)
            throw new HttpException(422,"Room not found");

        $requestData = $request->request->all();

        if (isset($requestData['floor']))
            $room->setFloor($requestData['floor']); 

        if (isset($requestData['type']))
            $room->setType($requestData['type']);        

        if (isset($requestData['size']))
            $room->setSize($requestData['size']);
        
        if (isset($requestData['view'])) 
            $room->setView($requestData['view']);
        
        if (isset($requestData['balcony']))
            $room->setBalcony($requestData['balcony']);

        if (isset($requestData['numberOfBeds']))
            $room->setNumberOfBeds($requestData['numberOfBeds']);
        
        if (isset($requestData['petsAllowed']))
            $room->setPetsAllowed($requestData['petsAllowed']);

        if (isset($requestData['numberOfBeds']))
            $room->setNumberOfBeds($requestData['numberOfBeds']);
            
        if (isset($requestData['description']))
            $room->setDescription($requestData['description']);

            if (isset($requestData["equipments"])){
                $oldEquipment = $room->getAccomodationEquipments();
                foreach($oldEquipment as $deletableEquipment)
                {
                    $room->removeAccomodationEquipment($deletableEquipment);
                }
                $equipmentsIris =$requestData['equipments'];
                foreach ($equipmentsIris as $equipmentIri) {
                    $equipment = $iriConverter->getResourceFromIri($equipmentIri);
                    $room->addAccomodationEquipment($equipment);
                }
            }

        if (isset($requestData['services'])) 
        {
            $oldService = $room->getAccomodationServices();
            foreach($oldService as $deletableService)
            {
                $room->removeAccomodationService($deletableService);
            }
            
            $serviceIris = $requestData["services"];
            foreach ($serviceIris as $serviceIri) 
            {   
                $service = $iriConverter->getResourceFromIri($serviceIri);
                $room->addAccomodationService($service);
            }
        }
        
        if ($request->files->get('roomImages'))
        {
            $oldPictures = $room->getPictures();

            foreach ($oldPictures as $deletablePicture)
                $room->removePicture($deletablePicture);

            $uploadedFiles = $request->files->get('roomImages');

            foreach ($uploadedFiles as $uploadedFile)
            {
                $picture = new Picture();
                $picture->setFile($uploadedFile);
                $picture->setFolder('pictures');
                $room->addPicture($picture);
            }
        }

        if (isset($requestData['capacity']))
        {
            $postedCapacity = json_decode($requestData["capacity"]);
            $nbrOfAdultMax = $postedCapacity->nbrOfAdultMax;
            $nbrOfChildMax = isset($postedCapacity->nbrOfChildMax) ? $postedCapacity->nbrOfChildMax : 0;
            $capacity = new Capacity($nbrOfAdultMax, $nbrOfChildMax);
            $room->setCapacity($capacity);
        }

        return $room;
    }   
}