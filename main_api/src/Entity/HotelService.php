<?php

namespace App\Entity;

use App\Repository\HotelServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: HotelServiceRepository::class)]
#[ApiResource()]
class HotelService extends Services
{
    #[ORM\ManyToMany(targetEntity: Hotel::class, mappedBy: 'hotelServices')]
    private Collection $hotels;

    public function __construct()
    {
        $this->hotels = new ArrayCollection();
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
            $hotel->addHotelService($this);
        }

        return $this;
    }

    public function removeHotel(Hotel $hotel): static
    {
        if ($this->hotels->removeElement($hotel)) {
            $hotel->removeHotelService($this);
        }

        return $this;
    }
}
