<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\BungalowRepository;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\BungalowPutController;
use App\Controller\BungalowPostController;
use ApiPlatform\Metadata\Post as MetaDataPost;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BungalowRepository::class)]
#[ApiResource
(
    operations:
        [
            new Get(),
            new GetCollection(),
            new Put(),
            new Delete(),
            new MetaDataPost(
                uriTemplate: '/bungalows/{id}',
                controller: BungalowPutController::class,
                deserialize: false,
            ),
            new MetaDataPost(
                controller : BungalowPostController::class,
                deserialize: false,
            ),
        ],
    normalizationContext: 
    [
        "groups" => "bungalow_read",
    ]
)]
#[ApiResource(
    uriTemplate:'/hotels/{hotelId}/bungalows',
    uriVariables:[
        'hotelId' => new Link(fromClass: Hotel::class, toProperty: 'hotel'),
    ],
    operations:
    [
        new GetCollection()
    ]
)]

class Bungalow extends Accomodation
{
    #[ORM\Column]
    #[Groups(['bungalow_read'])]
    private ?bool $garden = null;

    #[ORM\Column]
    #[Groups(['bungalow_read'])]
    private ?bool $terrace = null;

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
