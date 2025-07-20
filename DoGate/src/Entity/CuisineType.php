<?php

namespace App\Entity;


use App\Repository\CuisineTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ApiResource()]
#[ORM\Entity(repositoryClass: CuisineTypeRepository::class)]
#[ApiResource]
class CuisineType
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    private ?string $cuisineTitle = null;

    #[ORM\ManyToMany(targetEntity: Restaurant::class, inversedBy: 'cuisineTypes')]
    private Collection $restaurants;

    public function __construct()
    {
        $this->restaurants = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getCuisineTitle(): ?string
    {
        return $this->cuisineTitle;
    }

    public function setCuisineTitle(string $cuisineTitle): static
    {
        $this->cuisineTitle = $cuisineTitle;

        return $this;
    }

    /**
     * @return Collection<int, Restaurant>
     */
    public function getRestaurants(): Collection
    {
        return $this->restaurants;
    }

    public function addRestaurant(Restaurant $restaurant): static
    {
        if (!$this->restaurants->contains($restaurant)) {
            $this->restaurants->add($restaurant);
        }

        return $this;
    }

    public function removeRestaurant(Restaurant $restaurant): static
    {
        $this->restaurants->removeElement($restaurant);

        return $this;
    }
}
