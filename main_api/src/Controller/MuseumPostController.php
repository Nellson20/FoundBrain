<?php

namespace App\Controller;

use App\Entity\Museum;
use App\Entity\Picture;
use DateTime;
use App\Entity\Position;
use ApiPlatform\Api\IriConverterInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MuseumPostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter):Museum
        {
            $requestData = $request->request->all();

            if ($request->files->get('file')) {
                $uploadedFile = $request->files->get('file');
                $picture = new Picture();
                $picture->setFile($uploadedFile);
                $picture->setFolder('pictures');
            }

            $museum = new Museum();
            $museum->setNameArt($requestData['nameArt']);
            $museum->setHistoricDoc($requestData['historicDoc']);

            
            $thingsToDoData = json_decode($requestData["thingsToDo"], true);
            $thingsToDoIris = $thingsToDoData["thingsToDo"];
            foreach ($thingsToDoIris as $thingsToDoIri) {
                $thingsToDo = $iriConverter->getResourceFromIri($thingsToDoIri);
                $museum->addThingsToDo($thingsToDo);
            }

            
            $decodedPosition = json_decode($requestData['position'], true);
            $position = new Position();
            $position->setLat($decodedPosition["lat"]);
            $position->setLng($decodedPosition['lng']);
            $museum->setPosition($position);

            
            if ($request->files->get('file')) {
                $uploadedFiles = $request->files->get('file');
            
                foreach ($uploadedFiles as $uploadedFile) {
                    $picture = new Picture();
                    $picture->setFile($uploadedFile);
                    $picture->setFolder('pictures');
                    $museum->addPicture($picture);
                }
            }
            
            $museum->setDescription($requestData['description']);
            $museum->setPlaceToStay($requestData['placeToStay']);
            $museum->setPolicy($requestData['policy']);
            $museum->setWebsite($requestData['website']);

            $openHours = new DateTime($requestData['openHours']);
            $closeHours = new DateTime($requestData['closeHours']);
            
            if($openHours >= $closeHours)
        {
            throw new HttpException(422,"Error: The open Hours must be strictly before the close Hours.");
        }
            
            $museum->setOpenHours($openHours);
            $museum->setCloseHours($closeHours);
 
            $museum->setCompany($iriConverter->getResourceFromIri($requestData['company']));
            $museum->setCity($iriConverter->getResourceFromIri($requestData['city']));
           
            return $museum;
        }
}
