<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Amount;
use App\Entity\Picture;
use App\Entity\Capacity;
use App\Entity\Penthouse;
use App\Entity\Accomodation;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class PenthousePostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter, EntityManagerInterface $entityManager): Penthouse
    {   
        $penthouse = new Penthouse();
        $picture = new Picture();
        $amount = new Amount();
        $requestData = $request->request->all();
        $hotel = $iriConverter->getResourceFromIri($requestData['hotel']);
        
        //Gestion d'erreurs
        if (!($hotel instanceof Hotel))
             throw new HttpException(422, "l'IRI n'est pas de type Hotel");

        //Pictures
        if ($request->files->get('file')) {
            $uploadedFile = $request->files->get('file');
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $penthouse->addPicture($picture);
        }

        // Penthouse
        $penthouse->setType($requestData['type']);
        $penthouse->setSize($requestData['size']);
        $penthouse->setDescription($requestData['description']);
        $penthouse->setView($requestData['view']);
        $penthouse->setBalcony($requestData['balcony']);
        $penthouse->setNumberOfBeds($requestData['numberOfBeds']);
        $penthouse->setNumberOfRooms($requestData['numberOfRooms']);
        $penthouse->setPetsAllowed($requestData['petsAllowed']);
        $penthouse->setHotel($hotel);

        //Limit Number of Rooms
        if ($hotel->getNumberOfRooms() >= Accomodation::MAX_NUMBER)
            throw new HttpException(422, "Le nombre de chambres total ne doit pas dépasser la limite");
        else
            $hotel->setNumberOfRooms($hotel->getNumberOfRooms() + 1);

        //Capacity
        $decodeCapacity = json_decode($requestData["capacity"], true);
        $nbrOfAdultMax = $decodeCapacity["nbrOfAdultMax"];
        $nbrOfChildMax = isset($decodeCapacity["nbrOfChildMax"]) ? $decodeCapacity["nbrOfChildMax"] : 0;
        $capacity = new Capacity($nbrOfAdultMax, $nbrOfChildMax);
        $penthouse->setCapacity($capacity);

        //PricePerNight
        $decodePriceperNight = json_decode($requestData['pricePerNight'], true);
        $amount->setValue($decodePriceperNight['pricePerNight']);
        $amount->setCurrency($iriConverter->getResourceFromIri($decodePriceperNight['currencies']));
        $penthouse->setPricePerNight($amount);

        //Equipments and services
        $equipmentData = json_decode($requestData["equipments"], true);
        $equipmentIris = $equipmentData["equipments"];
        foreach ($equipmentIris as $equipmentIri) 
        {
            $equipment = $iriConverter->getResourceFromIri($equipmentIri);
            $penthouse->addAccomodationEquipment($equipment);
        }
        
        $services = $requestData["services"];
        foreach ($services as $serviceIri) {
            $service = $iriConverter->getResourceFromIri($serviceIri);
            $penthouse->addAccomodationService($service);
        }
        
        return $penthouse;
    }
}