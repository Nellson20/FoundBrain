<?php

namespace App\Controller;

use App\Entity\Room;
use App\Entity\Hotel;
use App\Entity\Amount;
use App\Entity\Picture;
use App\Entity\Capacity;
use ApiPlatform\Api\IriConverterInterface;
use App\Entity\Accomodation;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class RoomPostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter): Room
    {
        $requestData = $request->request->all();
        $hotel = $iriConverter->getResourceFromIri($requestData['hotel']);
        $room = new Room();

        if (!($hotel instanceof Hotel))
             throw new HttpException(422, "l'IRI n'est pas de type Hotel");
        
        if ($hotel->getNumberOfRooms() >= Accomodation::MAX_NUMBER)
             throw new HttpException(422, "Le nombre de chambres total ne doit pas dépasser la limite");
        else
            $hotel->setNumberOfRooms($hotel->getNumberOfRooms() + 1);

        if ($request->files->get('roomImages'))
        {
            $uploadedFiles = $request->files->get('roomImages');
        
            foreach ($uploadedFiles as $uploadedFile)
            {
                $picture = new Picture();
                $picture->setFile($uploadedFile);
                $picture->setFolder('pictures');
                $room->addPicture($picture);
            }
        }

        $room->setFloor($requestData['floor']);
        $room->setType($requestData['type']);
        $room->setSize($requestData['size']);
        $room->setDescription($requestData['description']);
        $room->setView($requestData['view']);
        $room->setBalcony($requestData['balcony']);
        $room->setNumberOfBeds($requestData['numberOfBeds']);
        $room->setPetsAllowed($requestData['petsAllowed']);
        $room->setHotel($hotel);

        $postedPriceperNight = json_decode($requestData['pricePerNight']);
        $amount = new Amount();
        $amount->setValue($postedPriceperNight->pricePerNight);
        $amount->setCurrency($iriConverter->getResourceFromIri($postedPriceperNight->currencies));
        $room->setPricePerNight($amount);   

        $postedCapacity = json_decode($requestData["capacity"]);
        $nbrOfAdultMax = $postedCapacity->nbrOfAdultMax;
        $nbrOfChildMax = isset($postedCapacity->nbrOfChildMax) ? $postedCapacity->nbrOfChildMax : 0;
        $capacity = new Capacity($nbrOfAdultMax, $nbrOfChildMax);
        $room->setCapacity($capacity);
    
        $equipments = $requestData["equipmentsRoom"];
        foreach ($equipments as $equipmentIri)
        {
            $accomodationEquipment = $iriConverter->getResourceFromIri($equipmentIri);
            $room->addAccomodationEquipment($accomodationEquipment);
        }

        $equipments = $requestData["equipmentsBathRoom"];
        foreach ($equipments as $equipmentIri)
        {
            $bathroomEquipment = $iriConverter->getResourceFromIri($equipmentIri);
            $room->addBathRoomEquipment($bathroomEquipment);
        }

        $services = $requestData["services"];
        foreach ($services as $serviceIri)
        {
            $service = $iriConverter->getResourceFromIri($serviceIri);
            $room->addAccomodationService($service);
        }

        return $room;
    }
}