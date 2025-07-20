<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Suite;
use App\Entity\Amount;
use App\Entity\Picture;
use App\Entity\Capacity;
use App\Entity\Accomodation;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SuitePostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter): Suite
    {
        $suite = new Suite();
        $amount = new Amount();
        $picture = new Picture();
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
            $suite->addPicture($picture);
        }

        //Suite
        $suite->setType($requestData['type']);
        $suite->setSize($requestData['size']);
        $suite->setDescription($requestData['description']);
        $suite->setView($requestData['view']);
        $suite->setBalcony($requestData['balcony']);
        $suite->setNumberOfBeds($requestData['numberOfBeds']);
        $suite->setPetsAllowed($requestData['petsAllowed']);
        $suite->setNumberOfRooms($requestData['numberOfRooms']);
        $suite->setHotel($hotel);

        //Capacity
        $decodeCapacity = json_decode($requestData["capacity"], true);
        $nbrOfAdultMax = $decodeCapacity["nbrOfAdultMax"];
        $nbrOfChildMax = isset($decodeCapacity["nbrOfChildMax"]) ? $decodeCapacity["nbrOfChildMax"] : 0;
        $capacity = new Capacity($nbrOfAdultMax, $nbrOfChildMax);
        $suite->setCapacity($capacity);

        //Limit Number of Rooms
        if ($hotel->getNumberOfRooms() >= Accomodation::MAX_NUMBER)
            throw new HttpException(422, "Le nombre de chambres total ne doit pas dépasser la limite");
        else
            $hotel->setNumberOfRooms($hotel->getNumberOfRooms() + 1);


        //PricePerNight
        $decodePriceperNight = json_decode($requestData['pricePerNight'], true);
        $amount->setValue($decodePriceperNight['pricePerNight']);
        $amount->setCurrency($iriConverter->getResourceFromIri($decodePriceperNight['currencies']));
        $suite->setPricePerNight($amount);

        //Equipments and services
        $equipmentData = json_decode($requestData["equipments"], true);
        $equipmentIris = $equipmentData["equipments"];
        foreach ($equipmentIris as $equipmentIri) 
        {
            $equipments = $iriConverter->getResourceFromIri($equipmentIri);
            $suite->addAccomodationEquipment($equipments);
        }
        $serviceData = json_decode($requestData["services"], true);
        $serviceIris = $serviceData["services"];
        foreach ($serviceIris as $serviceIri) 
        {
            $services = $iriConverter->getResourceFromIri($serviceIri);
            $suite->addAccomodationService($services);
        }

        return $suite;
    }
}