<?php

namespace App\Controller;

use App\Entity\Monument;
use DateTime;
use App\Entity\Picture;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MonumentPutController extends AbstractController
{
    public function __invoke (Request $request, Monument $monument , IriConverterInterface $iriConverter, EntityManagerInterface $entityManager): Monument
    {
        $requestData = $request->request->all();

        if(isset($requestData['constructionYear']))
        {
            $monument->setConstructionYear($requestData['constructionYear']);
        }
        if(isset($requestData['height']))
        {
            $monument->setHeight($requestData['height']);
        }
        if(isset($requestData['architects']))
        {
            $monument->setArchitects($requestData['architects']);
        }
        if(isset($requestData['relatedStory']))
        {
            $monument->setRelatedStory($requestData['relatedStory']);
        }
        if(isset($requestData['conservationStatus']))
        {
            $monument->setConservationStatus($requestData['conservationStatus']);
        }
        if(isset($requestData['visitDescription']))
        {
            $monument->setVisitDescription($requestData['visitDescription']);
        }

        if (isset($requestData['thingsToDo'])) 
        {
            $thingsData = json_decode($requestData["thingsToDo"], true);
    
            if (isset($thingsData['thingsToDo'])) 
            {
                $oldThings = $monument->getThingsToDo();
                foreach($oldThings as $deletableThings)
                    $monument->removeThingsToDo($deletableThings);
                
                 $thingsIris = $thingsData["thingsToDo"];
                foreach ($thingsIris as $thingsIri) 
                {   
                    $things = $iriConverter->getResourceFromIri($thingsIri);
                    $monument->addThingsToDo($things);
                }
            }  
        }
        if(isset($requestData['description']))
        {
             $monument->setDescription(($requestData['description']));
        }
        
        if(isset($requestData['placeToStay']))
        {
            $monument->setPlaceToStay($requestData['placeToStay']);
        }

        if(isset($requestData['policy']))
        {
            $monument->setPolicy($requestData['policy']);
        } 

        if(isset($requestData['website']))
        {
            $monument->setWebsite($requestData['website']);
        }

        if(isset($requestData['contacts']))
        {
            $monument->setContacts($requestData['contacts']);
        }
        
        if(isset($requestData['openHours']))
        {   
            $openHoursString = $requestData['openHours'];
            $openHours = new DateTime($openHoursString);
            $monument->setOpenHours($openHours);
        }
        if(isset($requestData['closeHours']))
        {
            $closeHoursString =$requestData['closeHours'];
            $closeHours= new DateTime($closeHoursString);
            $monument->setcloseHours($closeHours);
        }
              
        if ($request->files->get('file')) 
        {
            $uploadedFile = $request->files->get('file');

            if ($monument->getPictures()->first())
            {
                $oldPicture = $monument->getPictures()->first();
                $monument->removePicture($oldPicture);
            }
            
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $entityManager->persist($picture);
            $monument->addPicture($picture);
        }

        return $monument;
    }
}
?>