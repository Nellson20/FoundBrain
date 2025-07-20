<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\VideoRepository;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: VideoRepository::class)]
#[Vich\Uploadable]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name:"discriminator", type: "string")]
#[ORM\DiscriminatorMap([
    'video' => Video::class,
    'artistVideo' => ArtistVideo::class,
])]
abstract class Video
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private ?string $id = null;

    public const MAX_SIZE_VIDEO = 104857600;

    #[ORM\Column(length: 255)]
    private ?string $fileName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fileUrl = null;

    #[ORM\Column(length: 255)]
    private ?string $fileSize = null;

    #[vich\UploadableField(mapping: 'artist_video', fileNameProperty: 'fileName', size: 'fileSize')]
    private ?File $file = null;

    #[ORM\PreFlush]
    public function generateFileUrl(): ?string
    {
        if ($this->getFileName()) {
            $siteDomain = $_ENV['SITE_DOMAIN'] ?? null;
            if ($siteDomain) {
                $this->setFileUrl($siteDomain . '/upload/video/artistVideo/' . $this->getFileName());
            }
        }
        return null;
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getFileName(): ?string
    {
        return $this->fileName;
    }

    public function setFileName(?string $fileName): static
    {
        $this->fileName = $fileName;

        return $this;
    }

    public function getFileUrl(): ?string
    {
        return $this->fileUrl;
    }

    public function setFileUrl(?string $fileUrl): static
    {
        $this->fileUrl = $fileUrl;

        return $this;
    }

    public function getFileSize(): ?string
    {
        return $this->fileSize;
    }

    public function setFileSize(?string $fileSize): static
    {
        $this->fileSize = $fileSize;

        return $this;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): static
    {
        $this->file = $file;

        return $this;
    }
}
