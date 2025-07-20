<?php

namespace App\Entity;
use App\Entity\Attraction;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ParkRepository;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\ParkPostController;
use App\Controller\ParkPutController;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post as MetaDataPost;


#[ORM\Entity(repositoryClass: ParkRepository::class)]
#[ApiResource
(
    operations:
        [
            new GetCollection(),
            new Get(),
            new MetaDataPost(
                controller: ParkPostController::class,
                deserialize: false,
            ),
            new MetaDataPost(
                uriTemplate: '/parks/{id}',
                controller: ParkPutController::class,
                deserialize: false,
            ),
            new Patch(),
            new Put(),
            new Delete(),
        ]
)]
class Park extends Attraction
{
    #[ORM\Column]
    private ?int $qtRide = null;

    public function getQtRide(): ?int
    {
        return $this->qtRide;
    }

    public function setQtRide(int $qtRide): static
    {
        $this->qtRide = $qtRide;

        return $this;
    }
}