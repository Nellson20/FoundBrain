<?php

namespace App\Entity;

use App\Entity\Image;
use App\Entity\ImageEntity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Dotenv\Dotenv;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ThumbnailRepository;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;


#[ORM\Entity(repositoryClass: ThumbnailRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    normalizationContext:[
        'groups'=>['image_read'],
    ],
)]
#[vich\Uploadable]
class Thumbnail extends ImageEntity
{
    #[Vich\UploadableField(mapping: 'post_thumbnail', fileNameProperty: 'fileName', size: 'fileSize')]
    private ?File $file = null;

    #[ORM\ManyToOne(inversedBy: 'thumbnails', cascade: ["persist"])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Post $post = null;

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): static
    {
        $this->file = $file;

        return $this;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): static
    {
        $this->post = $post;

        return $this;
    }

}
