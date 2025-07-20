<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\PenthouseRepository;
use App\Controller\PenthousePutController;
use App\Controller\PenthousePostController;
use ApiPlatform\Metadata\Post as MetaDataPost; 
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PenthouseRepository::class)]
#[ApiResource
(
    operations:
        [
            new Get(),
            new GetCollection(),
            new Put(),
            new Delete(),
            new MetaDataPost(
                uriTemplate: '/penthouses/{id}',
                controller: PenthousePutController::class,
                deserialize: false,
            ),
            new MetaDataPost(
                controller : PenthousePostController::class,
                deserialize: false,
            ),
        ],
        normalizationContext:
        [
            "groups" => "penthouse_read",
        ]
)]
#[ApiResource(
    uriTemplate:'/hotels/{hotelId}/penthouses',
    uriVariables:[
        'hotelId' => new Link(fromClass: Hotel::class, toProperty: 'hotel'),
    ],
    operations:
    [
        new GetCollection()
    ]
)]
class Penthouse extends Accomodation
{
    #[ORM\Column]
    #[Groups(['penthouse_read'])]
    private ?int $numberOfRooms = null;


    public function getNumberOfRooms(): ?int
    {
        return $this->numberOfRooms;
    }

    public function setNumberOfRooms(int $numberOfRooms): static
    {
        $this->numberOfRooms = $numberOfRooms;

        return $this;
    }
}
