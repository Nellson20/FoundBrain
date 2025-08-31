<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups; 
use App\Repository\BusRepository;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: BusRepository::class)]
#[ApiResource(
        normalizationContext: [
            "groups" => ['bus_read']
        ]
    )
]
class Bus
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    #[Groups(['bus_read'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['bus_read', 'bus_stops_read'])]
    private ?string $number = null;

    #[ORM\Column(length: 255)]
    #[Groups(['bus_read', 'bus_stops_read'])]
    private ?string $color = null;

    #[ORM\ManyToMany(targetEntity: BusStop::class, inversedBy: 'buses')]
    #[Groups(['bus_read'])]
    private Collection $stops;

    public function __construct()
    {
        $this->stops = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(string $number): static
    {
        $this->number = $number;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): static
    {
        $this->color = $color;

        return $this;
    }

    /**
     * @return Collection<int, BusStop>
     */
    public function getStops(): Collection
    {
        return $this->stops;
    }

    public function addStop(BusStop $stop): static
    {
        if (!$this->stops->contains($stop)) {
            $this->stops->add($stop);
        }

        return $this;
    }

    public function removeStop(BusStop $stop): static
    {
        $this->stops->removeElement($stop);

        return $this;
    }
}
