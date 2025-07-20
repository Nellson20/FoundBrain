<?php

namespace App\Controller;

use App\Entity\Restaurant;
use App\Entity\Picture;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RestaurantPutController extends AbstractController
{
    public function __invoke(Restaurant $restaurant,Request $request, IriConverterInterface $iriConverter): Restaurant
    {
        $requestData = $request->request->all();

        if(isset($requestData['name']))
        {
            $restaurant->setName($requestData['name']);

        }
        if(isset($requestData['rating']))
        {
            $restaurant->setRating($requestData['rating']);
        }
        if(isset($requestData['address']))
        {
            $restaurant->setAddress($requestData['address']);
        }
        if(isset($requestData['description']))
        {
            $restaurant->setDescription($requestData['description']);
        }
        if(isset($requestData['openingHours']))
        {
            $restaurant->setOpeningHours($requestData['openingHours']);
        }
        if(isset($requestData['websites']))
        {
            $restaurant->setWebsites($requestData['websites']);
        }
        if(isset($requestData['contact']))
        {
            $restaurant->setContact($requestData['contact']);
        }
        if(isset($requestData['capacity']))
        {
            $restaurant->setCapacity($requestData['capacity']);
        }
        if(isset($requestData['certifications']))
        {
            $restaurant->setCertifications($requestData['certifications']);
        }
        if(isset($requestData['cancellationPolicy']))
        {
            $restaurant->setCancellationPolicy($requestData['cancellationPolicy']);
        }
        if(isset($requestData['specialEvents']))
        {
            $restaurant->setSpecialEvents($requestData['specialEvents']);
        }
        
        if (isset($requestData['cuisineTypes'])) 
        {
            $cuisineTypeData = json_decode($requestData["cuisineTypes"], true);
    
            if (isset($cuisineTypeData['cuisineTypes'])) 
            {
                $oldCuisineType = $restaurant->getCuisineTypes();
                foreach($oldCuisineType as $deletableCuisineType)
                    $restaurant->removeCuisineType($deletableCuisineType);
                
                    $cuisineTypeIris = $cuisineTypeData["cuisineTypes"];
                foreach ($cuisineTypeIris as $cuisineTypeIri) 
                {   
                    $cuisineType= $iriConverter->getResourceFromIri($cuisineTypeIri);
                    $restaurant->addCuisineType($cuisineType);
                }
            }
        }

        if (isset($requestData['restaurantType'])) 
        {
            $restaurantTypeData = json_decode($requestData["restaurantType"], true);
    
            if (isset($restaurantTypeData['restaurantType'])) 
            {
                $oldRestaurantType = $restaurant->getRestauranType();
                foreach($oldRestaurantType as $deletableRestaurantType)
                    $restaurant->removeRestauranType($deletableRestaurantType);
                
                    $restaurantTypeIris = $restaurantTypeData["restaurantType"];
                foreach ($restaurantTypeIris as $restaurantTypeIri) 
                {   
                    $restauranType= $iriConverter->getResourceFromIri($restaurantTypeIri);
                    $restaurant->addRestauranType($restauranType);
                }
            }
        }

        if (isset($requestData['restaurantServices'])) 
        {
            $restaurantServicesData = json_decode($requestData["restaurantServices"], true);
    
            if (isset($restaurantServicesData['restaurantServices']))
            {
                $oldRestaurantServices = $restaurant->getRestaurantServices();
                foreach($oldRestaurantServices as $deletableRestaurantService)
                    $restaurant->removeRestaurantService($deletableRestaurantService);
                
                    $restaurantServicesIris = $restaurantServicesData["restaurantServices"];
                foreach ($restaurantServicesIris as $restaurantServicesIri) 
                {   
                    $restaurantServices= $iriConverter->getResourceFromIri($restaurantServicesIri);
                    $restaurant->addRestaurantService($restaurantServices);
                }
            }
        }


        return $restaurant;

    }
}
