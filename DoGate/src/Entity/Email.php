<?php

namespace App\Entity;

use App\Entity\Coordinate;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\EmailRepository;
use ApiPlatform\Metadata\ApiResource;
use phpDocumentor\Reflection\PseudoTypes\True_;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: EmailRepository::class)]
#[ApiResource()]
class Email extends Coordinate
{
    #[ORM\Column]
    #[Groups(['hotel_read'])]
    #[Assert\Email(
        message: "Cette {{ value }} n'est pas valide",
    )]
    private ?string $value = null;

    #[ORM\ManyToMany(targetEntity: Hotel::class, mappedBy: 'emails')]
    private Collection $hotels;

    public function __construct()
    {
        $this->hotels = new ArrayCollection();
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(?string $value): self
    {
        $this->value = $value;

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
            $hotel->addEmail($this);
        }

        return $this;
    }

    public function removeHotel(Hotel $hotel): static
    {
        if ($this->hotels->removeElement($hotel)) {
            $hotel->removeEmail($this);
        }

        return $this;
    }
}
