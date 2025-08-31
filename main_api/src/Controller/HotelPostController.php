<?php

namespace App\Controller;

use App\Entity\Email;
use App\Entity\Hotel;
use App\Entity\Amount;
use App\Entity\Parking;
use App\Entity\Picture;
use App\Entity\Position;
use App\Entity\Breakfast;
use App\Config\ParkingType;
use App\Config\LocationParking;
use ApiPlatform\Api\IriConverterInterface;
use App\Config\RulesType;
use App\Entity\PhoneNumber;
use App\Entity\Rules;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HotelPostController extends AbstractController
{

    public function __invoke(Request $request, IriConverterInterface $iriConverter): Hotel
    {
        $requestData = $request->request->all();
        $hotel = new Hotel();

        if (isset($requestData['position'])) {
            $postedPositionData = json_decode($requestData['position']);
            $position = new Position();
            if (isset($postedPositionData->lat) && $postedPositionData->lat !== "") $position->setLat((float) $postedPositionData->lat);
            if (isset($postedPositionData->lng) && $postedPositionData->lng !== "") $position->setLng((float) $postedPositionData->lng);
            $hotel->setPosition($position);
        }

        if ($uploadedFiles = $request->files->get('pictures')) {
            foreach ($uploadedFiles as $uploadedFile) {
                $picture = new Picture();
                $picture->setFile($uploadedFile);
                $picture->setFolder('pictures');
                $hotel->addPicture($picture);
            }
        }

        $hotel->setName($requestData['name'] ?? null);
        $hotel->setRating($requestData['rating'] ?? null);
        $hotel->setAddress($requestData['address'] ?? null);
        $hotel->setDescription($requestData['description'] ?? null);

        if ($website = $requestData['website'] ?? null)
            $hotel->setWebsite($website ?? null);

        if ($companyIri = $requestData['company'] ?? null)
            $hotel->setCompany($iriConverter->getResourceFromIri($companyIri));

        if ($cityIri = $requestData['city'] ?? null)
            $hotel->setCity($iriConverter->getResourceFromIri($cityIri));

        $emails = $requestData['emails'];
        foreach ($emails as $emailData) {
            $emailData = json_decode($emailData);
            $email = new Email();
            $email->setValue($emailData->value ?? null);
            $email->setReference($emailData->reference ?? null);
            $hotel->addEmail($email);
        }

        $phoneNumbers = $requestData['phoneNumbers'];
        foreach ($phoneNumbers as $phoneNumberData) {
            $phoneNumberData = json_decode($phoneNumberData);
            $phoneNumber = new PhoneNumber();
            $phoneNumber->setReference($phoneNumberData->reference ?? null);
            $phoneNumber->setValue($phoneNumberData->value ?? null);
            if (isset($phoneNumberData->country)) $phoneNumber->setCountry($iriConverter->getResourceFromIri($phoneNumberData->country));
            $hotel->addPhoneNumber($phoneNumber);
        }

        $equipments = $requestData["equipments"] ?? [];
        foreach ($equipments as $equipmentIri) {
            $equipment = $iriConverter->getResourceFromIri($equipmentIri);
            $hotel->addHotelEquipment($equipment);
        }

        $languages = $requestData['languages'] ?? [];
        foreach ($languages as $languageIri) {
            $language = $iriConverter->getResourceFromIri($languageIri);
            $hotel->addLanguage($language);
        }

        $services = $requestData["services"] ?? [];
        foreach ($services as $serviceIri) {
            $service = $iriConverter->getResourceFromIri($serviceIri);
            $hotel->addHotelService($service);
        }
        if (isset($requestData['parking'])) {
            $postedParking = json_decode($requestData['parking']);
            $amount = new Amount();
            if (isset($postedParking->extra->value) && $postedParking->extra->value !== "") $amount->setValue((float) $postedParking->extra->value);
            if (isset($postedParking->extra->currency) && $postedParking->extra->currency !== "") $amount->setCurrency($iriConverter->getResourceFromIri($postedParking->extra->currency));
            $parking = new Parking();
            $parking->setPricePlace($amount);
            if (isset($postedParking->numberOfPlaces) && $postedParking->numberOfPlaces !== "") $parking->setNumberOfPlaces((int) $postedParking->numberOfPlaces);
            if (isset($postedParking->location)) $parking->setLocationParking($postedParking->location);
            if (isset($postedParking->parkingType)) $parking->setParkingType($postedParking->parkingType);
            $hotel->setParking($parking);
        }



        $postedBreakfasts = $requestData['breakfasts'] ?? [];
        if (is_array($postedBreakfasts) && count($postedBreakfasts) > 0) {
            foreach ($postedBreakfasts as $postedBreakfastString) {
                $extra = new Amount();
                $postedBreakfast = json_decode($postedBreakfastString);
                if (isset($postedBreakfast->extra->value) && $postedBreakfast->extra->value !== "") $extra->setValue((float) $postedBreakfast->extra->value);
                if (isset($postedBreakfast->extra->currency) && $postedBreakfast->extra->value !== "") $extra->setCurrency($iriConverter->getResourceFromIri($postedBreakfast->extra->currency));
                $breakfast = new Breakfast();
                $breakfast->setExtra($extra);
                if (isset($postedBreakfast->type)) $breakfast->addTypeBreakfast($iriConverter->getResourceFromIri($postedBreakfast->type));
                $hotel->addBreakfast($breakfast);
            }
        }

        if (isset($requestData['rules'])) {
            $rules = $requestData['rules'];
            foreach ($rules as $rulesData) {
                $postedRules = json_decode($rulesData);
                $rules = new Rules;
                $rules->setName($postedRules->name ?? null);
                $rules->setValue($postedRules->value ?? null);
                $hotel->addRule($rules);
            }
        }

        return $hotel;
    }
}
