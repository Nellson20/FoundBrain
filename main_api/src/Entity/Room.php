<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\RoomRepository;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\RoomPutController;
use App\Controller\RoomPostController;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post as MetaDataPost;

#[ORM\Entity(repositoryClass: RoomRepository::class)]
#[ApiResource
(
    operations:
    [
        new GetCollection(),
        new Get(),
        new Put(),
        new Delete(),
        new MetaDataPost(
            uriTemplate: '/rooms/{id}',
            controller: RoomPutController::class,
            deserialize: false,
        ),
        new MetaDataPost(
            controller : RoomPostController::class,
            deserialize: false,
        ),
    ],
    normalizationContext:
    [
        'groups' => ["room_read"]
    ]
)]
#[ApiResource(
    uriTemplate:'/hotels/{hotelId}/rooms',
    uriVariables:[
        'hotelId' => new Link(fromClass: Hotel::class, toProperty: 'hotel'),
    ],
    operations:
    [
        new GetCollection()
    ]
)]
class Room extends Accomodation
{
    #[ORM\Column]
    private ?int $floor = null;

    public function getFloor(): ?int
    {
        return $this->floor;
    }

    public function setFloor(int $floor): static
    {
        $this->floor = $floor;

        return $this;
    }
}