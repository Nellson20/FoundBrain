<?php

namespace App\Controller;

use App\Entity\Email;
use App\Entity\Hotel;
use App\Entity\Rules;
use App\Entity\Amount;
use App\Entity\Picture;
use App\Entity\Position;
use App\Config\RulesType;
use App\Config\ParkingType;
use App\Entity\PhoneNumber;
use App\Config\LocationParking;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HotelPutController extends AbstractController
{
    public function __invoke(Hotel $hotel,Request $request, IriConverterInterface $iriConverter) : Hotel
    {
        if (!($hotel instanceof Hotel))
            throw new HttpException(422, "l'IRI n'est pas de type Hotel");

        $requestData = $request->request->all();
        
        if (isset($requestData['name']))
            $hotel->setName($requestData['name']);
        
        if (isset($requestData['rating']))
            $hotel->setRating($requestData['rating']);
        
        if (isset($requestData['address']))
            $hotel->setAddress($requestData['address']);

        if (isset($requestData['website']))
            $hotel->setWebsite($requestData['website']);

        if (isset($requestData['description'])) 
            $hotel->setDescription($requestData['description']);

        if ($request->files->get('hotelImages'))
        {
            $oldPictures = $hotel->getPictures();

            foreach ($oldPictures as $deletablePicture)
                $hotel->removePicture($deletablePicture);

            $uploadedFiles = $request->files->get('hotelImages');

            foreach ($uploadedFiles as $uploadedFile)
            {
                $picture = new Picture();
                $picture->setFile($uploadedFile);
                $picture->setFolder('pictures');
                $hotel->addPicture($picture);
            }
        }

        if (isset($requestData['position']))
        {
            $postedPosition = $requestData['position'];
            $postedPositionData = json_decode($postedPosition);
            
            if ($postedPositionData !== null && isset($postedPositionData->lat) && isset($postedPositionData->lng))
            {
                $position = new Position();
                $position->setLat($postedPositionData->lat);
                $position->setLng($postedPositionData->lng);
                $hotel->setPosition($position);
            }
        }  


        if (isset($requestData["equipments"]))
        {
            $oldEquipment = $hotel->getHotelEquipments();
            foreach($oldEquipment as $deletableEquipment)
            {
                $hotel->removeHotelEquipment($deletableEquipment);
            }
            $equipmentsIris =$requestData['equipments'];
            foreach ($equipmentsIris as $equipmentIri) {
                $equipment = $iriConverter->getResourceFromIri($equipmentIri);
                $hotel->addHotelEquipment($equipment);
            }
        }
        

        if (isset($requestData['services'])) 
        {
           $oldService = $hotel->getHotelServices();
            foreach($oldService as $deletableService)
            {
                $hotel->removeHotelService($deletableService);
            }
            
            $serviceIris = $requestData["services"];
            foreach ($serviceIris as $serviceIri) 
            {   
                $service = $iriConverter->getResourceFromIri($serviceIri);
                $hotel->addHotelService($service);
            }
        }
        

        if(isset ($requestData['breakfast']))
        {
              
            $postedBreakfast =  json_decode($requestData['breakfast']); 
            $breakfast = $hotel->getBreakfast();
            $extra = $breakfast->getExtra();

            if(isset ($postedBreakfast->value))
                $extra->setValue($postedBreakfast->value);

            if(isset($postedBreakfast->currency))
                $extra->setCurrency($iriConverter->getResourceFromIri($postedBreakfast->currency));

            $breakfast->setExtra($extra);

            if(isset($postedBreakfast->type))
            {
                $oldTypeBreakfast = $breakfast->getTypeBreakfast();

                foreach($oldTypeBreakfast as $deletableTypeBreakfast)
                {
                    $breakfast->removeTypeBreakfast($deletableTypeBreakfast);
                }

                $typeBreakfast = $iriConverter->getResourceFromIri($postedBreakfast->type);
                $breakfast->addTypeBreakfast($typeBreakfast);
            }
                $hotel->setBreakfast($breakfast);
        }

        if (isset($requestData['parking']))
        {   
            $postedParking = json_decode($requestData['parking']);
            
            $parking = $hotel->getParking();
            if(isset($postedParking->numberOfPlaces))
                $parking->setNumberOfPlaces($postedParking->numberOfPlaces);

            if(isset($postedParking->locationParking))
                $parking->setLocationParking(LocationParking::from($postedParking->locationParking));

            if(isset($postedParking->parkingType))
                $parking->setParkingType(ParkingType::from($postedParking->parkingType));
            
            if (isset($postedParking->pricePlace))
            {
                $amount = new Amount();
                $amount->setValue($postedParking->pricePlace);
                $amount->setCurrency($iriConverter->getResourceFromIri($postedParking->currencies));
                $parking->setPricePlace($amount);
            }
        
            $hotel->setParking($parking);
        }

        if(isset($requestData["emails"]))
        {
            $oldEmail = $hotel->getEmails();

            foreach($oldEmail as $deletableEmail)
                $hotel->removeEmail($deletableEmail);

            $emails = $requestData['emails'];

            foreach ($emails as $emailData)
            {
                $emailData=json_decode($emailData);
                $email = new Email();
                $email->setReference($emailData->reference);
                $email->setValue($emailData->value);
                $hotel->addEmail($email);
            } 
        }

        if (isset($requestData['phoneNumbers']))
        {
          $oldPhoneNumbers = $hotel->getPhoneNumbers();
            
          foreach($oldPhoneNumbers as $deletablePhoneNumbers)
                $hotel->removePhoneNumber($deletablePhoneNumbers);

            $phoneNumbers = $requestData['phoneNumbers'];

            foreach ($phoneNumbers as $phoneNumberData)
            {
                $phoneNumberData=json_decode($phoneNumberData);
                $phoneNumber = new PhoneNumber();
                $phoneNumber->setReference($phoneNumberData->reference);
                $phoneNumber->setValue($phoneNumberData->value);
                $phoneNumber->setCountryCode($iriConverter->getResourceFromIri($phoneNumberData->pays));
                $hotel->addPhoneNumber($phoneNumber);
            }
        }

        if(isset($requestData['languages']))
        {
            
            $oldLanguage = $hotel->getLanguages();
            foreach($oldLanguage as $deletableLanguages)
            {
                $hotel->removeLanguage($deletableLanguages);
            }
             $languages = $requestData['languages'];
            foreach($languages as $languageIri)
            {
                $language = $iriConverter->getResourceFromIri($languageIri);
                $hotel->addLanguage($language);
            }
        }

        if (isset($requestData['rules']))
        {
            $rules = $requestData['rules'];
            
            foreach($rules as $rulesData)
            {
                $postedRules = json_decode($rulesData);
                $rules = new Rules;
                $rules->setName(RulesType::from($postedRules->name));
                $rules->setValue($postedRules->value);
                $hotel->addRule($rules);
            }
        }

        return $hotel;
    }   
}