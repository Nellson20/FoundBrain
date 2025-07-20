<?php

namespace App\Controller;

use App\Entity\Park;
use App\Entity\Picture;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class ParkPutController extends AbstractController
{
    public function __invoke(Request $request, Park $park, EntityManagerInterface $entityManager, IriConverterInterface $iriConverter): Park
    {
        if (!$park)
        {
            throw new HttpException(422,"Park not found");
        } 

        $requestData=$request->request->all();

        if(isset($requestData['qtRide']))
        {
            $park->setQtRide($requestData['qtRide']);
        }
            
        if(isset($requestData['description']))
        {
             $park->setDescription(($requestData['description']));
        }
        
        

        if(isset($requestData['placeToStay']))
        {
            $park->setPlaceToStay($requestData['placeToStay']);
        }

        if(isset($requestData['policy']))
        {
            $park->setPolicy($requestData['policy']);
        } 

        if(isset($requestData['website']))
        {
            $park->setWebsite($requestData['website']);
        }

        if(isset($requestData['contacts']))
        {
            $park->setContacts($requestData['contacts']);
        }
        
        if(isset($requestData['openHours']))
        {   
            $openHoursString = $requestData['openHours'];
            $openHours = new DateTime($openHoursString);
            $park->setOpenHours($openHours);
        }
        if(isset($requestData['closeHours']))
        {
            $closeHoursString =$requestData['closeHours'];
            $closeHours= new DateTime($closeHoursString);
            $park->setcloseHours($closeHours);
        }

        if (isset($requestData['thingsToDo'])) 
        {
            $thingsData = json_decode($requestData["thingsToDo"], true);
    
            if (isset($thingsData['thingsToDo'])) 
            {
                $oldThings = $park->getThingsToDo();
                foreach($oldThings as $deletableThings)
                    $park->removeThingsToDo($deletableThings);
                
                 $thingsIris = $thingsData["thingsToDo"];
                foreach ($thingsIris as $thingsIri) 
                {   
                    $things = $iriConverter->getResourceFromIri($thingsIri);
                    $park->addThingsToDo($things);
                }
            }
        }       
        
        if ($request->files->get('file')) 
        {
            $uploadedFile = $request->files->get('file');

            if ($park->getPictures()->first())
            {
                $oldPicture = $park->getPictures()->first();
                $park->removePicture($oldPicture);
            }
            
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $entityManager->persist($picture);
            $park->addPicture($picture);
        }
        return $park;
    }
}
