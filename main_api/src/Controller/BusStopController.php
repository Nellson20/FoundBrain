<?php

namespace App\Controller;

use App\Entity\BusStop;
use App\Entity\Position;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BusStopController extends AbstractController
{
    public function __invoke(Request $request, IriConverterInterface $irirconverter): BusStop
    {
        $requestData = $request->request->all();
        $busStop = new BusStop();

        //name
        $busStop->setName($requestData['name']);

        //Street
        $busStop->setStreet($irirconverter->getResourceFromIri($requestData['street']));
        
        //Position
        $decodedPosition = json_decode($requestData['position'], true);
        if ($decodedPosition !== null && isset($decodedPosition['lat']) && isset($decodedPosition['lng'])) {
            $position = new Position();
            $position->setLat($decodedPosition['lat']);
            $position->setLng($decodedPosition['lng']);
            $busStop->setPosition($position);
        }

        return $busStop;
    }
}