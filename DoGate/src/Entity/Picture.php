<?php

namespace App\Entity;

use App\Entity\ImageEntity;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\PictureController;
use App\Repository\PictureRepository;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post as MetadataPost;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: PictureRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Put(),
        new Patch(),
        new Delete(),
        new MetadataPost(
            controller: PictureController::class,
            deserialize: false,
        )
    ]
)]

#[Vich\Uploadable]
class Picture extends ImageEntity
{
    #[vich\UploadableField(mapping: 'picture_uri', fileNameProperty: 'fileName', size: 'fileSize')]
    private ?File $file = null;

    public const MAX_IMAGE_SIZE = 204800;

    #[ORM\ManyToOne(inversedBy: 'pictures',cascade:["persist"])]
    private ?Fonctionnality $fonctionnality = null;

    #[ORM\ManyToOne(inversedBy: 'pictures')]
    private ?Menu $menu = null;

    #[ORM\ManyToOne(inversedBy: 'pictures', cascade:["persist"])]
    private ?Accomodation $accomodation = null;

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): static
    {
        $this->file = $file;

        return $this;
    }

    public function getFonctionnality(): ?Fonctionnality
    {
        return $this->fonctionnality;
    }

    public function setFonctionnality(?Fonctionnality $fonctionnality): static
    {
        $this->fonctionnality = $fonctionnality;

        return $this;
    }

    public function getMenu(): ?Menu
    {
        return $this->menu;
    }

    public function setMenu(?Menu $menu): static
    {
        $this->menu = $menu;

        return $this;
    }

    public function getAccomodation(): ?Accomodation
    {
        return $this->accomodation;
    }

    public function setAccomodation(?Accomodation $accomodation): static
    {
        $this->accomodation = $accomodation;

        return $this;
    }


}