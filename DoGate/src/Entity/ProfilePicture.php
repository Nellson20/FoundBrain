<?php

namespace App\Entity;

use App\Entity\Image;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;

use ApiPlatform\Metadata\Patch;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use Symfony\Component\Dotenv\Dotenv;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ProfilePictureRepository;
use ApiPlatform\Metadata\Post as MetadataPost;
use Symfony\Component\HttpFoundation\File\File;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use App\Controller\ProfilePictureUploadController;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ProfilePictureRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    normalizationContext: [
        'groups' => ['profile_pic_read']
    ],
    operations: [
        new Get(),
        new GetCollection(),
        new Put(),
        new Patch(),
        new MetadataPost(
            controller: ProfilePictureUploadController::class,
            deserialize: false,
        )
    ]
)]
#[vich\Uploadable]
class ProfilePicture extends ImageEntity
{


    #[Vich\UploadableField(mapping: 'profile_picture_upload', fileNameProperty: 'fileName',size: 'fileSize')]
    #[Assert\File]
    #[Assert\NotNull]
    private ?File $file = null;

    #[ORM\Column]
    #[Groups(['users_read','posts_read'])]
    private ?bool $active = true;

    #[ORM\ManyToOne(inversedBy: 'profilePictures')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;


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

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

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
