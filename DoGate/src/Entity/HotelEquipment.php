<?php

namespace App\Entity;

use App\Entity\Hotel;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use App\Repository\HotelEquipmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource()]
#[ORM\Entity(repositoryClass: HotelEquipmentRepository::class)]
class HotelEquipment extends Equipments
{
    #[ORM\ManyToMany(targetEntity: Hotel::class, inversedBy: 'hotelEquipments')]
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
        }

        return $this;
    }

    public function removeHotel(Hotel $hotel): static
    {
        $this->hotels->removeElement($hotel);

        return $this;
    }
}
