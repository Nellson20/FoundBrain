<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\BusStopController;
use App\Repository\BusStopRepository;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Metadata\Post as MetadataPost;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BusStopRepository::class)]
#[ApiResource(
    operations :
    [
        new Get(),
        new GetCollection,
        new MetadataPost(
            controller: BusStopController::class,
            deserialize: false,
        ),
    ],
    normalizationContext: [
        "groups" => ["bus_stops_read"]
    ]
)]
class BusStop
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private ?string $id = null;

    #[ORM\ManyToMany(targetEntity: Bus::class, mappedBy: 'stops')]
    private Collection $buses;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Position $position = null;

    #[ORM\ManyToOne(inversedBy: 'busStops')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Street $street = null;

    #[ORM\Column(length: 255)]
    #[Groups(['bus_read', 'bus_stops_read', 'street_read'])]
    private ?string $name = null;

    public function __construct()
    {
        $this->buses = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }
    
    /**
     * @return Collection<int, Bus>
     */
    public function getBuses(): Collection
    {
        return $this->buses;
    }

    public function addBus(Bus $bus): static
    {
        if (!$this->buses->contains($bus)) {
            $this->buses->add($bus);
            $bus->addStop($this);
        }

        return $this;
    }

    public function removeBus(Bus $bus): static
    {
        if ($this->buses->removeElement($bus)) {
            $bus->removeStop($this);
        }

        return $this;
    }

    public function getPosition(): ?Position
    {
        return $this->position;
    }

    public function setPosition(Position $position): static
    {
        $this->position = $position;

        return $this;
    }

    public function getStreet(): ?Street
    {
        return $this->street;
    }

    public function setStreet(?Street $street): static
    {
        $this->street = $street;

        return $this;
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
}
