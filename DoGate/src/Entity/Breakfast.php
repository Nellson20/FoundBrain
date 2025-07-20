<?php

namespace App\Entity;


use App\Entity\Amount;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\BreakfastRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: BreakfastRepository::class)]
#[ApiResource]
class Breakfast
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private ?string $id = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups('hotel_read')]
    private ?Amount $extra = null;

    #[ORM\ManyToMany(targetEntity: TypeBreakfast::class)]
    #[Groups('hotel_read')]
    private Collection $typeBreakfast;

    #[ORM\ManyToMany(targetEntity: Hotel::class, mappedBy: 'breakfasts')]
    private Collection $hotels;

    public function __construct()
    {
        $this->typeBreakfast = new ArrayCollection();
    }


    public function getId(): ?string
    {
        return $this->id;
    }

    public function getExtra(): ?Amount
    {
        return $this->extra;
    }

    public function setExtra(Amount $extra): static
    {
        $this->extra = $extra;

        return $this;
    }

    /**
     * @return Collection<int, TypeBreakfast>
     */
    public function getTypeBreakfast(): Collection
    {
        return $this->typeBreakfast;
    }

    public function addTypeBreakfast(TypeBreakfast $typeBreakfast): static
    {
        if (!$this->typeBreakfast->contains($typeBreakfast)) {
            $this->typeBreakfast->add($typeBreakfast);
        }

        return $this;
    }

    public function removeTypeBreakfast(TypeBreakfast $typeBreakfast): static
    {
        $this->typeBreakfast->removeElement($typeBreakfast);

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
            $hotel->addBreakfast($this);
        }

        return $this;
    }

    public function removeHotel(Hotel $hotel): static
    {
        if ($this->hotels->removeElement($hotel)) {
            $hotel->removeBreakfast($this);
        }

        return $this;
    }
}