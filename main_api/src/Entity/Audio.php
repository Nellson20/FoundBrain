<?php

namespace App\Entity;

use App\Entity\MessageAudio;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\AudioRepository;
use Symfony\Component\Dotenv\Dotenv;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\HasLifecycleCallbacks]
#[ApiResource()]
#[ORM\InheritanceType("JOINED")]
#[ORM\DiscriminatorColumn(name:"audio_type", type:"string")]
#[ORM\DiscriminatorMap(["messageAudio" => MessageAudio::class])]
#[ORM\Entity(repositoryClass: AudioRepository::class)]
class Audio
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    #[Groups(['posts_read','image_read','users_read','contact_read'])]
    public ?string $id = null;

    #[ORM\Column(length: 255)]
    private ?string $folder = null;

    #[ORM\Column(length: 255)]
    private ?string $fileName = null;

    #[ORM\Column(length: 255)]
    private ?string $fileSize = null;

    #[ORM\Column(length: 255, nullable: false)]
    #[Groups(['msg_read','discu_read'])]
    private ?string $fileUrl = null;

    #[ORM\Column]
    #[Groups(['users_read', 'posts_read','company_read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['users_read', 'posts_read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\PreFlush]
    public function generateFileUrl(): ?string
    {
        if ($this->getFileName()) {
            $this->setFileUrl($_ENV['SITE_DOMAIN'] . '/upload/audio/'. $this->folder. '/' . $this->getFileName());
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

    public function setFileName(string $fileName): static
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
