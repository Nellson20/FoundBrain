<?php

namespace App\Controller;
use App\Entity\Park;
use App\Entity\Picture;
use App\Entity\Position;
use ApiPlatform\Api\IriConverterInterface;
use DateTimeImmutable;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ParkPostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter) : Park
    {
        $requestData = $request->request->all();

        $park = new Park();
        $park->setQtRide($requestData['qtRide']);

        $thingsToDoData = json_decode($requestData["thingsToDo"], true);
        $thingsToDoIris = $thingsToDoData["thingsToDo"];
        foreach ($thingsToDoIris as $thingsToDoIri) {
            $thingsToDo = $iriConverter->getResourceFromIri($thingsToDoIri);
            $park->addThingsToDo($thingsToDo);
        } 

        $decodedPosition = json_decode($requestData['position'], true);
        $position = new Position();
        $position->setLat($decodedPosition["lat"]);
        $position->setLng($decodedPosition['lng']);
        $park->setPosition($position);

        if ($request->files->get('file')) {
            $uploadedFiles = $request->files->get('file');
        
            foreach ($uploadedFiles as $uploadedFile) {
                $picture = new Picture();
                $picture->setFile($uploadedFile);
                $picture->setFolder('pictures');
                $park->addPicture($picture);
            }
        }


        $park->setDescription($requestData['description']);
     
        $park->setPlaceToStay($requestData['placeToStay']);

        $park->setPolicy($requestData['policy']);

        $park->setWebsite($requestData['website']);


        $openHours = new DateTimeImmutable($requestData['openHours']);
        $closeHours = new DateTimeImmutable($requestData['closeHours']);

        if($openHours >= $closeHours)
        {
            throw new HttpException(422,"Error: The open Hours must be strictly before the close Hours.");
        }

        $park->setOpenHours($openHours);
        $park->setCloseHours($closeHours);
        
        $park->setCompany($iriConverter->getResourceFromIri($requestData['company']));
        $park->setCity($iriConverter->getResourceFromIri($requestData['city']));

        return $park;
    }
}