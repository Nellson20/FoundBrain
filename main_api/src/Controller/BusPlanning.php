<?php

namespace App\Controller;

use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[AsController]
class BusPlanning extends AbstractController
{
    #[Route('/bus_planning', name: 'bus_planning', methods: ['POST'])]
    public function busPlanning(Request $request, IriConverterInterface $iriConverter): Response
    {
        $requestData = json_decode($request->getContent(), true);

        $startStreet = $iriConverter->getResourceFromIri($requestData['start_street']);
        $startBusStops = $startStreet->getBusStops();

        // Récupérer le quartier de destination
        $endStreet = $iriConverter->getResourceFromIri($requestData['end_street']);
        $endBusStops = $endStreet->getBusStops();

        // Vous pouvez maintenant faire quelque chose avec les arrêts de bus récupérés, comme calculer l'itinéraire,
        // afficher les options de trajet à l'utilisateur, etc.

        // Exemple de réponse
        $response = [
            'start_street' => $requestData['start_street'],
            'end_street' => $requestData['end_street'],
            'start_bus_stops' => $startBusStops,
            'end_bus_stops' => $endBusStops
        ];

        return $this->json($response);
    }

}


