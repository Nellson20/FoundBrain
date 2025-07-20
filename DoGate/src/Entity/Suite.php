<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\SuiteRepository;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\SuitePutController;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\SuitePostController;
use ApiPlatform\Metadata\Post as MetaDataPost;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SuiteRepository::class)]
#[ApiResource
(
    operations:
        [
            new Get(),
            new GetCollection(),
            new Put(),
            new Delete(),
            new MetaDataPost(
                uriTemplate: '/suites/{id}',
                controller: SuitePutController::class,
                deserialize: false,
            ),
            new MetaDataPost(
                controller : SuitePostController::class,
                deserialize: false,
            ),
        ],
        normalizationContext:
        [
            "groups" => "suite_read"
        ]
)]
#[ApiResource(
    uriTemplate:'/hotels/{hotelId}/suites',
    uriVariables:[
        'hotelId' => new Link(fromClass: Hotel::class, toProperty: 'hotel'),
    ],
    operations:
    [
        new GetCollection()
    ]
)]
class Suite extends Accomodation
{
    #[ORM\Column]
    #[Groups(['suite_read'])]
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
