<?php

namespace App\Controller;

use App\Entity\Gymnasium;
use App\Entity\Picture;
use DateTime;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GymnasiumPutController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter, Gymnasium $gymnasium, EntityManagerInterface $entityManager):Gymnasium
    {
        $requestData= $request->request->all();

        if(isset($requestData['sportEquipments']))
        {
            $gymnasium->setSportEquipments($requestData['sportEquipments']);
        }

        if(isset($requestData['trainingPrograms']))
        {
            $gymnasium->setTrainingPrograms($requestData['trainingPrograms']);
        }
        if(isset($requestData['trainers']))
        {
            $gymnasium->setTrainers($requestData['trainers']);
        }

        if (isset($requestData['thingsToDo'])) 
        {
            $thingsData = json_decode($requestData["thingsToDo"], true);
    
            if (isset($thingsData['thingsToDo'])) 
            {
                $oldThings = $gymnasium->getThingsToDo();
                foreach($oldThings as $deletableThings)
                    $gymnasium->removeThingsToDo($deletableThings);
                
                 $thingsIris = $thingsData["thingsToDo"];
                foreach ($thingsIris as $thingsIri) 
                {   
                    $things = $iriConverter->getResourceFromIri($thingsIri);
                    $gymnasium->addThingsToDo($things);
                }
            }  
        }

        if(isset($requestData['description']))
        {
             $gymnasium->setDescription(($requestData['description']));
        }
        
        if(isset($requestData['placeToStay']))
        {
            $gymnasium->setPlaceToStay($requestData['placeToStay']);
        }

        if(isset($requestData['policy']))
        {
            $gymnasium->setPolicy($requestData['policy']);
        } 

        if(isset($requestData['website']))
        {
            $gymnasium->setWebsite($requestData['website']);
        }

        if(isset($requestData['contacts']))
        {
            $gymnasium->setContacts($requestData['contacts']);
        }
        
        if(isset($requestData['openHours']))
        {   
            $openHoursString = $requestData['openHours'];
            $openHours = new DateTime($openHoursString);
            $gymnasium->setOpenHours($openHours);
        }
        if(isset($requestData['closeHours']))
        {
            $closeHoursString =$requestData['closeHours'];
            $closeHours= new DateTime($closeHoursString);
            $gymnasium->setcloseHours($closeHours);
        }
              
        if ($request->files->get('file')) 
        {
            $uploadedFile = $request->files->get('file');

            if ($gymnasium->getPictures()->first())
            {
                $oldPicture = $gymnasium->getPictures()->first();
                $gymnasium->removePicture($oldPicture);
            }
            
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $entityManager->persist($picture);
            $gymnasium->addPicture($picture);
        }

        return $gymnasium;
    }

}
?>