<?php

namespace App\Entity;

use App\Entity\Accomodation;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use App\Repository\BathRoomEquipmentRepository;
use Doctrine\Common\Collections\ArrayCollection;

#[ApiResource()]
#[ORM\Entity(repositoryClass: BathRoomEquipmentRepository::class)]
class BathRoomEquipment extends Equipments
{

    #[ORM\ManyToMany(targetEntity: Accomodation::class, inversedBy: 'bathRoomEquipments')]
    private Collection $accomodations;

    public function __construct()
    {
        $this->accomodations = new ArrayCollection();
    }

    /**
     * @return Collection<int, Accomodation>
     */
    public function getAccomodations(): Collection
    {
        return $this->accomodations;
    }

    public function addAccomodation(Accomodation $accomodation): static
    {
        if (!$this->accomodations->contains($accomodation)) {
            $this->accomodations->add($accomodation);
        }

        return $this;
    }

    public function removeAccomodation(Accomodation $accomodation): static
    {
        $this->accomodations->removeElement($accomodation);

        return $this;
    }
}
