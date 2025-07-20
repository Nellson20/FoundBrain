<?php

namespace App\Controller;
use App\Entity\Gymnasium;
use App\Entity\Picture;
use App\Entity\Position;
use DateTimeImmutable;
use Symfony\Component\HttpKernel\Exception\HttpException;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GymnasiumPostController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter): Gymnasium
    {   
        $requestData= $request->request->all();
        $position =null;

        $gymnasium = new Gymnasium();

        $gymnasium->setSportEquipments($requestData['sportEquipments']);
        $gymnasium->setTrainingPrograms($requestData['trainingPrograms']);
        $gymnasium->setTrainers($requestData['trainers']);

        $thingsToDoData = json_decode($requestData["thingsToDo"], true);
        $thingsToDoIris = $thingsToDoData["thingsToDo"];
        foreach ($thingsToDoIris as $thingsToDoIri) {
            $thingsToDo = $iriConverter->getResourceFromIri($thingsToDoIri);
            $gymnasium->addThingsToDo($thingsToDo);
        } 


        $decodedPosition = json_decode($requestData['position'], true);
        $position = new Position();
        $position->setLat($decodedPosition["lat"]);
        $position->setLng($decodedPosition['lng']);
        $gymnasium->setPosition($position);


        if ($request->files->get('file')) {
            $uploadedFiles = $request->files->get('file');
        
            foreach ($uploadedFiles as $uploadedFile) {
                $picture = new Picture();
                $picture->setFile($uploadedFile);
                $picture->setFolder('pictures');
                $gymnasium->addPicture($picture);
            }
        }
        
        $gymnasium->setDescription($requestData['description']);
     
        $gymnasium->setPlaceToStay($requestData['placeToStay']);

        $gymnasium->setPolicy($requestData['policy']);

        $gymnasium->setWebsite($requestData['website']);


        $openHours = new DateTimeImmutable($requestData['openHours']);
        $closeHours = new DateTimeImmutable($requestData['closeHours']);

        if($openHours >= $closeHours)
        {
            throw new HttpException(422,"Error: The open Hours must be strictly before the close Hours.");
        }

        $gymnasium->setOpenHours($openHours);
        $gymnasium->setCloseHours($closeHours);

        $gymnasium->setCompany($iriConverter->getResourceFromIri($requestData['company']));
        $gymnasium->setCity($iriConverter->getResourceFromIri($requestData['city']));

        return $gymnasium;

    }
}
?>