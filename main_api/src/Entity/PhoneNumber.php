<?php

namespace App\Entity;

use App\Entity\Coordinate;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\PhoneNumberRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
#[ApiResource()]

#[ORM\Entity(repositoryClass: PhoneNumberRepository::class)]
#[ApiResource]
class PhoneNumber extends Coordinate
{
    #[ORM\Column]
    #[Groups(['hotel_read'])]
    #[Assert\NotBlank()]
    #[Assert\Regex(
        pattern:"/^\d{5,15}$/",
        message:"Le numéro doit être composé de 5 à 15 chiffres."
    )]
    private ?string $value = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['hotel_read'])]
    #[Assert\NotNull()]
    #[Assert\Valid()]
    private ?Pays $country = null;

    #[ORM\ManyToMany(targetEntity: Hotel::class, mappedBy: 'phoneNumbers')]
    private Collection $hotels;

    public function __construct()
    {
        $this->hotels = new ArrayCollection();
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(?string $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getCountry(): ?Pays
    {
        return $this->country;
    }

    public function setCountry(?Pays $country): static
    {
        $this->country = $country;

        return $this;
    }

    /**
     * @return Collection<int, Hotel>
     */
    public function getHotels(): Collection
    {
        return $this->hotels;
    }

    public function addHotel(Hotel $hotel): static
    {
        if (!$this->hotels->contains($hotel)) {
            $this->hotels->add($hotel);
            $hotel->addPhoneNumber($this);
        }

        return $this;
    }

    public function removeHotel(Hotel $hotel): static
    {
        if ($this->hotels->removeElement($hotel)) {
            $hotel->removePhoneNumber($this);
        }

        return $this;
    }
}
