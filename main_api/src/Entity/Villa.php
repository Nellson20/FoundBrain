<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\VillaRepository;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\VillaPutController;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\VillaPostController;
use ApiPlatform\Metadata\Post as MetaDataPost;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: VillaRepository::class)]
#[ApiResource
(
    operations:
        [
            new Get(),
            new GetCollection(),
            new Put(),
            new Delete(),
            new MetaDataPost(
                uriTemplate: '/villas/{id}',
                controller: VillaPutController::class,
                deserialize: false,
            ),
            new MetaDataPost(
                controller : VillaPostController::class,
                deserialize: false,
            ),
        ],
        normalizationContext:
        [
            "groups" => "villa_read"
        ]
)]
#[ApiResource(
    uriTemplate:'/hotels/{hotelId}/villas',
    uriVariables:[
        'hotelId' => new Link(fromClass: Hotel::class, toProperty: 'hotel'),
    ],
    operations:
    [
        new GetCollection()
    ]
)]
class Villa extends Accomodation
{

    #[ORM\Column]
    #[Groups(['villa_read'])]
    private ?int $numberOfRooms = null;

    #[ORM\Column]
    #[Groups(['villa_read'])]
    private ?bool $garden = null;

    #[ORM\Column]
    #[Groups(['villa_read'])]
    private ?bool $pool = null;

    #[ORM\Column]
    #[Groups(['villa_read'])]
    private ?bool $terrace = null;

    #[ORM\Column]
    private ?int $numberOfBathrooms = null;

    public function getNumberOfRooms(): ?int
    {
        return $this->numberOfRooms;
    }

    public function setNumberOfRooms(int $numberOfRooms): static
    {
        $this->numberOfRooms = $numberOfRooms;

        return $this;
    }

    public function isGarden(): ?bool
    {
        return $this->garden;
    }

    public function setGarden(bool $garden): static
    {
        $this->garden = $garden;

        return $this;
    }

    public function isPool(): ?bool
    {
        return $this->pool;
    }

    public function setPool(bool $pool): static
    {
        $this->pool = $pool;

        return $this;
    }

    public function isTerrace(): ?bool
    {
        return $this->terrace;
    }

    public function setTerrace(bool $terrace): static
    {
        $this->terrace = $terrace;

        return $this;
    }

    public function getNumberOfBathrooms(): ?int
    {
        return $this->numberOfBathrooms;
    }

    public function setNumberOfBathrooms(int $numberOfBathrooms): static
    {
        $this->numberOfBathrooms = $numberOfBathrooms;

        return $this;
    }
}
