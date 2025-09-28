<?php

namespace App\Controller;

use App\Entity\Restaurant;
use App\Entity\Picture;
use App\Entity\Position;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RestaurantPostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter):Restaurant
    {   
        $requestData= $request->request->all();
        $position =null;
        if (isset($requestData['position'])){
            $decodedPosition = json_decode($requestData['position'], true);
            if ($decodedPosition !== null && isset($decodedPosition["latitude"]) && isset($decodedPosition['longitude'])) {
                $position = new Position();
                $position->setLat($decodedPosition["lat"]);
                $position->setLng($decodedPosition['lng']);
            }
        }
        if ($request->files->get('file'))
        {
            $uploadedFile = $request->files->get('file');
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
        }

        $restaurant = new Restaurant();
        $restaurant->setName($requestData['name']);
        $restaurant->setDescription($requestData['description']);
        $restaurant->setAddress($requestData['address']);
        $restaurant->setOpeningHours($requestData['openingHours']);
        $restaurant->setWebsites($requestData['websites']);
        $restaurant->setContact($requestData['contact']);
        $restaurant->setCapacity($requestData['capacity']);
        $restaurant->setRating($requestData['rating']);
        $restaurant->setCertifications($requestData['certifications']);
        $restaurant->setCancellationPolicy(($requestData['cancellationPolicy']));
        $restaurant->setSpecialEvents($requestData['specialEvents']);
        $restaurant->setCompany($iriConverter->getResourceFromIri($requestData['company']));
        $restaurant->setCity($iriConverter->getResourceFromIri($requestData['city']));

        $cuisineTypesData = json_decode($requestData['cuisineTypes'], true);
        $cuisineTypesIris = $cuisineTypesData['cuisineTypes'];
        foreach($cuisineTypesIris as $cuisineTypesIri)
        {
            $cuisineTypes =$iriConverter->getResourceFromIri($cuisineTypesIri);
            $restaurant->addCuisineType($cuisineTypes);
        }

        $restaurantTypeData = json_decode($requestData['restaurantType'], true);
        $restaurantTypeIris= $restaurantTypeData['restaurantType'];
        foreach( $restaurantTypeIris as $restaurantTypeIri)
        {   
            $restaurantType = $iriConverter->getResourceFromIri($restaurantTypeIri);
            $restaurant->addRestauranType($restaurantType);
        }

        $restaurantServicesData = json_decode($requestData['restaurantServices'], true);
        $restaurantServicesIris = $restaurantServicesData['restaurantServices'];
        foreach($restaurantServicesIris as $restaurantServiceIri)
        {
            $restaurantService= $iriConverter->getResourceFromIri($restaurantServiceIri);
            $restaurant->addRestaurantService($restaurantService);
        }
        
        if ($position !== null)
            $restaurant->setPosition($position);
     
        if ($picture !== null)
            $restaurant->addPicture($picture);
        return $restaurant;
    }
}
?>