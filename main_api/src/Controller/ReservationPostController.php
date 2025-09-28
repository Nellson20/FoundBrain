<?php

namespace App\Controller;
use DateTimeImmutable;
use App\Entity\Capacity;
use App\Entity\Reservation;
use ApiPlatform\Api\IriConverterInterface;
use DateTime;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

    class ReservationPostController extends AbstractController
    {
        public function __invoke(Request $request, IriConverterInterface $iriConverter): Reservation
        {
            $requestData = $request->request->all();
            $reservation = new Reservation();
            $now = new DateTime();
            $now->setTime(0, 0, 0);
            $start = new DateTimeImmutable($requestData['start']);
            $end = new DateTimeImmutable($requestData['end']);

            //Gestion d'erreurs
            if ($start >= $end) {
                throw new HttpException(422, "Erreur: La date de début doit être strictement antérieure à la date de fin.");
            }

            if ($start < $now)
            {
                throw new HttpException(422, "Erreur: Vous ne pouvez pas résever dans une date passée.");
            }

            $numberOfDay =  $end->diff($start)->days;
            $reservation->setStart($start);
            $reservation->setEnd($end);
            $room = $iriConverter->getResourceFromIri($requestData['room']);
            
            foreach ($room->getReservations() as $existingReservation) 
            {
                $existingStart = $existingReservation->getStart();
                $existingEnd = $existingReservation->getEnd();
            
                if (($start >= $existingStart && $start <= $existingEnd) || 
                    ($end >= $existingStart && $end <= $existingEnd) ||
                    ($start <= $existingStart && $end >= $existingEnd)) {
                        throw new HttpException(422, "Erreur: Cette chambre a déjà été réservée pendant la période demandée.");
                }
            }
            
            $decodeCapacity = json_decode($requestData["capacity"], true);
            $nbrOfAdultMax = $decodeCapacity["nbrOfAdultMax"];
            $nbrOfChildMax = isset($decodeCapacity["nbrOfChildMax"]) ? $decodeCapacity["nbrOfChildMax"] : 0;
            $capacity = new Capacity($nbrOfAdultMax, $nbrOfChildMax);
            $capacityTotal = $capacity->getCapacityTotal();

            $roomTotalCapacity = $room->getCapacityTotal();

            if ($capacityTotal > $roomTotalCapacity)
                throw new HttpException(422, "Erreur: Le nombre de personnes dépasse la capacité de la salle
                ");
            else{
                $reservation->setPriceTotal($room->getPricePerNight()->getValue() * $capacityTotal * $numberOfDay);
                $reservation->setCapacity($capacity);
                $reservation->setAccomodation($room);
    
                return $reservation;
            }

    }
}
