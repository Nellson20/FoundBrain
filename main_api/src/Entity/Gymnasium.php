<?php

namespace App\Entity;

use App\Repository\GymnasiumRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post as MetadataPost;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\GymnasiumPutController;
use App\Controller\GymnasiumPostController;

#[ORM\Entity(repositoryClass: GymnasiumRepository::class)]
#[ApiResource
(
    operations:
    [
        new Get(),
        new GetCollection(),
        new Put(),
        new Delete(),
        new MetadataPost(
                controller: GymnasiumPostController::class,
                deserialize:false,
        ),
        new MetadataPost(       
                uriTemplate: '/gymnasia/{id}',
                controller: GymnasiumPutController::class,
                deserialize:false,
        )
    ]
)
]
class Gymnasium extends Attraction
{
    
    #[ORM\Column(length: 255)]
    private ?string $sportEquipments = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $trainingPrograms = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $trainers = null;
    
    public function getSportEquipments(): ?string
    {
        return $this->sportEquipments;
    }

    public function setSportEquipments(string $sportEquipments): static
    {
        $this->sportEquipments = $sportEquipments;

        return $this;
    }
    public function getTrainingPrograms(): ?string
    {
        return $this->trainingPrograms;
    }

    public function setTrainingPrograms(?string $trainingPrograms): static
    {
        $this->trainingPrograms = $trainingPrograms;

        return $this;
    }

    public function getTrainers(): ?string
    {
        return $this->trainers;
    }

    public function setTrainers(?string $trainers): static
    {
        $this->trainers = $trainers;

        return $this;
    }
}
