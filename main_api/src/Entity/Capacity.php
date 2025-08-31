<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CapacityRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource()]
#[ORM\Entity(repositoryClass: CapacityRepository::class)]
class Capacity
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private ?string $id = null;

    #[ORM\Column]
    #[Groups(['room_read', 'bungalow_read'])]
    private ?int $nbrOfAdultMax = null;

    #[ORM\Column]
    #[Groups(['room_read', 'bungalow_read'])]
    private ?int $nbrOfChildMax = null;
    
    #[ORM\Column]
    #[Groups(['room_read', 'bungalow_read'])]
    private int $capacityTotal;
    
    public function __construct(?int $nbrOfAdultMax = 0, ?int $nbrOfChildMax = 0)
    {
        $this->nbrOfAdultMax = $nbrOfAdultMax;
        $this->nbrOfChildMax = $nbrOfChildMax ?? 0;
        $this->capacityTotal = $this->nbrOfAdultMax + $this->nbrOfChildMax;
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getNbrOfAdultMax(): ?int
    {
        return $this->nbrOfAdultMax;
    }

    public function setNbrOfAdultMax(int $nbrOfAdultMax): static
    {
        $this->nbrOfAdultMax = $nbrOfAdultMax;

        return $this;
    }

    public function getNbrOfChildMax(): ?int
    {
        return $this->nbrOfChildMax;
    }

    public function setNbrOfChildMax(int $nbrOfChildMax): static
    {
        $this->nbrOfChildMax = $nbrOfChildMax;

        return $this;
    }

    public function getCapacityTotal(): ?int
    {
        return $this->capacityTotal;
    }
    public function setCapacityTotal ():static
    {
        $this->capacityTotal = $this->nbrOfAdultMax + $this->nbrOfChildMax;
        return $this;
    }
}