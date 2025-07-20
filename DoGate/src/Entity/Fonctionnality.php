<?php

namespace App\Entity;

use App\Entity\Attraction;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use App\Repository\FonctionnalityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: FonctionnalityRepository::class)]
#[ApiResource]
#[ORM\InheritanceType("JOINED")]
#[ORM\DiscriminatorColumn(name:"fonctionnality_type", type:"string")]
#[ORM\DiscriminatorMap([
    'hotel' => Hotel::class,
    'restaurant'=> Restaurant::class, 
    'attraction' => Attraction::class,
])]

abstract class Fonctionnality
{

    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    #[Groups(['hotel_read'])]
    private ?string $id = null;

    #[ORM\ManyToOne(inversedBy: 'fonctionnalities')]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotBlank(message:"Un portail est obligatoire.")]
    #[Assert\Valid()]
    private ?Company $company = null;

    #[ORM\OneToMany(mappedBy: 'fonctionnality', targetEntity: Picture::class, cascade:['persist', 'remove'])]
    #[Groups(['hotel_read'])]
    #[Assert\Valid()]
    #[Assert\Count(
        min:5,
        max:10,
        minMessage:"Vous devez ajouter au moins 5 images.",
        maxMessage:"Vous pouvez ajouter au plus 10 images."
    )]
    private Collection $pictures;

    #[ORM\ManyToOne(inversedBy: 'fonctionnalities')]
    #[Groups(['hotel_read'])]
    #[Assert\NotNull()]
    #[Assert\Valid()]
    private ?City $city = null;

    #[ORM\OneToMany(mappedBy: 'fonctionnality', targetEntity: Coordinate::class)]
    private Collection $coordinates;

    public function __construct()
    {
        $this->pictures = new ArrayCollection();
        $this->coordinates = new ArrayCollection();
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): static
    {
        $this->company = $company;
        return $this;
    }

    /**
     * @return Collection<int, Picture>
     */
    public function getPictures(): Collection
    {
        return $this->pictures;
    }

    public function addPicture(Picture $picture): static
    {
        if (!$this->pictures->contains($picture)) {
            $this->pictures->add($picture);
            $picture->setFonctionnality($this);
        }

        return $this;
    }

    public function removePicture(Picture $picture): static
    {
        if ($this->pictures->removeElement($picture)) {
            // set the owning side to null (unless already changed)
            if ($picture->getFonctionnality() === $this) {
                $picture->setFonctionnality(null);
            }
        }

        return $this;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }

    public function setCity(?City $city): static
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Coordinate>
     */
    public function getCoordinates(): Collection
    {
        return $this->coordinates;
    }

    public function addCoordinate(Coordinate $coordinate): static
    {
        if (!$this->coordinates->contains($coordinate)) {
            $this->coordinates->add($coordinate);
            $coordinate->setFonctionnality($this);
        }

        return $this;
    }

    public function removeCoordinate(Coordinate $coordinate): static
    {
        if ($this->coordinates->removeElement($coordinate)) {
            // set the owning side to null (unless already changed)
            if ($coordinate->getFonctionnality() === $this) {
                $coordinate->setFonctionnality(null);
            }
        }

        return $this;
    }
}