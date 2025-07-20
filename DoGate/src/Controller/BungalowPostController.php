<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Amount;
use App\Entity\Picture;
use App\Entity\Bungalow;
use App\Entity\Capacity;
use App\Entity\Accomodation;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BungalowPostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter): Bungalow
    {
        $bungalow = new Bungalow();
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
            $bungalow->addPicture($picture);
        }

        //Bungalow
        $bungalow->setType($requestData['type']);
        $bungalow->setSize($requestData['size']);
        $bungalow->setDescription($requestData['description']);
        $bungalow->setView($requestData['view']);
        $bungalow->setBalcony($requestData['balcony']);
        $bungalow->setNumberOfBeds($requestData['numberOfBeds']);
        $bungalow->setPetsAllowed($requestData['petsAllowed']);
        $bungalow->setGarden($requestData['garden']);
        $bungalow->setTerrace($requestData['terrace']);
        $bungalow->setHotel($hotel);
        
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
        $bungalow->setCapacity($capacity);

        //PricePerNight
        $decodePriceperNight = json_decode($requestData['pricePerNight'], true);
        $amount->setValue($decodePriceperNight['pricePerNight']);
        $amount->setCurrency($iriConverter->getResourceFromIri($decodePriceperNight['currencies']));
        $bungalow->setPricePerNight($amount);

        //Equipments and services
        $equipmentData = json_decode($requestData["equipments"], true);
        $equipmentIris = $equipmentData["equipments"];
        foreach ($equipmentIris as $equipmentIri) 
        {
            $equipments = $iriConverter->getResourceFromIri($equipmentIri);
            $bungalow->addAccomodationEquipment($equipments);
        }

        $services = $requestData["services"];
        foreach ($services as $serviceIri) {
            $service = $iriConverter->getResourceFromIri($serviceIri);
            $bungalow->addAccomodationService($service);
        }

        return $bungalow;
    }
}