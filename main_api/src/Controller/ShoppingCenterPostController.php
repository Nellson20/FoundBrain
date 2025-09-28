<?php

namespace App\Controller;
use App\Entity\ShoppingCenter;
use App\Entity\Picture;
use App\Entity\Position;
use ApiPlatform\Api\IriConverterInterface;
use DateTimeImmutable;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ShoppingCenterPostController extends AbstractController
{
    public function __invoke (Request $request, IriConverterInterface $iriConverter): ShoppingCenter
    {
        $requestData = $request->request->all();

        if ($request->files->get('file'))
        {
            $uploadedFile = $request->files->get('file');
            $picture = new Picture();
            $picture->setFile($uploadedFile);
            $picture->setFolder('pictures');
        }

        $shoppingCenter = new ShoppingCenter();
        $shoppingCenter->setArea($requestData['area']);
        $shoppingCenter->setFloor($requestData['floor']);

        $storeData = json_decode($requestData['stores'], true);
        $storeIris = $storeData['stores'];
        foreach($storeIris as $storeIri)
        {
            $store = $iriConverter->getResourceFromIri($storeIri);
            $shoppingCenter->addStore($store);
        }

        
        $thingsToDoData = json_decode($requestData["thingsToDo"], true);
        $thingsToDoIris = $thingsToDoData["thingsToDo"];
        foreach ($thingsToDoIris as $thingsToDoIri) {
            $thingsToDo = $iriConverter->getResourceFromIri($thingsToDoIri);
            $shoppingCenter->addThingsToDo($thingsToDo);
        } 

        $position = null;
        $decodedPosition = json_decode($requestData['position'], true);
        $position = new Position();
        $position->setLat($decodedPosition["lat"]);
        $position->setLng($decodedPosition['lng']);
        $shoppingCenter->setPosition($position);

        if ($request->files->get('file')) {
            $uploadedFiles = $request->files->get('file');
        
            foreach ($uploadedFiles as $uploadedFile) {
                $picture = new Picture();
                $picture->setFile($uploadedFile);
                $picture->setFolder('pictures');
                $shoppingCenter->addPicture($picture);
            }
        }
    
        $shoppingCenter->setDescription($requestData['description']);
     
        $shoppingCenter->setPlaceToStay($requestData['placeToStay']);

        $shoppingCenter->setPolicy($requestData['policy']);

        $shoppingCenter->setWebsite($requestData['website']);


        $openHours = new DateTimeImmutable($requestData['openHours']);
        $closeHours = new DateTimeImmutable($requestData['closeHours']);

        if($openHours >= $closeHours)
        {
            throw new HttpException(422,"Error: The open Hours must be strictly before the close Hours.");
        }

        $shoppingCenter->setOpenHours($openHours);
        $shoppingCenter->setCloseHours($closeHours);
        
        $shoppingCenter->setCompany($iriConverter->getResourceFromIri($requestData['company']));
        $shoppingCenter->setCity($iriConverter->getResourceFromIri($requestData['city']));

        
        return $shoppingCenter;
    }
}
?>