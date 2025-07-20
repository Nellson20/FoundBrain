<?php

namespace App\Entity;

use App\Repository\ThingsToDoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: ThingsToDoRepository::class)]
#[ApiResource()]
class ThingsToDo
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nameThings = null;


    #[ORM\ManyToMany(targetEntity: Attraction::class, mappedBy: 'thingsToDo')]
    private Collection $attractions;

    public function __construct()
    {
        $this->attractions = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getNameThings(): ?string
    {
        return $this->nameThings;
    }

    public function setNameThings(string $nameThings): static
    {
        $this->nameThings = $nameThings;

        return $this;
    }

    

    /**
     * @return Collection<int, Attraction>
     */
    public function getAttractions(): Collection
    {
        return $this->attractions;
    }

    public function addAttraction(Attraction $attraction): static
    {
        if (!$this->attractions->contains($attraction)) {
            $this->attractions->add($attraction);
            $attraction->addThingsToDo($this);
        }

        return $this;
    }

    public function removeAttraction(Attraction $attraction): static
    {
        if ($this->attractions->removeElement($attraction)) {
            $attraction->removeThingsToDo($this);
        }

        return $this;
    }
}
