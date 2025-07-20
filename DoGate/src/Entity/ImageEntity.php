<?php

namespace App\Entity;

use App\Entity\Image;
use App\Entity\Picture;
use App\Entity\CoverImage;
use App\Entity\CompanyLogo;
use App\Entity\InvestPicture;
use App\Entity\MessagePicture;
use App\Entity\ProfilePicture;
use App\Entity\CountryThumbnail;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use App\Repository\CommentableEntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CommentableEntityRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource()]
#[ORM\InheritanceType("JOINED")]
#[ORM\DiscriminatorColumn(name: "image_type", type: "string")]
#[ORM\DiscriminatorMap([
    "thumbnail" => Thumbnail::class,
    "profilePicture" => ProfilePicture::class,
    "investPicture" => InvestPicture::class,
    "companyLogo" => CompanyLogo::class,
    "coverImage" => CoverImage::class,
    "messagePicture" => MessagePicture::class,
    "countryThumbnail" => CountryThumbnail::class,
    "picture" => Picture::class
])]
abstract class ImageEntity
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    #[Groups([
        'posts_read',
        'image_read',
        'users_read',
        'contact_read',
        'comp_access_read',
        'job_offers_read',
        'hotel_read'
    ])]
    public ?string $id = null;

    #[ORM\OneToOne(mappedBy: 'imageEntity', targetEntity: Image::class, orphanRemoval: true)]
    #[Groups(['posts_read', 'users_read'])]
    private $image;

    #[ORM\Column(length: 255, nullable:true)]
    private ?string $folder = null;

    #[ORM\Column(length: 255)]
    #[Groups([
        'msg_read',
        'users_read',
        'posts_read',
        'discu_read',
        'invest_read',
        'comment_read',
        'author_read',
        'profile_pic_read',
        'image_read',
        'company_read',
        'contact_read',
        'msg_read',
        'comp_access_read',
        'job_offers_read',
        'reply_read',
        'eval_read',
        'hotel_read'
    ])]
    private ?string $fileName = null;

    #[ORM\Column(length: 255)]
    private ?string $fileSize = null;

    #[ORM\Column(length: 255, nullable: false)]
    #[Groups([
        'msg_read',
        'users_read',
        'posts_read',
        'discu_read',
        'invest_read',
        'comment_read',
        'author_read',
        'profile_pic_read',
        'image_read',
        'company_read',
        'contact_read',
        'msg_read',
        'notif_read',
        'comp_access_read',
        'job_offers_read',
        'reply_read',
        'eval_read',
        'hotel_read',
        'pays_read'
    ])]
    private ?string $fileUrl = null;

    #[ORM\Column]
    #[Groups(['users_read', 'posts_read', 'company_read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['users_read', 'posts_read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\PreFlush]
    public function generateFileUrl(): ?string
    {
        if ($this->getFileName()) {
            $siteDomain = $_ENV['SITE_DOMAIN'] ?? null;
            if ($siteDomain) {
                $this->setFileUrl($siteDomain . '/upload/img/' . $this->folder . '/' . $this->getFileName());
            }
        }
        return null;
    }

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }



    // Ajoutez ici les propriétés et méthodes communes à tous les auteurs
    // ...

    private function getId(): ?string
    {
        return $this->id;
    }




    /**
     * Get the value of image
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set the value of image
     *
     * @return  self
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    public function getFolder(): ?string
    {
        return $this->folder;
    }

    public function setFolder(string $folder): static
    {
        $this->folder = $folder;

        return $this;
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

    /**
     * Get the value of FileSize
     */
    public function getFileSize()
    {
        return $this->fileSize;
    }

    /**
     * Set the value of FileSize
     *
     * @return  self
     */
    public function setFileSize($fileSize)
    {
        $this->fileSize = $fileSize;

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

    #[ORM\PreUpdate]
    public function preUpdate()
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}

