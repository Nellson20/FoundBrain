<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Villa;
use App\Entity\Amount;
use App\Entity\Picture;
use App\Entity\Capacity;
use App\Entity\Accomodation;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class VillaPostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter): Villa
    {
        $villa = new Villa();
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
            $villa->addPicture($picture);
        }

        //Villa
        $villa->setType($requestData['type']);
        $villa->setSize($requestData['size']);
        $villa->setDescription($requestData['description']);
        $villa->setView($requestData['view']);
        $villa->setBalcony($requestData['balcony']);        
        $villa->setNumberOfBeds($requestData['numberOfBeds']);
        $villa->setNumberOfRooms($requestData['numberOfRooms']);
        $villa->setNumberOfBathrooms($requestData['numberOfBathrooms']);
        $villa->setPetsAllowed($requestData['petsAllowed']);
        $villa->setGarden($requestData['garden']);
        $villa->setPool($requestData['pool']);
        $villa->setTerrace($requestData['terrace']);
        $villa->setHotel($hotel);

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
        $villa->setCapacity($capacity);

        //PricePerNight
        $decodePriceperNight = json_decode($requestData['pricePerNight'], true);
        $amount->setValue($decodePriceperNight['pricePerNight']);
        $amount->setCurrency($iriConverter->getResourceFromIri($decodePriceperNight['currencies']));
        $villa->setPricePerNight($amount);

        //Equipments and services
        $equipmentData = json_decode($requestData["equipments"], true);
        $equipmentIris = $equipmentData["equipments"];
        foreach ($equipmentIris as $equipmentIri) 
        {
            $equipments = $iriConverter->getResourceFromIri($equipmentIri);
            $villa->addAccomodationEquipment($equipments);
        }
        
        $services = $requestData["services"];
        foreach ($services as $serviceIri) {
            $service = $iriConverter->getResourceFromIri($serviceIri);
            $villa->addAccomodationService($service);
        }

        return $villa;
    }
}