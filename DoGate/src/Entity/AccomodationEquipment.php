<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use App\Repository\AccomodationEquipmentRepository;

#[ApiResource()]
#[ORM\Entity(repositoryClass: AccomodationEquipmentRepository::class)]
class AccomodationEquipment extends Equipments
{
    #[ORM\ManyToMany(targetEntity: Accomodation::class, inversedBy: 'accomodationEquipments')]
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
