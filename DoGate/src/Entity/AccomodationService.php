<?php

namespace App\Entity;

use App\Repository\AccomodationServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ApiResource()]
#[ORM\Entity(repositoryClass: AccomodationServiceRepository::class)]
class AccomodationService extends Services
{
    #[ORM\ManyToMany(targetEntity: Accomodation::class, inversedBy: 'accomodationServices')]
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