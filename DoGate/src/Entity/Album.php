<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AlbumRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AlbumRepository::class)]
#[ApiResource]
class Album
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    private ?string $releaseDate = null;

    #[ORM\OneToMany(mappedBy: 'album', targetEntity: ArtistVideo::class)]
    private Collection $videos;

    #[ORM\ManyToOne(inversedBy: 'albums')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Artist $artist = null;

    public function __construct()
    {
        $this->videos = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getReleaseDate(): ?string
    {
        return $this->releaseDate;
    }

    public function setReleaseDate(string $releaseDate): static
    {
        $this->releaseDate = $releaseDate;

        return $this;
    }

    /**
     * @return Collection<int, ArtistVideo>
     */
    public function getVideos(): Collection
    {
        return $this->videos;
    }

    public function addVideo(ArtistVideo $artistVideo): static
    {
        if (!$this->videos->contains($artistVideo)) {
            $this->videos->add($artistVideo);
            $artistVideo->setAlbum($this);
        }

        return $this;
    }

    public function removeVideo(ArtistVideo $artistVideo): static
    {
        if ($this->videos->removeElement($artistVideo)) {
            // set the owning side to null (unless already changed)
            if ($artistVideo->getAlbum() === $this) {
                $artistVideo->setAlbum(null);
            }
        }

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
