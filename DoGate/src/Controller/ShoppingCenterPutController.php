<?php

namespace App\Controller;
use App\Entity\ShoppingCenter;
use App\Entity\Picture;
use App\Entity\Position;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use DateTimeImmutable;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ShoppingCenterPutController extends AbstractController
{
    public function __invoke (Request $request, ShoppingCenter $shoppingCenter, IriConverterInterface $iriConverter, EntityManagerInterface $entityManager,): ShoppingCenter
    {
        $requestData = $request->request->all();

        if(isset($requestData['nameStore']))
        {
            $shoppingCenter->setArea($requestData['area']);

        }

        if(isset($requestData['floor']))
        {
            $shoppingCenter->setFloor($requestData['floor']);
        }

        if (isset($requestData['thingsToDo'])) 
        {
            $thingsData = json_decode($requestData["thingsToDo"], true);
    
            if (isset($thingsData['thingsToDo'])) 
            {
                $oldThings = $shoppingCenter->getThingsToDo();
                foreach($oldThings as $deletableThings)
                    $shoppingCenter->removeThingsToDo($deletableThings);
                
                 $thingsIris = $thingsData["thingsToDo"];
                foreach ($thingsIris as $thingsIri) 
                {   
                    $things = $iriConverter->getResourceFromIri($thingsIri);
                    $shoppingCenter->addThingsToDo($things);
                }
            }  
        }
        if (isset($requestData['stores'])) 
        {
            $storeData = json_decode($requestData["stores"], true);
    
            if (isset($storeData['stores'])) 
            {
                $oldStores = $shoppingCenter->getStores();
                foreach($oldStores as $deletableStores)
                    $shoppingCenter->removeStore($deletableStores);
                
                 $storeIris = $storeData["stores"];
                foreach ($storeIris as $storeIri) 
                {   
                    $stores = $iriConverter->getResourceFromIri($storeIri);
                    $shoppingCenter->addStore($stores);
                }
            }  
        }

        if(isset($requestData['description']))
        {
             $shoppingCenter->setDescription(($requestData['description']));
        }
        
        if(isset($requestData['placeToStay']))
        {
            $shoppingCenter->setPlaceToStay($requestData['placeToStay']);
        }

        if(isset($requestData['policy']))
        {
            $shoppingCenter->setPolicy($requestData['policy']);
        } 

        if(isset($requestData['website']))
        {
            $shoppingCenter->setWebsite($requestData['website']);
        }

        if(isset($requestData['contacts']))
        {
            $shoppingCenter->setContacts($requestData['contacts']);
        }
        
        if(isset($requestData['openHours']))
        {   
            $openHoursString = $requestData['openHours'];
            $openHours = new DateTime($openHoursString);
            $shoppingCenter->setOpenHours($openHours);
        }
        if(isset($requestData['closeHours']))
        {
            $closeHoursString =$requestData['closeHours'];
            $closeHours= new DateTime($closeHoursString);
            $shoppingCenter->setcloseHours($closeHours);
        }
              
        if ($request->files->get('file')) 
        {
            $uploadedFile = $request->files->get('file');

            if ($shoppingCenter->getPictures()->first())
            {
                $oldPicture = $shoppingCenter->getPictures()->first();
                $shoppingCenter->removePicture($oldPicture);
            }
            
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $entityManager->persist($picture);
            $shoppingCenter->addPicture($picture);
        }

        return $shoppingCenter;
    }
}
?>