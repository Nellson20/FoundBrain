<?php

namespace App\Controller;
use App\Entity\Monument;
use App\Entity\Picture;
use App\Entity\Position;
use ApiPlatform\Api\IriConverterInterface;
use ApiPlatform\Symfony\Routing\IriConverter;
use DateTimeImmutable;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\HttpException;

class MonumentPostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter): Monument
    {
        $requestData = $request->request->all();
        $monument = new Monument();
        $constructionYear = new DateTimeImmutable($requestData['constructionYear']);
        $monument->setConstructionYear($constructionYear);

        if ($request->files->get('file'))
        {
            $uploadedFile = $request->files->get('file');
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
        }

        $monument = new Monument();
        $monument->setHeight($requestData['height']);
        $monument->setArchitects($requestData['architects']);
        $monument->setBuildingMaterials($requestData['buildingMaterials']);
        $monument->setRelatedStory($requestData['relatedStory']);
        $monument->setConservationStatus($requestData['conservationStatus']);
        $monument->setVisitDescription($requestData['visitDescription']);

        $thingsToDoData = json_decode($requestData["thingsToDo"], true);
        $thingsToDoIris = $thingsToDoData["thingsToDo"];
        foreach ($thingsToDoIris as $thingsToDoIri) {
            $thingsToDo = $iriConverter->getResourceFromIri($thingsToDoIri);
            $monument->addThingsToDo($thingsToDo);
        } 

        $position = null;
        $decodedPosition = json_decode($requestData['position'], true);
        $position = new Position();
        $position->setLat($decodedPosition["lat"]);
        $position->setLng($decodedPosition['lng']);
        $monument->setPosition($position);

        if ($request->files->get('file')) {
            $uploadedFiles = $request->files->get('file');
        
            foreach ($uploadedFiles as $uploadedFile) {
                $picture = new Picture();
                $picture->setFile($uploadedFile);
                $picture->setFolder('pictures');
                $monument->addPicture($picture);
            }
        }
    
        $monument->setDescription($requestData['description']);
     
        $monument->setPlaceToStay($requestData['placeToStay']);

        $monument->setPolicy($requestData['policy']);

        $monument->setWebsite($requestData['website']);



        $openHours = new DateTimeImmutable($requestData['openHours']);
        $closeHours = new DateTimeImmutable($requestData['closeHours']);

        if($openHours >= $closeHours)
        {
            throw new HttpException(422,"Error: The open Hours must be strictly before the close Hours.");
        }

        $monument->setOpenHours($openHours);
        $monument->setCloseHours($closeHours);
        
        $monument->setCompany($iriConverter->getResourceFromIri($requestData['company']));
        $monument->setCity($iriConverter->getResourceFromIri($requestData['city']));

        return $monument;
    }

}