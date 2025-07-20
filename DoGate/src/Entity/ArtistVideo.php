<?php

namespace App\Entity;

use App\Entity\Video;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ArtistVideoRepository;
use App\Controller\ArtistVideoPostController;
use ApiPlatform\Metadata\Post as MetadataPost;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: ArtistVideoRepository::class)]
#[Vich\Uploadable]
#[ApiResource(
    operations: 
    [
        new GetCollection(),
        new Get(),
        new Put(),
        new Patch(),
        new Delete(),
        new MetadataPost(
            controller: ArtistVideoPostController::class,
            deserialize: false,
        )
    ],
)]
class ArtistVideo extends Video
{
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'artistVideos')]
    private ?Playlist $playlist = null;
    #[ORM\ManyToOne(inversedBy: 'videos')]
    private ?Album $album = null;

    #[ORM\ManyToOne(inversedBy: 'videos')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Artist $artist = null;


    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getPlaylist(): ?Playlist
    {
        return $this->playlist;
    }

    public function setPlaylist(?Playlist $playlist): static
    {
        $this->playlist = $playlist;
        return $this;
    }
    public function getAlbum(): ?Album
    {
        return $this->album;
    }

    public function setAlbum(?Album $album): static
    {
        $this->album = $album;

        return $this;
    }


    public function getArtist(): ?Artist
    {
        return $this->artist;
    }

    public function setArtist(?Artist $artist): static
    {
        $this->artist = $artist;

        return $this;
    }
}
