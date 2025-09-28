<?php

namespace App\Controller;

use App\Entity\Museum;
use App\Entity\Picture;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MuseumPutController extends AbstractController
{
    public function __invoke(Request $request, Museum $museum, EntityManagerInterface $entityManager,IriConverterInterface $iriConverter): Museum
    {
        if (!$museum)
        {
            throw new HttpException(422,"Museum not found");
        } 
        $requestData=$request->request->all();

        if(isset($requestData['nameArt']))
        {
             $museum->setNameArt($requestData['nameArt']);
        }
        if(isset($requestData['historicDoc']))
        {
             $museum->setHistoricDoc($requestData['historicDoc']);
        }

        if(isset($requestData['policy']))
        {
            $museum->setPolicy($requestData['policy']);
        }

        if (isset($requestData['thingsToDo'])) 
        {
            $thingsData = json_decode($requestData["thingsToDo"], true);
    
            if (isset($thingsData['thingsToDo'])) 
            {
                $oldThings = $museum->getThingsToDo();
                foreach($oldThings as $deletableThings)
                    $museum->removeThingsToDo($deletableThings);
                
                 $thingsIris = $thingsData["thingsToDo"];
                foreach ($thingsIris as $thingsIri) 
                {   
                    $things = $iriConverter->getResourceFromIri($thingsIri);
                    $museum->addThingsToDo($things);
                }
            }
        }

        if(isset($requestData['description']))
        {
             $museum->setDescription(($requestData['description']));
        }
        
        if(isset($requestData['website']))
        {
            $museum->setWebsite($requestData['website']);
        }

        if(isset($requestData['contacts']))
        {
            $museum->setContacts($requestData['contacts']);
        }

        if(isset($requestData['placeToStay']))
        {
            $museum->setPlaceToStay($requestData['placeToStay']);
        }
        if(isset($requestData['openHours']))
        {
            $museum->setOpenHours($requestData['openHours']);
        }
        if(isset($requestData['closeHours']))
        {
            $museum->setCloseHours($requestData['closeHours']);
        }

        if ($request->files->get('file')) 
        {
            $uploadedFile = $request->files->get('file');

            if ($museum->getPictures()->first())
            {
                $oldPicture = $museum->getPictures()->first();
                $museum->removePicture($oldPicture);
            }
            
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
            $entityManager->persist($picture);
            $museum->addPicture($picture);
        }

        return $museum;
    }

}