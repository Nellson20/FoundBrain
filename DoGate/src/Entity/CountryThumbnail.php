<?php

namespace App\Entity;

use App\Entity\ImageEntity;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Dotenv\Dotenv;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post as MetadataPost;
use App\Controller\CountryThumbnailController;
use App\Repository\CountryThumbnailRepository;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: CountryThumbnailRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    normalizationContext:[
        'groups'=>['country_read'],
    ],
    operations: [
        new Get(),
        new GetCollection(),
        new Put(),
        new Patch(),
        new MetadataPost(
            controller: CountryThumbnailController::class,
            deserialize: false,
        )
    ]
)]

#[vich\Uploadable]
class CountryThumbnail extends ImageEntity
{

    #[Vich\UploadableField(mapping: 'country_thumbnail', fileNameProperty: 'fileName', size: 'fileSize')]
    private ?File $file = null;

    #[ORM\ManyToOne(inversedBy: 'countryThumbnails')]
    private ?Pays $country = null;

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): static
    {
        $this->file = $file;

        return $this;
    }

    public function getCountry(): ?Pays
    {
        return $this->country;
    }

    public function setCountry(?Pays $country): static
    {
        $this->country = $country;

        return $this;
    }
}
