<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\StreetRepository;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: StreetRepository::class)]
#[ApiResource(
    normalizationContext: [
        "groups" => ['street_read']
    ]
)]
class Street
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    #[Groups(['street_read'])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['street_read', 'bus_stops_read'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'streets')]
    private ?City $city = null;

    #[ORM\OneToMany(mappedBy: 'street', targetEntity: BusStop::class, orphanRemoval: true)]
    #[Groups(['street_read'])]
    private Collection $busStops;

    public function __construct()
    {
        $this->busStops = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }

    public function setCity(?City $city): static
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return Collection<int, BusStop>
     */
    public function getBusStops(): Collection
    {
        return $this->busStops;
    }

    public function addBusStop(BusStop $busStop): static
    {
        if (!$this->busStops->contains($busStop)) {
            $this->busStops->add($busStop);
            $busStop->setStreet($this);
        }

        return $this;
    }

    public function removeBusStop(BusStop $busStop): static
    {
        if ($this->busStops->removeElement($busStop)) {
            // set the owning side to null (unless already changed)
            if ($busStop->getStreet() === $this) {
                $busStop->setStreet(null);
            }
        }

        return $this;
    }

}