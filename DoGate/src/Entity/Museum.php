<?php

namespace App\Entity;

use App\Repository\MuseumRepository;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post as MetaDataPost;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use App\Controller\MuseumPostController;
use App\Controller\MuseumPutController;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity(repositoryClass: MuseumRepository::class)]
#[ApiResource
    (
        operations:
            [
                new GetCollection(),
                new Get(),
                new MetaDataPost(
                    controller : MuseumPostController::class,
                    deserialize:false,
                ),
                new MetaDataPost(
                    uriTemplate: '/museum/{id}',
                    controller: MuseumPutController::class,
                    deserialize: false,
                ),
                new Put(),
                new Patch(),
                new Delete(),

            ]
    )
]
class Museum extends Attraction
{
    

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "This field must not be empty")]
    private ?string $nameArt = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $historicDoc = null;


    public function getNameArt(): ?string
    {
        return $this->nameArt;
    }

    public function setNameArt(string $nameArt): static
    {
        $this->nameArt = $nameArt;

        return $this;
    }

    public function getHistoricDoc(): ?string
    {
        return $this->historicDoc;
    }

    public function setHistoricDoc(?string $historicDoc): static
    {
        $this->historicDoc = $historicDoc;

        return $this;
    }
}
