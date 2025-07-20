<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ChaletRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\ChaletPutController;
use App\Controller\ChaletPostController;
use ApiPlatform\Metadata\Post as MetaDataPost;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ChaletRepository::class)]
#[ApiResource
(
    operations:
        [
            new Get(),
            new GetCollection(),
            new Put(),
            new Delete(),
            new MetaDataPost(
                uriTemplate: '/chalets/{id}',
                controller: ChaletPutController::class,
                deserialize: false,
            ),
            new MetaDataPost(
                controller : ChaletPostController::class,
                deserialize: false,
            ),
        ],
        normalizationContext: 
        [
            "groups" => "chalet_read"
        ]
)]
#[ApiResource(
    uriTemplate:'/hotels/{hotelId}/chalets',
    uriVariables:[
        'hotelId' => new Link(fromClass: Hotel::class, toProperty: 'hotel'),
    ],
    operations:
    [
        new GetCollection()
    ]
)]
class Chalet extends Accomodation
{

    #[ORM\Column]
    #[Groups(['chalet_read'])]
    private ?int $numberOfRooms = null;

    #[ORM\Column]
    #[Groups(['chalet_read'])]
    private ?int $numberOfBathrooms = null;

    #[ORM\Column]
    #[Groups(['chalet_read'])]
    private ?bool $garden = null;

    #[ORM\Column]
    #[Groups(['chalet_read'])]
    private ?bool $terrace = null;

    public function getNumberOfRooms(): ?int
    {
        return $this->numberOfRooms;
    }

    public function setNumberOfRooms(int $numberOfRooms): static
    {
        $this->numberOfRooms = $numberOfRooms;

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

    public function isGarden(): ?bool
    {
        return $this->garden;
    }

    public function setGarden(bool $garden): static
    {
        $this->garden = $garden;

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

}
