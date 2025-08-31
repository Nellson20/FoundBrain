<?php

namespace App\Entity;

use App\Repository\PlaylistRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post as MetadataPost;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use App\Config\PlaybackMode;
use App\Controller\PlaylistPostController;
use App\Controller\PlaylistPutController;

#[ORM\Entity(repositoryClass: PlaylistRepository::class)]
#[ApiResource(
    operations:
    [
        new Get(),
        new GetCollection(),
        new Put(),
        new Patch(),
        new Delete(),
        new MetadataPost(
            controller: PlaylistPostController::class,
            deserialize: false,
        ),
        new MetadataPost(
            uriTemplate:'/playlists/{id}',
            controller: PlaylistPutController::class,
            deserialize:false,
        )

    ]
)]
class Playlist
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    public ?string $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $genre = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $creationDate = null;

    #[ORM\Column(nullable: true)]
    private ?int $totalDuration = null;

    #[ORM\Column(nullable: true)]
    private ?int $rating = null;

    #[ORM\ManyToOne(inversedBy: 'playlists')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Author $author = null;

    #[ORM\Column(type: "string", enumType: PlaybackMode::class)]
    private $playbackMode;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Picture $cover = null;

    #[ORM\OneToMany(mappedBy: 'playlist', targetEntity: ArtistVideo::class)]

    private Collection $artistVideos;

    public function __construct()
    {
        $this->artistVideos = new ArrayCollection();
    }

   

    

    public function getId(): ?string
    {
        return $this->id;
    }
    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getGenre(): ?string
    {
        return $this->genre;
    }

    public function setGenre(?string $genre): static
    {
        $this->genre = $genre;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(?\DateTimeInterface $creationDate): static
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getTotalDuration(): ?int
    {
        return $this->totalDuration;
    }

    public function setTotalDuration(?int $totalDuration): static
    {
        $this->totalDuration = $totalDuration;

        return $this;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(?int $rating): static
    {
        $this->rating = $rating;

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

    public function getPlaybackMode(): PlaybackMode
    {
        return $this->playbackMode;
    }

    public function setPlaybackMode(PlaybackMode $playbackMode)
    {
        $this->playbackMode = $playbackMode;

        return $this;
    }

    public function getCover(): ?Picture
    {
        return $this->cover;
    }

    public function setCover(?Picture $cover): static
    {
        $this->cover = $cover;

        return $this;
    }

    /**
     * @return Collection<int, ArtistVideo>
     */
    public function getArtistVideos(): Collection
    {
        return $this->artistVideos;
    }

    public function addArtistVideo(ArtistVideo $artistVideo): static
    {
        if (!$this->artistVideos->contains($artistVideo)) {
            $this->artistVideos->add($artistVideo);
            $artistVideo->setPlaylist($this);
        }

        return $this;
    }

    public function removeArtistVideo(ArtistVideo $artistVideo): static
    {
        if ($this->artistVideos->removeElement($artistVideo)) {
            // set the owning side to null (unless already changed)
            if ($artistVideo->getPlaylist() === $this) {
                $artistVideo->setPlaylist(null);
            }
        }

        return $this;
    }

    

}
