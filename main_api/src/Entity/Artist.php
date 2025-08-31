<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ArtistRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ArtistRepository::class)]
#[ApiResource(
    normalizationContext:
    [
        "groups" => ["artist_read"]
    ],
)]
class Artist extends Author
{

    #[ORM\Column(length: 255)]
    #[Groups(["artist_read"])]
    private ?string $artistName = null;

    #[ORM\Column(length: 255)]
    private ?string $nationality = null;

    #[ORM\Column(length: 255)]
    private ?string $artisticGenre = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Email $email = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?PhoneNumber $phoneNumber = null;

    #[ORM\OneToOne(mappedBy: 'artist', cascade: ['persist', 'remove'])]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'artist', targetEntity: ArtistVideo::class, orphanRemoval: true)]
    private Collection $videos;

    #[ORM\OneToMany(mappedBy: 'artist', targetEntity: Album::class, orphanRemoval: true)]
    private Collection $albums;
    
    public function __construct()
    {
        parent::__construct();
        // $this->artistVideos = new ArrayCollection();
        $this->videos = new ArrayCollection();
        $this->albums = new ArrayCollection();
    }

    // /**
    //  * @return Collection<int, ArtistVideo>
    //  */
    // public function getArtistVideos(): Collection
    // {
    //     return $this->artistVideos;
    // }

    // public function addArtistVideo(ArtistVideo $artistVideo): static
    // {
    //     if (!$this->artistVideos->contains($artistVideo)) {
    //         $this->artistVideos->add($artistVideo);
    //     }

    //     return $this;
    // }

    // public function removeArtistVideo(ArtistVideo $artistVideo): static
    // {
    //     $this->artistVideos->removeElement($artistVideo);

    //     return $this;
    // }

    public function getArtistName(): ?string
    {
        return $this->artistName;
    }

    public function setArtistName(string $artistName): static
    {
        $this->artistName = $artistName;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        // unset the owning side of the relation if necessary
        if ($user === null && $this->user !== null) {
            $this->user->setArtist(null);
        }

        // set the owning side of the relation if necessary
        if ($user !== null && $user->getArtist() !== $this) {
            $user->setArtist($this);
        }

        $this->user = $user;

        return $this;
    }

    public function getNationality(): ?string
    {
        return $this->nationality;
    }

    public function setNationality(string $nationality): static
    {
        $this->nationality = $nationality;

        return $this;
    }

    public function getArtisticGenre(): ?string
    {
        return $this->artisticGenre;
    }

    public function setArtisticGenre(string $artisticGenre): static
    {
        $this->artisticGenre = $artisticGenre;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getEmail(): ?Email
    {
        return $this->email;
    }

    public function setEmail(?Email $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhoneNumber(): ?PhoneNumber
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?PhoneNumber $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    /**
     * @return Collection<int, ArtistVideo>
     */
    public function getVideos(): Collection
    {
        return $this->videos;
    }

    public function addVideo(ArtistVideo $video): static
    {
        if (!$this->videos->contains($video)) {
            $this->videos->add($video);
            $video->setArtist($this);
        }

        return $this;
    }

    public function removeVideo(ArtistVideo $video): static
    {
        if ($this->videos->removeElement($video)) {
            // set the owning side to null (unless already changed)
            if ($video->getArtist() === $this) {
                $video->setArtist(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Album>
     */
    public function getAlbums(): Collection
    {
        return $this->albums;
    }

    public function addAlbum(Album $album): static
    {
        if (!$this->albums->contains($album)) {
            $this->albums->add($album);
            $album->setArtist($this);
        }

        return $this;
    }

    public function removeAlbum(Album $album): static
    {
        if ($this->albums->removeElement($album)) {
            // set the owning side to null (unless already changed)
            if ($album->getArtist() === $this) {
                $album->setArtist(null);
            }
        }

        return $this;
    }
}
