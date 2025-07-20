<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Amount;
use App\Entity\Chalet;
use App\Entity\Picture;
use App\Entity\Capacity;
use App\Entity\Accomodation;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ChaletPostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter): Chalet
    {
        $chalet = new Chalet();
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
            $chalet->addPicture($picture);
        }
        
        //Chalet
        $chalet->setType($requestData['type']);
        $chalet->setSize($requestData['size']);
        $chalet->setDescription($requestData['description']);
        $chalet->setView($requestData['view']);
        $chalet->setBalcony($requestData['balcony']);
        $chalet->setNumberOfBeds($requestData['numberOfBeds']);
        $chalet->setPetsAllowed($requestData['petsAllowed']);
        $chalet->setGarden($requestData['garden']);
        $chalet->setTerrace($requestData['terrace']);
        $chalet->setNumberOfBathrooms($requestData['numberOfBathrooms']);
        $chalet->setNumberOfRooms($requestData['NumberOfRooms']);
        $chalet->setHotel($hotel);

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
        $chalet->setCapacity($capacity);

        //PricePerNight
        $decodePriceperNight = json_decode($requestData['pricePerNight'], true);
        $amount->setValue($decodePriceperNight['pricePerNight']);
        $amount->setCurrency($iriConverter->getResourceFromIri($decodePriceperNight['currencies']));
        $chalet->setPricePerNight($amount);

        //Equipments and services
        $equipmentData = json_decode($requestData["equipments"], true);
        $equipmentIris = $equipmentData["equipments"];
        foreach ($equipmentIris as $equipmentIri) 
        {
            $equipments = $iriConverter->getResourceFromIri($equipmentIri);
            $chalet->addAccomodationEquipment($equipments);
        }
        $services = $requestData["services"];
        foreach ($services as $serviceIri) {
            $service = $iriConverter->getResourceFromIri($serviceIri);
            $chalet->addAccomodationService($service);
        }
    
        return $chalet;
    }
}