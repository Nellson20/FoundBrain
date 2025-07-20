<?php

namespace App\Entity;

use App\Controller\CoverImageController;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;

use ApiPlatform\Metadata\Patch;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\CoverImageRepository;
use ApiPlatform\Metadata\Post as MetadataPost;
use Symfony\Component\HttpFoundation\File\File;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: CoverImageRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Put(),
        new Patch(),
        new MetadataPost(
            controller: CoverImageController::class,
            deserialize: false,
            security: "is_granted('COMPANY_EDIT',request)"
        )
    ]
)]
#[vich\Uploadable]
class CoverImage extends ImageEntity
{
    #[Vich\UploadableField(mapping: 'cover_img_upload', fileNameProperty: 'fileName',size: 'fileSize')]
    private ?File $file = null;

    #[ORM\ManyToOne(inversedBy: 'coverImages')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Author $author = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $extUrl = null;

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): static
    {
        $this->file = $file;

        return $this;
    }

    public function getAuthor(): ?Author
    {
        return $this->author;
    }

    public function setAuthor(?Author $author): static
    {
        $this->author = $author;

        return $this;
    }

    public function getExtUrl(): ?string
    {
        return $this->extUrl;
    }

    public function setExtUrl(?string $extUrl): static
    {
        $this->extUrl = $extUrl;

        return $this;
    }

    
}
