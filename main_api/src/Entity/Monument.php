<?php

namespace App\Entity;

use App\Repository\MonumentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post as MetadataPost;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\MonumentPostController;
use App\Controller\MonumentPutController;

#[ORM\Entity(repositoryClass: MonumentRepository::class)]
#[ApiResource
    (
        operations:
        [
            new Get(),
            new GetCollection(),
            new Put(),
            new Delete(),
            new MetadataPost(
                controller : MonumentPostController::class,
                deserialize: false,
            ),
            new MetadataPost(
                controller : MonumentPutController::class,
                deserialize:false,
            )
        ]
    )
]
class Monument extends Attraction
{

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $constructionYear = null;

    #[ORM\Column(nullable: true)]
    private ?int $height = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $architects = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $buildingMaterials = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $relatedStory = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $conservationStatus = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $visitDescription = null;

    public function getConstructionYear(): ?\DateTimeInterface
    {
        return $this->constructionYear;
    }

    public function setConstructionYear(?\DateTimeInterface $constructionYear): static
    {
        $this->constructionYear = $constructionYear;

        return $this;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function setHeight(?int $height): static
    {
        $this->height = $height;

        return $this;
    }

    public function getArchitects(): ?string
    {
        return $this->architects;
    }

    public function setArchitects(?string $architects): static
    {
        $this->architects = $architects;

        return $this;
    }

    public function getBuildingMaterials(): ?string
    {
        return $this->buildingMaterials;
    }

    public function setBuildingMaterials(?string $buildingMaterials): static
    {
        $this->buildingMaterials = $buildingMaterials;

        return $this;
    }

    public function getRelatedStory(): ?string
    {
        return $this->relatedStory;
    }

    public function setRelatedStory(?string $relatedStory): static
    {
        $this->relatedStory = $relatedStory;

        return $this;
    }

    public function getConservationStatus(): ?string
    {
        return $this->conservationStatus;
    }

    public function setConservationStatus(?string $conservationStatus): static
    {
        $this->conservationStatus = $conservationStatus;

        return $this;
    }

    public function getVisitDescription(): ?string
    {
        return $this->visitDescription;
    }

    public function setVisitDescription(?string $visitDescription): static
    {
        $this->visitDescription = $visitDescription;

        return $this;
    }
}
